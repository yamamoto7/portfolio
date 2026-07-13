import type { Metadata } from "next";
import Link from "next/link";
import SeeHueHeader from "@/components/seehue/SeeHueHeader";
import { TERMS_WRAPPER_CLASS } from "@/lib/terms";
import { SEEHUE_APP_NAME, SEEHUE_EFFECTIVE_DATE } from "@/lib/seehue";

export const metadata: Metadata = {
  title: `Privacy Policy — ${SEEHUE_APP_NAME}`,
};

const APP_NAME = SEEHUE_APP_NAME;
const EFFECTIVE_DATE = SEEHUE_EFFECTIVE_DATE;

export default function Page() {
  return (
    <div className="font-jp flex min-h-screen flex-col bg-[#FAF7F2] text-[#2A2E33]">
      <SeeHueHeader
        right={
          <Link
            href="/seehue"
            className="text-[13px] text-[#6E7378] no-underline transition-colors hover:text-[#337AE6]"
          >
            About the app
          </Link>
        }
      />

      <div className={`${TERMS_WRAPPER_CLASS} flex-1`}>
        <h2>Privacy Policy</h2>

        <h4>Introduction</h4>
        <p>This is the Privacy Policy for &quot;{APP_NAME}&quot; (hereinafter &quot;the app&quot;).</p>
        <p>
          The app is a color-assist camera for people who have difficulty distinguishing colors, provided by ychof.
          By using the app, you agree to the handling of information described in this policy.
        </p>

        <h4>Collection of Information</h4>
        <p>
          The app has no servers operated by ychof, and no account registration is required.
          Settings such as the profiles you create and the colors you save are stored solely on your device,
          and ychof does not collect, store, or view them.
        </p>

        <h4>Use of the Camera</h4>
        <p>
          The app uses the camera to correct and simulate colors and to check color names.
          The camera footage is only processed in real time on your device; it is never saved or transmitted externally.
        </p>

        <h4>Access to Photos</h4>
        <p>
          When you load a photo to correct or simulate it, the image you select is processed only on your device.
          It is saved to your photo library only when you perform an action to save the corrected image.
          Images are never transmitted to any third party, including ychof.
        </p>

        <h4>Contact Form</h4>
        <p>
          Only when you use the in-app contact feature, the message you enter and the technical information needed to investigate issues
          (OS version, app version, and build number) are sent to the developer.
          This happens only when you perform the send action; it is never collected automatically.
        </p>

        <h4>Advertising and Analytics</h4>
        <p>
          The app does not use any advertising SDKs or analytics tools that track your behavior.
        </p>

        <h4>Log Data</h4>
        <p>
          When an error occurs in the app, diagnostic information such as your device model, OS version,
          and the circumstances at the time of the error may be sent to Apple through Apple&apos;s mechanisms.
          This happens only if you have allowed it in your device settings, and ychof does not receive any personally identifiable information.
        </p>

        <h4>Disclaimer</h4>
        <p>
          The app is a tool to assist with distinguishing colors; it does not diagnose or treat color vision characteristics.
          Self-check results vary depending on screen brightness, lighting, and how your device renders color.
          For an accurate diagnosis, please consult an ophthalmologist.
        </p>

        <h4>Security</h4>
        <p>
          We strive to protect your information, but no method of electronic storage or transmission is 100% secure,
          and we cannot guarantee absolute security.
        </p>

        <h4>Children&apos;s Privacy</h4>
        <p>
          ychof does not knowingly collect personally identifiable information from children under 13.
          If we discover that a child under 13 has provided us with personal information, we will delete it immediately.
        </p>

        <h4>Changes to This Privacy Policy</h4>
        <p>
          This policy may be updated from time to time. If there are any changes, we will notify you by posting them on this page.
          We recommend that you review this page periodically.
        </p>
        <p>This policy is effective as of {EFFECTIVE_DATE}.</p>

        <h4>Contact</h4>
        <p>
          If you have any questions or suggestions about this Privacy Policy,
          please feel free to reach out{" "}
          <Link href="/contact?category=app&app=seehue">here</Link>.
        </p>
      </div>

      <footer className="bg-[#FAF7F2] px-5 py-12 text-center">
        <div className="mx-auto flex max-w-[960px] flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <Link
            href="/seehue"
            className="text-[13px] text-[#6E7378] no-underline transition-colors hover:text-[#337AE6]"
          >
            About the app
          </Link>
          <Link
            href="/contact?category=app&app=seehue"
            className="text-[13px] text-[#6E7378] no-underline transition-colors hover:text-[#337AE6]"
          >
            Contact
          </Link>
          <span className="text-[13px] text-[#6E7378]">© 2026 ychof</span>
        </div>
      </footer>
    </div>
  );
}
