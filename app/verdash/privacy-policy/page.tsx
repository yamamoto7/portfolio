import type { Metadata } from "next";
import Link from "next/link";
import VerdashHeader from "@/components/verdash/VerdashHeader";
import {
  VERDASH_APP_NAME,
  VERDASH_SHORT_NAME,
  VERDASH_EFFECTIVE_DATE,
} from "@/lib/verdash";

export const metadata: Metadata = {
  title: `Privacy Policy — ${VERDASH_APP_NAME}`,
};

const APP_NAME = VERDASH_APP_NAME;
const EFFECTIVE_DATE = VERDASH_EFFECTIVE_DATE;

/* Verdash 用のダークなプライバシーポリシー版面。共有の TERMS_WRAPPER_CLASS は
 * ライト前提（暗い文字色）のため、ここではダーク向けに個別指定する。 */
const WRAP = [
  "font-jp mx-auto w-[640px] max-w-[90%] text-[#EDEDED]",
  "pt-[50px] pb-[35px] min-[768px]:pt-[90px] min-[768px]:pb-[60px] min-[992px]:pt-[100px] min-[992px]:pb-[80px]",
  "[&_h2]:mb-10 [&_h2]:text-center [&_h2]:font-mono [&_h2]:text-4xl [&_h2]:font-bold [&_h2]:tracking-[-0.02em] min-[768px]:[&_h2]:text-5xl",
  "[&_h4]:mt-[34px] [&_h4]:mb-2.5 [&_h4]:text-xl [&_h4]:font-bold [&_h4]:tracking-[-0.01em]",
  "[&_p]:my-3 [&_p]:text-[15px] [&_p]:leading-[1.9] [&_p]:text-[#A1A1A1]",
  "[&_li]:my-1.5 [&_li]:text-[15px] [&_li]:leading-[1.9] [&_li]:text-[#A1A1A1]",
  "[&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-5",
  "[&_a]:text-[#337AE6] [&_a]:underline",
].join(" ");

export default function Page() {
  return (
    <div className="font-jp flex min-h-screen flex-col bg-black text-[#EDEDED]">
      <VerdashHeader
        right={
          <Link
            href="/verdash"
            className="text-[13px] text-[#8F8F8F] no-underline transition-colors hover:text-[#EDEDED]"
          >
            About the app
          </Link>
        }
      />

      <div className={`${WRAP} flex-1`}>
        <h2>Privacy Policy</h2>

        <h4>Introduction</h4>
        <p>This is the privacy policy for &quot;{APP_NAME}&quot; (the &quot;App&quot;).</p>
        <p>
          The App is an unofficial dashboard client provided by ychof for operating Vercel from an iPhone or Android device.
          It is not an official app provided by Vercel Inc. and is not affiliated with that company. Vercel is a trademark of Vercel Inc.
        </p>
        <p>
          By using the App, you are deemed to have agreed to the handling of information described in this policy.
        </p>

        <h4>Collection of Information</h4>
        <p>
          No account registration is required.
          ychof does not collect, store, or view your access tokens or any data on Vercel.
        </p>

        <h4>Handling of Access Tokens</h4>
        <p>
          Using the App requires a Vercel Personal Access Token (PAT).
          The token you enter is stored securely only on your device (in the iOS Keychain, or encrypted with the Android Keystore)
          and is never transmitted to any third party, including ychof. You can delete the token from within the App at any time.
        </p>

        <h4>Communication with the Vercel API</h4>
        <p>
          Using your token, the App communicates directly with the Vercel API over HTTPS from your device. Information such as the projects, deployments, logs, and environment variables shown
          is fetched anew through this communication each time and is never accumulated outside your device (on ychof&apos;s side).
        </p>
        <p>
          For information sent to or retrieved from Vercel, and for its handling on Vercel&apos;s side,
          <a
            href="https://vercel.com/legal/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vercel&apos;s Privacy Policy
          </a>
          applies.
        </p>

        <h4>Contact Form</h4>
        <p>
          Only when you use the in-app contact feature, the message you enter, your email address (optional), and the
          technical information needed to investigate an issue (OS version, app version, and build number) are sent to the developer.
          This happens only when you choose to submit, and nothing is collected automatically.
        </p>

        <h4>Usage Data and Crash Reports</h4>
        <p>
          To improve the App&apos;s quality, the App uses Google&apos;s Firebase Analytics and Firebase Crashlytics.
          These services anonymously collect how the App is used (for example, screens viewed, app launches,
          and session information), crash and performance diagnostics (such as stack traces, device model,
          OS version, and app version), and an app instance identifier.
          Your access tokens and the contents of your Vercel projects (names, deployments, logs, environment variables, and so on) are never included.
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
        <p>The App does not display advertisements and does not use any advertising SDK.</p>

        <h4>Security</h4>
        <p>
          Access tokens are stored only on your device (iOS Keychain / Android Keystore), and all communication with the Vercel API is conducted over HTTPS.
          While we strive to protect your information, no method of electronic storage or transmission is 100% secure, and we cannot guarantee absolute security.
          Please also manage your tokens yourself, such as revoking them when they are no longer needed.
        </p>

        <h4>Children&apos;s Privacy</h4>
        <p>
          The App is a tool for developers and is not intended for children under the age of 13.
          ychof does not collect personally identifiable information from children under the age of 13.
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
          please feel free to <Link href="/contact?category=app&app=verdash">contact us here</Link>.
        </p>
      </div>

      <footer className="border-t border-[#232323] bg-black px-5 py-12 text-center">
        <div className="mx-auto flex max-w-[960px] flex-col items-center gap-3">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link
              href="/verdash"
              className="text-[13px] text-[#8F8F8F] no-underline transition-colors hover:text-[#EDEDED]"
            >
              About the app
            </Link>
            <Link
              href="/contact?category=app&app=verdash"
              className="text-[13px] text-[#8F8F8F] no-underline transition-colors hover:text-[#EDEDED]"
            >
              Contact
            </Link>
            <span className="text-[13px] text-[#8F8F8F]">© 2026 ychof</span>
          </div>
          <p className="mx-auto max-w-[520px] font-mono text-[11px] leading-[1.7] text-[#5F5F5F]">
            {VERDASH_SHORT_NAME} is not an official app of Vercel Inc.
          </p>
        </div>
      </footer>
    </div>
  );
}
