import type { Metadata } from "next";
import Link from "next/link";
import LasttimeHeader from "@/components/lasttime/LasttimeHeader";
import { TERMS_WRAPPER_CLASS } from "@/lib/terms";
import { LASTTIME_APP_NAME, LASTTIME_EFFECTIVE_DATE } from "@/lib/lasttime";

export const metadata: Metadata = {
  title: `Privacy Policy — ${LASTTIME_APP_NAME}`,
};

const APP_NAME = LASTTIME_APP_NAME;
const EFFECTIVE_DATE = LASTTIME_EFFECTIVE_DATE;

export default function Page() {
  return (
    <div className="font-jp flex min-h-screen flex-col bg-[#F6F3EC] text-[#2A2A28]">
      <LasttimeHeader
        right={
          <Link
            href="/lasttime-list"
            className="text-[13px] text-[#847F74] no-underline transition-colors hover:text-[#2E6A50]"
          >
            About the app
          </Link>
        }
      />

      <div className={`${TERMS_WRAPPER_CLASS} flex-1`}>
        <h2>Privacy Policy</h2>

        <h4>Introduction</h4>
        <p>This is the privacy policy for the “{APP_NAME}” app.</p>
        <p>
          ychof built the “{APP_NAME}
          ” app as a free app. This service is provided by ychof at no cost and is intended for use as is.
        </p>
        <p>
          This page informs you of our policies regarding the handling of personal information when you use this service.
          By using this service, you agree to the handling of information described in this policy.
        </p>

        <h4>Information Collection and Use</h4>
        <p>
          Data such as records, photos, and notes created in “{APP_NAME}
          ” is stored only on your device and, as described below, in your own iCloud.
          ychof does not collect, view, or transmit this content externally. No account registration is required.
        </p>

        <h4>About iCloud (iCloud Sync)</h4>
        <p>
          If you are signed in to iCloud, this app&apos;s records and photos are synced to your own account on
          iCloud (CloudKit) provided by Apple, in preparation for device changes and backups.
          This data is tied to your Apple
          ID and cannot be accessed by ychof.
          The handling of information stored in iCloud is governed by
          <a
            href="https://www.apple.com/legal/privacy/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Apple&apos;s Privacy Policy
          </a>
          . If you do not wish to sync to iCloud, you can turn it off in your device settings.
        </p>

        <h4>About Photos</h4>
        <p>
          When attaching a photo to a record, this app may request access to your photo library or camera.
          The photos you select or take are saved as part of the record on your device (and your iCloud),
          and are never transmitted externally.
        </p>

        <h4>Data Backup</h4>
        <p>
          The backup feature exports and imports your records and photos as a file through your own actions.
          The storage location and sharing of the exported file are under your own control and are never transmitted to or stored on ychof&apos;s servers.
        </p>

        <h4>Contact Form</h4>
        <p>
          Only when you use the in-app contact feature are the message you enter, the email address you optionally provide,
          and the technical information needed to investigate issues (OS version and app version) sent to the developer.
          This happens only when you perform the send action and is never collected automatically.
        </p>

        <h4>Usage Data and Crash Reports</h4>
        <p>
          To improve the app&apos;s quality, this app uses Google&apos;s Firebase Analytics and Firebase Crashlytics.
          These services anonymously collect how the app is used (for example, screens viewed, app launches,
          and session information), crash and performance diagnostics (such as stack traces, device model,
          OS version, and app version), and an app instance identifier.
          The records, photos, and notes you create are never included.
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
          This app does not display advertisements and does not use any advertising SDK.
        </p>

        <h4>Security</h4>
        <p>
          This app lets you enable a launch lock using Face ID / Touch ID
          / passcode in the settings.
          While we strive to protect your information, no method of electronic storage is 100% secure, and we cannot guarantee its absolute security.
        </p>

        <h4>Children&apos;s Privacy</h4>
        <p>
          ychof does not knowingly collect personally identifiable information from children under 13.
          This app does not collect information that identifies you, but if you have any concerns, please contact us.
        </p>

        <h4>Changes to This Privacy Policy</h4>
        <p>
          This policy may be updated from time to time. If any changes are made, we will notify you by posting them on this page.
          We recommend that you review this page periodically.
        </p>
        <p>This policy is effective as of {EFFECTIVE_DATE}.</p>

        <h4>Contact Us</h4>
        <p>
          If you have any questions or suggestions about this privacy policy, please feel free to contact us{" "}
          <Link href="/contact?category=app&app=lasttime-list">here</Link>.
        </p>
      </div>

      <footer className="bg-[#F6F3EC] px-5 py-12 text-center">
        <div className="mx-auto flex max-w-[960px] flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <Link
            href="/lasttime-list"
            className="text-[13px] text-[#847F74] no-underline transition-colors hover:text-[#2E6A50]"
          >
            About the app
          </Link>
          <Link
            href="/contact?category=app&app=lasttime-list"
            className="text-[13px] text-[#847F74] no-underline transition-colors hover:text-[#2E6A50]"
          >
            Contact
          </Link>
          <span className="text-[13px] text-[#847F74]">© 2026 ychof</span>
        </div>
      </footer>
    </div>
  );
}
