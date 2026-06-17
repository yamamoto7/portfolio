/**
 * アプリフィードバックを Google スプレッドシートへ追記する Apps Script。
 *
 * Next.js の app/api/feedback/route.ts から POST される JSON を受け取り、
 * シートに 1 行追加するウェブアプリ（doPost）。
 *
 * 受け取る JSON:
 *   {
 *     "token": "...",                 // 任意・SHARED_TOKEN と照合
 *     "receivedAt": "ISO日時",
 *     "targetApp": "routin",          // 書き込み先シート（タブ）名
 *     "feedbacks": [
 *       { "title": "評価", "content": "5" },
 *       { "title": "本文", "content": "..." }
 *     ]
 *   }
 *
 * 動作:
 *   - targetApp と同名のシート（タブ）を探す。無ければ自動作成する。
 *   - そのシートの 1 行目をヘッダーとして扱う。
 *   - 各 feedback の title と一致する列を探し、その列に content を入れる。
 *   - title がまだ無ければヘッダーの末尾に新しい列を追加する。
 *   - 先頭列は常に「受信日時」。
 *
 * ── セットアップ手順 ───────────────────────────────────────────
 *  1. 記録したい Google スプレッドシートを開く。
 *  2. 拡張機能 > Apps Script を開き、このファイルの内容を貼り付ける。
 *  3. （任意）SHARED_TOKEN を設定し、同じ値を Vercel/.env の
 *     FEEDBACK_SHEET_TOKEN にも入れる。
 *  4. デプロイ > 新しいデプロイ > 種類「ウェブアプリ」。
 *       - 次のユーザーとして実行: 自分
 *       - アクセスできるユーザー: 全員（匿名含む）
 *  5. 発行された /exec の URL を FEEDBACK_SHEET_WEBHOOK_URL に設定する。
 *  6. コードを更新したら「デプロイを管理 > 編集 > 新バージョン」で再デプロイ。
 * ──────────────────────────────────────────────────────────────
 */

// route.ts の FEEDBACK_SHEET_TOKEN と一致させる。空文字なら検証しない。
const SHARED_TOKEN = "";

// targetApp が空のときに使うフォールバックのシート名。
const DEFAULT_SHEET_NAME = "Feedback";

// 先頭の固定列見出し。
const TIMESTAMP_HEADER = "受信日時";

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000); // 同時 POST でヘッダー追加が競合しないように直列化
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || "{}");

    if (SHARED_TOKEN && data.token !== SHARED_TOKEN) {
      return jsonOutput({ ok: false, error: "unauthorized" });
    }

    const fields = Array.isArray(data.feedbacks) ? data.feedbacks : [];
    const sheet = getSheet_(data.targetApp);

    // 現在のヘッダー（title -> 列番号, 1 始まり）を読む。
    const lastCol = sheet.getLastColumn();
    const headers =
      lastCol > 0 ? sheet.getRange(1, 1, 1, lastCol).getValues()[0] : [];
    const colByTitle = {};
    for (let i = 0; i < headers.length; i++) {
      const h = String(headers[i]);
      if (h !== "") colByTitle[h] = i + 1;
    }

    // 未知の title はヘッダー末尾に追加する。
    for (let i = 0; i < fields.length; i++) {
      const title = String((fields[i] && fields[i].title) || "").trim();
      if (title && !colByTitle[title]) {
        const newCol = sheet.getLastColumn() + 1;
        sheet.getRange(1, newCol).setValue(title).setFontWeight("bold");
        colByTitle[title] = newCol;
      }
    }

    // 行を組み立てて追記する。
    const width = sheet.getLastColumn();
    const row = new Array(width).fill("");
    row[0] = data.receivedAt ? new Date(data.receivedAt) : new Date();
    for (let i = 0; i < fields.length; i++) {
      const title = String((fields[i] && fields[i].title) || "").trim();
      const col = colByTitle[title];
      if (col) row[col - 1] = (fields[i] && fields[i].content) || "";
    }
    sheet.appendRow(row);

    return jsonOutput({ ok: true });
  } catch (err) {
    return jsonOutput({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// 動作確認用（ブラウザで /exec を開くと反応する）。
function doGet() {
  return jsonOutput({ ok: true, service: "feedback-sheet" });
}

function getSheet_(targetApp) {
  const name = sheetName_(targetApp);
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
  }
  // 先頭列の見出しと固定行を保証する。
  if (sheet.getLastColumn() === 0) {
    sheet.getRange(1, 1).setValue(TIMESTAMP_HEADER).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// targetApp をシート（タブ）名として安全な文字列に整える。
// シート名に使えない文字（: \ / ? * [ ]）を除き、空ならフォールバック。
function sheetName_(targetApp) {
  const cleaned = String(targetApp || "")
    .replace(/[:\\\/?*\[\]]/g, " ")
    .trim()
    .slice(0, 100);
  return cleaned || DEFAULT_SHEET_NAME;
}

function jsonOutput(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
