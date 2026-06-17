// アプリフィードバック受け口（Vercel Function）。
// クローズドベータ向け。API キーを知っているクライアントだけが投稿でき、
// 受け取った内容を Google Apps Script のウェブアプリ（doPost）へ転送して
// Google スプレッドシートに 1 行追記する。
//
// 環境変数:
//   FEEDBACK_API_KEY            クライアント認証用のキー（必須）
//   FEEDBACK_SHEET_WEBHOOK_URL  GAS ウェブアプリの /exec URL（必須）
//   FEEDBACK_SHEET_TOKEN        GAS と共有するシークレット（任意・GAS 側と一致）
// GAS 側のコードは scripts/google-apps-script/feedback-sheet.gs を参照。
//
// ── リクエスト契約 ─────────────────────────────────────────────
//   POST /api/feedback
//   Authorization: Bearer <FEEDBACK_API_KEY>   （または x-api-key: <KEY>）
//   Content-Type: application/json
//   {
//     "target_app": "routin",          // 必須・書き込み先シート（タブ）を決める
//     "feedbacks": [
//       { "title": "評価",   "content": "5" },
//       { "title": "本文",   "content": "とても良いアプリです" },
//       { "title": "OS",     "content": "iOS 17.5" }
//     ]
//   }
//   ※ target_app が GAS 側のシート（タブ）に対応する（無ければ自動作成）。
//   ※ title がそのシートのヘッダー列に対応し、その列へ content を入れる。
//      未知の title は GAS 側でヘッダー列を自動追加する。
//   レスポンス: { "ok": true } / { "ok": false }
//   ※ ネイティブ（iOS/Android）からの呼び出しはブラウザではないため CORS 不要。
// ───────────────────────────────────────────────────────────────

import { parseFeedbackPayload } from "@/lib/feedback";

/** Authorization: Bearer か x-api-key からキーを取り出す。 */
function extractApiKey(request: Request): string {
  const auth = request.headers.get("authorization") ?? "";
  const m = /^Bearer\s+(.+)$/i.exec(auth.trim());
  if (m) return m[1].trim();
  return (request.headers.get("x-api-key") ?? "").trim();
}

export async function POST(request: Request) {
  const expectedKey = process.env.FEEDBACK_API_KEY;
  if (!expectedKey) {
    console.error("FEEDBACK_API_KEY is not set");
    return Response.json({ ok: false }, { status: 500 });
  }
  if (extractApiKey(request) !== expectedKey) {
    return Response.json({ ok: false }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  const parsed = parseFeedbackPayload(body);
  if (!parsed) {
    return Response.json({ ok: false }, { status: 400 });
  }

  const webhookUrl = process.env.FEEDBACK_SHEET_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("FEEDBACK_SHEET_WEBHOOK_URL is not set");
    return Response.json({ ok: false }, { status: 500 });
  }

  // GAS（doPost）へ渡すペイロード。GAS 側が target_app→シート, title→列 を解決して追記する。
  const payload = {
    token: process.env.FEEDBACK_SHEET_TOKEN ?? "",
    receivedAt: new Date().toISOString(),
    targetApp: parsed.targetApp,
    feedbacks: parsed.feedbacks,
  };

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      // GAS は 302 リダイレクトを返すことがある。fetch は既定で追従する。
      redirect: "follow",
    });
    if (!res.ok) {
      console.error("Feedback sheet webhook failed:", res.status);
      return Response.json({ ok: false }, { status: 502 });
    }
  } catch (err) {
    console.error("Feedback sheet webhook error:", err);
    return Response.json({ ok: false }, { status: 502 });
  }

  return Response.json({ ok: true });
}
