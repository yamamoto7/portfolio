// アプリフィードバックの共通ロジック。
// リクエストは「どのアプリ宛か(target_app)」と「列見出し(title)＋値(content) の配列」で届く。
// 例:
//   {
//     "target_app": "routin",
//     "feedbacks": [
//       { "title": "評価", "content": "5" },
//       { "title": "本文", "content": "..." }
//     ]
//   }
// スプレッドシート側は target_app をシート（タブ）に対応させ、
// その中で title をヘッダー列に対応させて content を入れる。

/** 1 件のフィードバック項目（= シートの 1 セル分）。 */
export interface FeedbackField {
  title: string;
  content: string;
}

export interface FeedbackPayload {
  targetApp: string;
  feedbacks: FeedbackField[];
}

export const MAX_FIELDS = 50;
export const MAX_TITLE_LEN = 200;
export const MAX_CONTENT_LEN = 4000;
export const MAX_TARGET_APP_LEN = 80;

/** feedbacks 配列を FeedbackField[] へ正規化する。title が空の項目は捨てる。 */
function normalizeFields(input: unknown): FeedbackField[] {
  if (!Array.isArray(input)) return [];
  const fields: FeedbackField[] = [];
  for (const item of input.slice(0, MAX_FIELDS)) {
    if (!item || typeof item !== "object") continue;
    const { title, content } = item as { title?: unknown; content?: unknown };
    const t = typeof title === "string" ? title.trim().slice(0, MAX_TITLE_LEN) : "";
    if (!t) continue; // 見出しのない項目は列を決められないので捨てる
    const c = content == null ? "" : String(content).slice(0, MAX_CONTENT_LEN);
    fields.push({ title: t, content: c });
  }
  return fields;
}

/**
 * 受け取ったボディを { targetApp, feedbacks } へ正規化する。
 * - target_app が無い、または妥当な feedbacks が 1 件も無ければ null（呼び出し側で 400）。
 */
export function parseFeedbackPayload(body: unknown): FeedbackPayload | null {
  if (!body || typeof body !== "object") return null;
  const { target_app, feedbacks } = body as {
    target_app?: unknown;
    feedbacks?: unknown;
  };

  const targetApp =
    typeof target_app === "string"
      ? target_app.trim().slice(0, MAX_TARGET_APP_LEN)
      : "";
  if (!targetApp) return null;

  const fields = normalizeFields(feedbacks);
  if (!fields.length) return null;

  return { targetApp, feedbacks: fields };
}
