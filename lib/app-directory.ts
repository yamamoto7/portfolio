import { ROUTIN_APP_NAME } from "@/lib/routin";
import { LASTTIME_APP_NAME } from "@/lib/lasttime";
import { VERDASH_APP_NAME } from "@/lib/verdash";
import { MUGEN_SUDOKU_NAME, MUGEN_SUDOKU_ACCENT } from "@/lib/mugen-sudoku";
import { ANNIV_APP_NAME, ANNIV_ACCENT } from "@/lib/anniv";
import { SEEHUE_APP_NAME, SEEHUE_ACCENT } from "@/lib/seehue";
import { MARKPAD_APP_NAME, MARKPAD_ACCENT } from "@/lib/markpad";
import { apps } from "@/lib/apps";

export interface AppDirItem {
  /** 表示名 */
  name: string;
  /** カード用の短いキャッチコピー */
  tagline: string;
  /** LP へのパス */
  href: string;
  /** アイコン画像（正方形） */
  icon: string;
  /** アクセントカラー（ジャンル表記・ホバー時の矢印に使用） */
  accent: string;
  /** ジャンル（英字・モノスペースの小見出し） */
  genre: string;
}

/** ポートフォリオ内で公開している全アプリ。/apps の一覧で使う。 */
export const appDirectory: AppDirItem[] = [
  {
    name: ROUTIN_APP_NAME,
    tagline: "頑張らなくても、いい。静かに続けられるルーティンアプリ。",
    href: "/routin",
    icon: "/contents/routin/icon.png",
    accent: "#6A826D",
    genre: "HABIT",
  },
  {
    name: LASTTIME_APP_NAME,
    tagline: "大切なことの「最後にやった日」を記録する記録帳。",
    href: "/lasttime-list",
    icon: "/contents/lasttime/icon.png",
    accent: "#2E6A50",
    genre: "LIFELOG",
  },
  {
    name: VERDASH_APP_NAME,
    tagline: "Vercel のデプロイ管理を、iPhone から片手で。",
    href: "/verdash",
    icon: "/contents/verdash/icon.png",
    accent: "#337AE6",
    genre: "DEVELOPER",
  },
  {
    name: MUGEN_SUDOKU_NAME,
    tagline: "あてずっぽう不要。論理だけで必ず解ける本格数独。",
    href: "/mugen-sudoku",
    icon: "/contents/mugen-sudoku/icon.png",
    accent: MUGEN_SUDOKU_ACCENT,
    genre: "PUZZLE",
  },
  {
    name: "Buylis",
    tagline: "フォルダ管理で、自分好みのお買い物リストに。",
    href: "/buylis",
    icon: "/contents/buylis/icon.png",
    accent: "#2C3A41",
    genre: "SHOPPING",
  },
  {
    name: apps["mugen-sugaku"].displayName,
    tagline: apps["mugen-sugaku"].heroLead,
    href: "/mugen-sugaku",
    icon: "/contents/mugen-sugaku/icon.png",
    accent: apps["mugen-sugaku"].accent,
    genre: "LEARNING",
  },
  {
    name: apps["tile-care"].displayName,
    tagline: apps["tile-care"].heroLead,
    href: "/tile-care",
    icon: "/contents/tile-care/icon.png",
    accent: apps["tile-care"].accent,
    genre: "PET",
  },
  {
    name: ANNIV_APP_NAME,
    tagline: "誕生日も記念日も、贈り物の記録も。大切な人を、まとめて。",
    href: "/anniv",
    icon: "/contents/anniv/icon.png",
    accent: ANNIV_ACCENT,
    genre: "REMINDER",
  },
  {
    name: SEEHUE_APP_NAME,
    tagline: "色を補正し、色名を調べ、見え方をチェック。色のサポートカメラ。",
    href: "/seehue",
    icon: "/contents/seehue/icon.png",
    accent: SEEHUE_ACCENT,
    genre: "ACCESSIBILITY",
  },
  {
    name: MARKPAD_APP_NAME,
    tagline: "さっと書いて貼り付けて、すぐ美しく。Markdown エディタ。",
    href: "/markpad",
    icon: "/contents/markpad/icon.png",
    accent: MARKPAD_ACCENT,
    genre: "EDITOR",
  },
];
