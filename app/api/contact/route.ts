// Routin の問い合わせ受け口（Vercel Function）。
// Web フォームと iOS アプリの両方から呼べる。
// 受け取った内容を Slack Incoming Webhook に通知する。
// 環境変数 CONTACT_WEBHOOK_URL に Slack の Webhook URL を設定すること
// （ローカルは .env.local、本番は Vercel のプロジェクト環境変数）。
//
// ── リクエスト契約 ─────────────────────────────────────────────
//   POST /api/contact
//   Content-Type: application/json
//   {
//     "message":  "本文（必須・最大4000字）",
//     "email":    "返信先（任意）",
//     "category": "app" | "work" | "other"（任意。lib/contact.ts 参照）,
//     "app":      "routin" 等（category=app のとき・任意）,
//     "source":   "web" | "ios"（任意・既定 web）,
//     "meta":     { "appVersion": "1.0.0", "os": "iOS 17.5", ... }（任意）,
//     "company":  "ハニーポット（Webのみ。値が入っていたら破棄）"
//   }
//   レスポンス: { "ok": true } / { "ok": false }
//   ※ ネイティブ（iOS）からの呼び出しはブラウザではないため CORS 不要。
//   ※ iOS から特定アプリの問い合わせを送るときは category=app, app=<id> を付ける。
// ───────────────────────────────────────────────────────────────

import { categoryLabel, appLabel } from "@/lib/contact";

const MAX_MESSAGE = 4000;
const MAX_EMAIL = 254;
const MAX_META_KEYS = 12;
const MAX_META_LEN = 200;

const ALLOWED_SOURCES = new Set(["web", "ios"]);

function formatMeta(meta: unknown): string[] {
  if (!meta || typeof meta !== "object") return [];
  return Object.entries(meta as Record<string, unknown>)
    .slice(0, MAX_META_KEYS)
    .map(([k, v]) => `${String(k).slice(0, 40)}: ${String(v).slice(0, MAX_META_LEN)}`);
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  const { email, message, company, source, meta, category, app } = (body ??
    {}) as {
    email?: string;
    message?: string;
    company?: string; // ハニーポット（人間は空のはず）
    source?: string;
    meta?: unknown;
    category?: string;
    app?: string;
  };

  // ハニーポットに値が入っていたらボット。静かに成功扱いで捨てる。
  if (typeof company === "string" && company.trim() !== "") {
    return Response.json({ ok: true });
  }

  const text = typeof message === "string" ? message.trim() : "";
  if (!text || text.length > MAX_MESSAGE) {
    return Response.json({ ok: false }, { status: 400 });
  }

  const replyTo =
    typeof email === "string" ? email.trim().slice(0, MAX_EMAIL) : "";
  const src =
    typeof source === "string" && ALLOWED_SOURCES.has(source) ? source : "web";
  const metaLines = formatMeta(meta);

  // カテゴリ・アプリは既知の値ならラベル化、未知なら生値を控えめに表示
  const catLabel = categoryLabel(category) ?? (category ? `${category}` : "");
  const appName = appLabel(app) ?? (app ? `${app}` : "");

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("CONTACT_WEBHOOK_URL is not set");
    return Response.json({ ok: false }, { status: 500 });
  }

  const contextText = [
    catLabel ? `種類: ${catLabel}` : null,
    appName ? `アプリ: ${appName}` : null,
    `経路: ${src === "ios" ? "iOS アプリ" : "Web"}`,
    replyTo ? `返信先: ${replyTo}` : "返信先: （なし）",
    ...metaLines,
  ]
    .filter(Boolean)
    .join("  ·  ");

  // Slack Incoming Webhook 形式
  const payload = {
    text: `:seedling: Routin への問い合わせ（${src === "ios" ? "iOS" : "Web"}）`,
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*:seedling: Routin への問い合わせ（${src === "ios" ? "iOS" : "Web"}）*`,
        },
      },
      {
        type: "section",
        text: { type: "mrkdwn", text: text.slice(0, MAX_MESSAGE) },
      },
      {
        type: "context",
        elements: [{ type: "mrkdwn", text: contextText }],
      },
    ],
  };

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      console.error("Slack webhook failed:", res.status);
      return Response.json({ ok: false }, { status: 502 });
    }
  } catch (err) {
    console.error("Slack webhook error:", err);
    return Response.json({ ok: false }, { status: 502 });
  }

  return Response.json({ ok: true });
}
