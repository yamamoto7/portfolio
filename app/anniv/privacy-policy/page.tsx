import type { Metadata } from "next";
import Link from "next/link";
import AnnivHeader from "@/components/anniv/AnnivHeader";
import { TERMS_WRAPPER_CLASS } from "@/lib/terms";
import { ANNIV_APP_NAME, ANNIV_EFFECTIVE_DATE } from "@/lib/anniv";

export const metadata: Metadata = {
  title: `Privacy Policy — ${ANNIV_APP_NAME}`,
};

const APP_NAME = ANNIV_APP_NAME;
const EFFECTIVE_DATE = ANNIV_EFFECTIVE_DATE;

export default function Page() {
  return (
    <div className="font-jp flex min-h-screen flex-col bg-[#FFF8F5] text-[#3D2B28]">
      <AnnivHeader
        right={
          <Link
            href="/anniv"
            className="text-[13px] text-[#9C857F] no-underline transition-colors hover:text-[#E8736B]"
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
          The App is provided free of charge by ychof for managing birthdays, anniversaries, and gift records.
          By using the App, you are deemed to have agreed to the handling of information described in this policy.
        </p>

        <h4>Collection of Information</h4>
        <p>
          No account registration is required.
          Data such as the people, birthdays, anniversaries, gift records, notes, and photos you register is stored only on your device.
          ychof does not collect, store, or view any of this content.
        </p>

        <h4>Access to Photos</h4>
        <p>
          Only when you set a photo as a person&apos;s icon does the App read the photo you select.
          The selected photo is saved as data on your device and is never transmitted to any third party, including ychof.
        </p>

        <h4>Notifications</h4>
        <p>
          Reminders for birthdays and anniversaries are sent as local notifications that run on your device.
          Notifications are optional and can be turned off at any time in your device settings. No information is sent externally for notifications.
        </p>

        <h4>Data Backup</h4>
        <p>
          The App&apos;s backup feature exports and imports your data as a file through your own actions.
          The storage location and sharing of the exported file are under your own control and are never transmitted to or stored on ychof&apos;s servers.
        </p>

        <h4>Contact Form</h4>
        <p>
          Only when you use the in-app contact feature are the message you enter and
          the technical information needed to investigate issues (OS version, app version, and build number) sent to the developer.
          This happens only when you perform the send action and is never collected automatically.
        </p>

        <h4>Usage Data and Crash Reports</h4>
        <p>
          To improve the App&apos;s quality, the App uses Google&apos;s Firebase Analytics and Firebase Crashlytics.
          These services anonymously collect how the App is used (for example, screens viewed, app launches,
          and session information), crash and performance diagnostics (such as stack traces, device model,
          OS version, and app version), and an app instance identifier.
          The people, birthdays, anniversaries, gift records, notes, and photos you register are never included.
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
        </p>

        <h4>Security</h4>
        <p>
          While we strive to protect your information, no method of electronic storage or transmission is 100% secure,
          and we cannot guarantee absolute security.
        </p>

        <h4>Children&apos;s Privacy</h4>
        <p>
          ychof does not knowingly collect personally identifiable information from children under the age of 13.
          If we learn that personal information has been provided by a child under the age of 13, we will delete it immediately.
        </p>

        <h4>Changes to This Privacy Policy</h4>
        <p>
          This policy may be updated from time to time. If changes are made, we will notify you by posting them on this page.
          We recommend that you review this page periodically.
        </p>
        <p>This policy is effective as of {EFFECTIVE_DATE}.</p>

        <h4>Contact</h4>
        <p>
          If you have any questions or suggestions about this privacy policy,
          please feel free to <Link href="/contact?category=app&app=anniv">contact us here</Link>.
        </p>
      </div>

      <footer className="bg-[#FFF8F5] px-5 py-12 text-center">
        <div className="mx-auto flex max-w-[960px] flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <Link
            href="/anniv"
            className="text-[13px] text-[#9C857F] no-underline transition-colors hover:text-[#E8736B]"
          >
            About the app
          </Link>
          <Link
            href="/contact?category=app&app=anniv"
            className="text-[13px] text-[#9C857F] no-underline transition-colors hover:text-[#E8736B]"
          >
            Contact
          </Link>
          <span className="text-[13px] text-[#9C857F]">© 2026 ychof</span>
        </div>
      </footer>
    </div>
  );
}
