import { ROUTIN_APP_NAME } from "@/lib/routin";

export interface ContactOption {
  id: string;
  label: string;
}

/** 問い合わせカテゴリ。配列順に表示。追加はここに1行足すだけ。 */
export const CONTACT_CATEGORIES: ContactOption[] = [
  { id: "app", label: "アプリについて" },
  { id: "work", label: "お仕事・制作のご相談" },
  { id: "other", label: "その他" },
];

/** カテゴリが "app" のときに選べるアプリ一覧。 */
export const CONTACT_APPS: ContactOption[] = [
  { id: "routin", label: ROUTIN_APP_NAME },
  { id: "buylis", label: "Buylis" },
  { id: "mugen-sudoku", label: "無限数独" },
  { id: "mugen-sugaku", label: "無限数学" },
  { id: "tile-care", label: "タイルケア" },
];

/** アプリ選択を出すカテゴリ ID。 */
export const APP_CATEGORY_ID = "app";

export function categoryLabel(id: string | undefined): string | undefined {
  return CONTACT_CATEGORIES.find((c) => c.id === id)?.label;
}

export function appLabel(id: string | undefined): string | undefined {
  return CONTACT_APPS.find((a) => a.id === id)?.label;
}
