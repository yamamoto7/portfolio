// アプリフィードバックの共通ロジック。
// フィードバックは「列見出し(title) と 値(content) の組」の配列として届く。
// 例: [{ "title": "評価", "content": "5" }, { "title": "本文", "content": "..." }]
// スプレッドシート側は title をヘッダー列に対応させ、その列に content を入れる。

/** 1 件のフィードバック項目（= シートの 1 セル分）。 */
export interface FeedbackField {
  title: string;
  content: string;
}

export const MAX_FIELDS = 50;
export const MAX_TITLE_LEN = 200;
export const MAX_CONTENT_LEN = 4000;

/**
 * 受け取った入力を FeedbackField[] へ正規化する。
 * - 配列そのもの、または { fields: [...] } のどちらでも受ける。
 * - title が空の項目は捨てる。content は文字列化して長さ制限。
 * - 妥当な項目が 1 件も無ければ null（呼び出し側で 400 にする）。
 */
export function normalizeFields(input: unknown): FeedbackField[] | null {
  const raw = Array.isArray(input)
    ? input
    : input && typeof input === "object" && Array.isArray((input as { fields?: unknown }).fields)
      ? (input as { fields: unknown[] }).fields
      : null;
  if (!raw) return null;

  const fields: FeedbackField[] = [];
  for (const item of raw.slice(0, MAX_FIELDS)) {
    if (!item || typeof item !== "object") continue;
    const { title, content } = item as { title?: unknown; content?: unknown };
    const t = typeof title === "string" ? title.trim().slice(0, MAX_TITLE_LEN) : "";
    if (!t) continue; // 見出しのない項目は列を決められないので捨てる
    const c =
      content == null ? "" : String(content).slice(0, MAX_CONTENT_LEN);
    fields.push({ title: t, content: c });
  }

  return fields.length ? fields : null;
}
