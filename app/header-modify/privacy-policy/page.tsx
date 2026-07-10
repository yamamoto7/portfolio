import type { Metadata } from "next";
import Link from "next/link";
import HeaderModifyHeader from "@/components/header-modify/HeaderModifyHeader";
import {
  HEADER_MODIFY_APP_NAME,
  HEADER_MODIFY_EFFECTIVE_DATE,
} from "@/lib/header-modify";

export const metadata: Metadata = {
  title: `Privacy Policy — ${HEADER_MODIFY_APP_NAME}`,
};

const APP_NAME = HEADER_MODIFY_APP_NAME;
const EFFECTIVE_DATE = HEADER_MODIFY_EFFECTIVE_DATE;

/* Dark privacy-policy layout for Header Modify. The shared TERMS_WRAPPER_CLASS
 * assumes a light theme (dark text), so we specify a dark variant here. */
const WRAP = [
  "mx-auto w-[640px] max-w-[90%] text-[#E6EAF2]",
  "pt-[50px] pb-[35px] min-[768px]:pt-[90px] min-[768px]:pb-[60px] min-[992px]:pt-[100px] min-[992px]:pb-[80px]",
  "[&_h2]:mb-10 [&_h2]:text-center [&_h2]:font-mono [&_h2]:text-4xl [&_h2]:font-bold [&_h2]:tracking-[-0.02em] min-[768px]:[&_h2]:text-5xl",
  "[&_h4]:mt-[34px] [&_h4]:mb-2.5 [&_h4]:text-xl [&_h4]:font-bold [&_h4]:tracking-[-0.01em]",
  "[&_p]:my-3 [&_p]:text-[15px] [&_p]:leading-[1.8] [&_p]:text-[#A1AAB9]",
  "[&_li]:my-1.5 [&_li]:text-[15px] [&_li]:leading-[1.8] [&_li]:text-[#A1AAB9]",
  "[&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-5",
  "[&_code]:font-mono [&_code]:text-[13px] [&_code]:text-[#7FB0FF]",
  "[&_a]:text-[#4F8CFF] [&_a]:underline",
].join(" ");

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col bg-[#12151b] text-[#E6EAF2]">
      <HeaderModifyHeader
        right={
          <Link
            href="/header-modify"
            className="text-[13px] text-[#9AA4B6] no-underline transition-colors hover:text-[#E6EAF2]"
          >
            Overview
          </Link>
        }
      />

      <div className={`${WRAP} flex-1`}>
        <h2>Privacy Policy</h2>

        <h4>Introduction</h4>
        <p>
          This is the privacy policy for “{APP_NAME}” (the “extension”).
        </p>
        <p>
          The extension is a Chrome extension by ychof that adds custom HTTP
          request headers to the sites you visit. By using the extension, you
          agree to the handling of information described in this policy.
        </p>

        <h4>Data Collection</h4>
        <p>
          The extension <strong>does not collect, transmit, sell, or share</strong>{" "}
          any data, including personally identifiable information.
        </p>
        <ul>
          <li>
            All settings (your header profiles, values, and URL filters) are
            stored <strong>locally</strong> in your browser via{" "}
            <code>chrome.storage.local</code>.
          </li>
          <li>
            Nothing is sent to the developer or any third-party server. There is
            no analytics, no tracking, and no external network communication.
          </li>
        </ul>

        <h4>Permissions</h4>
        <p>The extension uses the following permissions to function.</p>
        <ul>
          <li>
            <code>declarativeNetRequest</code> — used to add your configured HTTP
            request headers to outgoing requests via the browser’s rule engine.
          </li>
          <li>
            <code>storage</code> — used to save your header profiles locally so
            they persist between sessions.
          </li>
          <li>
            Host permissions (<code>&lt;all_urls&gt;</code>) — required so your
            header rules can apply to the sites you choose. The extension does not
            read page content; it only attaches the request headers you configure.
          </li>
        </ul>

        <h4>Data Sharing</h4>
        <p>
          None. Your configuration never leaves your browser. If you use the
          Export feature, the JSON file is saved to your own device by your own
          action.
        </p>

        <h4>Children’s Privacy</h4>
        <p>
          The extension is a developer tool and is not directed at children under
          13. ychof does not knowingly collect personally identifiable
          information from children under 13.
        </p>

        <h4>Changes to This Policy</h4>
        <p>
          This policy may be updated from time to time. Any changes will be posted
          on this page. We encourage you to review this page periodically.
        </p>
        <p>This policy is effective as of {EFFECTIVE_DATE}.</p>

        <h4>Contact</h4>
        <p>
          If you have any questions or suggestions about this privacy policy,
          please feel free to{" "}
          <Link href="/contact?category=app&app=header-modify">get in touch</Link>.
        </p>
      </div>

      <footer className="border-t border-[#232833] bg-[#12151b] px-5 py-12 text-center">
        <div className="mx-auto flex max-w-[960px] flex-col items-center gap-3">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link
              href="/header-modify"
              className="text-[13px] text-[#9AA4B6] no-underline transition-colors hover:text-[#E6EAF2]"
            >
              Overview
            </Link>
            <Link
              href="/contact?category=app&app=header-modify"
              className="text-[13px] text-[#9AA4B6] no-underline transition-colors hover:text-[#E6EAF2]"
            >
              Contact
            </Link>
            <span className="text-[13px] text-[#9AA4B6]">© 2026 ychof</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
