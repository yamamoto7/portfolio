import type { Metadata } from "next";
import Link from "next/link";
import MugenSudokuHeader from "@/components/mugen-sudoku/MugenSudokuHeader";
import { TERMS_WRAPPER_CLASS } from "@/lib/terms";
import {
  MUGEN_SUDOKU_NAME,
  MUGEN_SUDOKU_ACCENT,
  MUGEN_SUDOKU_EFFECTIVE_DATE,
} from "@/lib/mugen-sudoku";

export const metadata: Metadata = {
  title: `Privacy Policy — ${MUGEN_SUDOKU_NAME}`,
};

const APP_NAME = MUGEN_SUDOKU_NAME;

export default function Page() {
  return (
    <div
      className="font-jp flex min-h-screen flex-col bg-[#ECE3D0] text-app-ink"
      style={{ "--accent": MUGEN_SUDOKU_ACCENT } as React.CSSProperties}
    >
      <MugenSudokuHeader
        right={
          <Link
            href="/mugen-sudoku"
            className="text-[13px] text-muted no-underline transition-colors hover:text-[var(--accent)]"
          >
            About the app
          </Link>
        }
      />

      <div className={`${TERMS_WRAPPER_CLASS} flex-1`}>
        <h2>Privacy Policy</h2>

        <h4>Introduction</h4>
        <p>This is the Privacy Policy for the &quot;{APP_NAME}&quot; app.</p>
        <p>
          ychof built the &quot;{APP_NAME}
          &quot; app as a free app. This service is provided by ychof at no cost and is intended to be used as-is.
        </p>
        <p>
          This page informs you of our policies regarding the handling of personal information for anyone who uses this service.
          By using this service, you agree to the handling of information described in this policy.
        </p>

        <h4>Collection and Use of Information</h4>
        <p>
          ychof does not collect or view any personally identifiable information when you use this app.
          No account registration is required either.
        </p>
        <p>
          However, this app uses the following third-party services that may collect information that could identify you.
        </p>
        <ul>
          <li>
            <a
              href="https://support.google.com/admob/answer/6128543?hl=ja"
              target="_blank"
              rel="noopener noreferrer"
            >
              AdMob (Google)
            </a>
          </li>
        </ul>
        <p>
          For details on what information these services collect and how it is handled, please review the policies at the links above.
        </p>

        <h4>Log Data</h4>
        <p>
          When an error occurs in this app, log data such as your device&apos;s IP address, device name,
          OS version, the date and time you used the service, and other statistics may be collected through third-party products.
        </p>

        <h4>Cookies</h4>
        <p>
          Cookies are files containing a small amount of data that are commonly used as anonymous unique identifiers.
          This service does not explicitly use &quot;cookies&quot; itself, but
          the third-party services above may use &quot;cookies&quot; to collect information and serve ads.
        </p>

        <h4>Security</h4>
        <p>
          We strive to protect your information by commercially acceptable means, but
          no method of transmission over the internet or method of electronic storage is 100% secure, and we cannot guarantee absolute security.
        </p>

        <h4>Links to Other Sites</h4>
        <p>
          This service may contain links to other sites.
          Because these external sites are not operated by ychof, we recommend that you review the privacy policy of each site.
          ychof has no responsibility for the content, policies, or practices of any third-party sites or services.
        </p>

        <h4>Children&apos;s Privacy</h4>
        <p>
          ychof does not knowingly collect personally identifiable information from children under 13.
          If we discover that a child under 13 has provided us with personal information, we will delete it immediately.
          If you are a parent or guardian and become aware that your child has provided personal information, please contact us.
        </p>

        <h4>Changes to This Privacy Policy</h4>
        <p>
          This policy may be updated from time to time. If there are any changes, we will notify you by posting them on this page.
          We recommend that you review this page periodically.
        </p>
        <p>This policy is effective as of {MUGEN_SUDOKU_EFFECTIVE_DATE}.</p>

        <h4>Contact</h4>
        <p>
          If you have any questions or suggestions about this Privacy Policy,
          please feel free to reach out{" "}
          <Link href="/contact?category=app&app=mugen-sudoku">here</Link>.
        </p>
      </div>

      <footer className="border-t border-[#D6CBB2] bg-[#ECE3D0] px-5 py-12 text-center">
        <div className="mx-auto flex max-w-[960px] flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <Link
            href="/mugen-sudoku"
            className="text-[13px] text-muted no-underline transition-colors hover:text-[var(--accent)]"
          >
            About the app
          </Link>
          <Link
            href="/contact?category=app&app=mugen-sudoku"
            className="text-[13px] text-muted no-underline transition-colors hover:text-[var(--accent)]"
          >
            Contact
          </Link>
          <span className="text-[13px] text-muted">© 2026 ychof</span>
        </div>
      </footer>
    </div>
  );
}
