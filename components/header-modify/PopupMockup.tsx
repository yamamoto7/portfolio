/* 拡張機能のポップアップUIを、実物の popup.html / popup.css（ダークテーマ）に
 * 忠実に再現した静的モックアップ。App Store 提出用スクショの代わりに、
 * LP のヒーロー／機能紹介でそのまま「拡張の見た目」を見せるために使う。 */

/** ダークテーマのトグルスイッチ（見た目のみ）。 */
function Toggle({ on, small }: { on?: boolean; small?: boolean }) {
  const w = small ? "w-8 h-[18px]" : "w-[38px] h-[22px]";
  const knob = small ? "h-3 w-3" : "h-4 w-4";
  const shift = small ? (on ? "translate-x-[14px]" : "") : on ? "translate-x-4" : "";
  return (
    <span
      className={`relative inline-block shrink-0 rounded-full transition-colors ${w} ${
        on ? "bg-[#4F8CFF]" : "bg-[#3a4252]"
      }`}
    >
      <span
        className={`absolute bottom-[3px] left-[3px] rounded-full bg-white transition-transform ${knob} ${shift}`}
      />
    </span>
  );
}

function HeaderRow({
  on,
  name,
  value,
}: {
  on?: boolean;
  name: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <Toggle on={on} small />
      <span className="flex-[1_1_45%] truncate rounded-[6px] border border-[#333a48] bg-[#1b1f27] px-2.5 py-2 text-[#e6eaf2]">
        {name}
      </span>
      <span
        className={`flex-[1_1_55%] truncate rounded-[6px] border border-[#333a48] px-2.5 py-2 ${
          on ? "bg-[#1b1f27] text-[#e6eaf2]" : "bg-[#232833] text-[#9aa4b6]"
        }`}
      >
        {value}
      </span>
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[6px] border border-[#333a48] text-[#9aa4b6]">
        ✕
      </span>
    </div>
  );
}

export default function PopupMockup() {
  return (
    <div className="w-[340px] max-w-[86vw] shrink-0 overflow-hidden rounded-[14px] border border-[#2a3240] bg-[#1b1f27] font-sans text-[13px] text-[#e6eaf2] shadow-[0_30px_70px_rgba(0,0,0,0.55)]">
      {/* header */}
      <div className="flex items-center justify-between border-b border-[#333a48] px-3.5 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#4F8CFF] shadow-[0_0_0_3px_#24334f]" />
          <span className="text-[15px] font-bold">Header Modify</span>
        </div>
        <span className="rounded-full bg-[#24334f] px-2 py-[3px] text-[12px] font-semibold text-[#4F8CFF]">
          2
        </span>
      </div>

      {/* profile bar */}
      <div className="flex gap-1.5 border-b border-[#333a48] bg-[#232833] px-3.5 py-2.5">
        <span className="flex flex-1 items-center justify-between rounded-[6px] border border-[#333a48] bg-[#1b1f27] px-2 py-1.5 text-[#e6eaf2]">
          Prod API testing <span className="text-[#9aa4b6]">▾</span>
        </span>
        {["✎", "＋", "🗑"].map((c) => (
          <span
            key={c}
            className="grid w-8 place-items-center rounded-[6px] border border-[#333a48] bg-[#1b1f27] text-[14px] text-[#9aa4b6]"
          >
            {c}
          </span>
        ))}
      </div>

      {/* body */}
      <div className="px-3.5 py-3">
        {/* always on */}
        <div className="mb-3.5 flex items-center gap-2">
          <Toggle on />
          <span className="font-semibold leading-tight">
            Always on
            <span className="mt-0.5 block text-[11px] font-normal text-[#9aa4b6]">
              Apply even when not selected (pinned 📌)
            </span>
          </span>
        </div>

        {/* url filter */}
        <div className="mb-3.5">
          <span className="mb-1 block text-[12px] text-[#9aa4b6]">
            URL filter (empty = all URLs)
          </span>
          <span className="block rounded-[6px] border border-[#333a48] bg-[#1b1f27] px-2.5 py-2 font-mono text-[#e6eaf2]">
            https://*.example.com/*
          </span>
        </div>

        {/* headers */}
        <span className="mb-1.5 block text-[12px] font-semibold text-[#9aa4b6]">
          Headers
        </span>
        <div className="flex flex-col gap-1.5">
          <HeaderRow on name="Authorization" value="Bearer eyJhbG…" />
          <HeaderRow on name="X-Debug" value="1" />
          <HeaderRow name="User-Agent" value="CustomBot/1.0" />
        </div>

        <div className="mt-2.5 flex items-stretch gap-1.5">
          <span className="flex-1 rounded-[6px] border border-dashed border-[#333a48] bg-[#232833] py-2 text-center font-semibold text-[#4F8CFF]">
            ＋ Add header
          </span>
          <span className="grid w-[104px] place-items-center rounded-[6px] border border-dashed border-[#333a48] bg-[#232833] text-[12px] text-[#9aa4b6]">
            Presets…
          </span>
        </div>
      </div>

      {/* footer */}
      <div className="flex items-center justify-between gap-2 border-t border-[#333a48] bg-[#232833] px-3.5 py-2.5">
        <span className="text-[11px] text-[#9aa4b6]">
          Saved &amp; applied automatically
        </span>
        <div className="flex items-center gap-1.5">
          <span className="rounded-[6px] border border-[#333a48] bg-[#1b1f27] px-2.5 py-1 text-[12px] text-[#4F8CFF]">
            Export
          </span>
          <span className="rounded-[6px] bg-[#ffdd00] px-2.5 py-1 text-[12px] font-bold text-[#1a1a1a]">
            ☕ Coffee
          </span>
        </div>
      </div>
    </div>
  );
}
