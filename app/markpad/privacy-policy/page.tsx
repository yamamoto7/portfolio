import type { Metadata } from "next";
import Link from "next/link";
import MarkPadHeader from "@/components/markpad/MarkPadHeader";
import { TERMS_WRAPPER_CLASS } from "@/lib/terms";
import { MARKPAD_APP_NAME, MARKPAD_EFFECTIVE_DATE } from "@/lib/markpad";

export const metadata: Metadata = {
  title: `Privacy Policy — ${MARKPAD_APP_NAME}`,
};

const APP_NAME = MARKPAD_APP_NAME;
const EFFECTIVE_DATE = MARKPAD_EFFECTIVE_DATE;

export default function Page() {
  return (
    <div className="font-jp flex min-h-screen flex-col bg-[#FBFBFC] text-[#1F2328]">
      <MarkPadHeader
        right={
          <Link
            href="/markpad"
            className="text-[13px] text-[#656D76] no-underline transition-colors hover:text-[#337AE5]"
          >
            About the app
          </Link>
        }
      />

      <div className={`${TERMS_WRAPPER_CLASS} flex-1`}>
        <h2>Privacy Policy</h2>

        <h4>Introduction</h4>
        <p>This is the privacy policy for &quot;{APP_NAME}&quot; (the &quot;App&quot;).</p>
        <p>
          The App is a Markdown editor and previewer provided by ychof.
          By using the App, you agree to the handling of information described in this policy.
        </p>

        <h4>Collection of Information</h4>
        <p>
          No account registration is required.
          Data such as the notes you create, along with tags and settings, is stored solely on your device.
          There is no cloud sync, and ychof does not collect, store, or view this content.
        </p>

        <h4>Sharing and Exporting</h4>
        <p>
          The App lets you share and export notes as text or .md files.
          The destination (AirDrop, email, other apps, and so on) and where the file is saved are chosen by you,
          and nothing is transmitted to or stored on ychof&apos;s servers.
        </p>

        <h4>Contact Form</h4>
        <p>
          Only when you use the in-app contact feature, the message you enter and the
          technical information needed to investigate an issue (OS version, app version, and build number) are sent to the developer.
          This happens only when you choose to submit, and nothing is collected automatically.
        </p>

        <h4>Usage Data and Crash Reports</h4>
        <p>
          To improve the App&apos;s quality, the App uses Google&apos;s Firebase Analytics and Firebase Crashlytics.
          These services anonymously collect how the App is used (for example, screens viewed, app launches,
          and session information), crash and performance diagnostics (such as stack traces, device model,
          OS version, and app version), and an app instance identifier.
          The content of your notes is never included.
        </p>
        <p>
          This information is not linked to your identity, is not used for advertising or tracking,
          and the advertising identifier (IDFA / Advertising ID) is not collected.
          You can turn this off at any time under Settings &gt; Privacy &gt; &quot;Send usage and crash reports&quot;.
        </p>
        <p>
          For details on how Google handles this data, see the{" "}
          <a href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener noreferrer">
            Firebase privacy information
          </a>
          .
        </p>

        <h4>Advertising</h4>
        <p>
          The App does not display advertisements and does not use any advertising SDK.
          Code highlighting and diagram rendering are all handled entirely within the app (offline).
        </p>

        <h4>Security</h4>
        <p>
          We strive to protect your information, but no method of electronic storage or transmission is 100% secure,
          and we cannot guarantee absolute security.
        </p>

        <h4>Children&apos;s Privacy</h4>
        <p>
          ychof does not knowingly collect personally identifiable information from children under 13.
          If we learn that personal information has been provided by a child under 13, we will delete it immediately.
        </p>

        <h4>Changes to This Privacy Policy</h4>
        <p>
          This policy may be updated from time to time. If any changes are made, we will notify you by posting them on this page.
          We recommend that you review this page periodically.
        </p>
        <p>This policy is effective as of {EFFECTIVE_DATE}.</p>

        <h4>Contact</h4>
        <p>
          If you have any questions or suggestions about this privacy policy,
          please feel free to <Link href="/contact?category=app&app=markpad">contact us here</Link>.
        </p>
      </div>

      <footer className="bg-[#FBFBFC] px-5 py-12 text-center">
        <div className="mx-auto flex max-w-[960px] flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <Link
            href="/markpad"
            className="text-[13px] text-[#656D76] no-underline transition-colors hover:text-[#337AE5]"
          >
            About the app
          </Link>
          <Link
            href="/contact?category=app&app=markpad"
            className="text-[13px] text-[#656D76] no-underline transition-colors hover:text-[#337AE5]"
          >
            Contact
          </Link>
          <span className="text-[13px] text-[#656D76]">© 2026 ychof</span>
        </div>
      </footer>
    </div>
  );
}
