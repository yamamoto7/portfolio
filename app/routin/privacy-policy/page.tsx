import type { Metadata } from "next";
import Link from "next/link";
import RoutinHeader from "@/components/routin/RoutinHeader";
import { TERMS_WRAPPER_CLASS } from "@/lib/terms";
import { ROUTIN_APP_NAME } from "@/lib/routin";

export const metadata: Metadata = {
  title: `Privacy Policy — ${ROUTIN_APP_NAME}`,
};

const APP_NAME = ROUTIN_APP_NAME;
const EFFECTIVE_DATE = "June 6, 2026";

export default function Page() {
  return (
    <div className="font-jp flex min-h-screen flex-col bg-[#F7F5F0] text-[#282826]">
      <RoutinHeader
        right={
          <Link
            href="/routin"
            className="text-[13px] text-[#85827D] no-underline transition-colors hover:text-[#6A826D]"
          >
            App overview
          </Link>
        }
      />

      <div className={`${TERMS_WRAPPER_CLASS} flex-1`}>
        <h2>Privacy Policy</h2>

        <h4>Introduction</h4>
        <p>This is the privacy policy for the &quot;{APP_NAME}&quot; app.</p>
        <p>
          ychof built the &quot;{APP_NAME}&quot; app as a free app. This Service
          is provided by ychof at no cost and is intended to be used as is.
        </p>
        <p>
          This page informs you of our policies regarding the handling of
          personal information in connection with your use of this Service. If
          you choose to use this Service, you agree to the handling of
          information described in this policy.
        </p>

        <h4>Information Collection and Use</h4>
        <p>
          Data you create in &quot;{APP_NAME}&quot;, such as routines and
          records, is stored only on your device. ychof does not collect or view
          this content. No account registration is required.
        </p>
        <p>
          However, in order to display ads, this app uses the following
          third-party service, which may collect information that can be used to
          identify you.
        </p>
        <ul>
          <li>
            <a
              href="https://support.google.com/admob/answer/6128543?hl=ja"
              target="_blank"
              rel="noopener noreferrer"
            >
              AdMob（Google）
            </a>
          </li>
        </ul>
        <p>
          For information on what AdMob collects and how it handles that data,
          please review the policy at the link above.
        </p>

        <h4>Log Data</h4>
        <p>
          If an error occurs in this app, log data may be collected through a
          third-party product, including your device&apos;s IP address, device
          name, OS version, the date and time you use this Service, and other
          statistical information.
        </p>

        <h4>Cookies</h4>
        <p>
          Cookies are files containing a small amount of data that are commonly
          used as anonymous unique identifiers. This Service does not explicitly
          use these &quot;cookies&quot; itself, but the third-party service noted
          above (AdMob) may use &quot;cookies&quot; to collect information and
          deliver ads.
        </p>

        <h4>Security</h4>
        <p>
          We strive to protect your information using commercially acceptable
          means, but no method of transmission over the internet or method of
          electronic storage is 100% secure, and we cannot guarantee absolute
          security.
        </p>

        <h4>Links to Other Sites</h4>
        <p>
          This Service may contain links to other sites. These external sites
          are not operated by ychof, so we recommend that you review the privacy
          policy of each site. ychof is not responsible for the content,
          policies, or practices of any third-party sites or services.
        </p>

        <h4>Children&apos;s Privacy</h4>
        <p>
          ychof does not knowingly collect personally identifiable information
          from children under 13. If we discover that a child under 13 has
          provided personal information, we will delete it immediately. If you
          are a parent or guardian and become aware that your child has provided
          us with personal information, please contact us.
        </p>

        <h4>Changes to This Privacy Policy</h4>
        <p>
          This policy may be updated from time to time. If there are any
          changes, we will notify you by posting them on this page. We recommend
          that you review this page periodically.
        </p>
        <p>This policy is effective as of {EFFECTIVE_DATE}.</p>

        <h4>Contact Us</h4>
        <p>
          If you have any questions or suggestions about this privacy policy,
          please feel free to contact us{" "}
          <Link href="/contact?category=app&app=routin">here</Link>.
        </p>
      </div>

      <footer className="bg-[#F7F5F0] px-5 py-12 text-center">
        <div className="mx-auto flex max-w-[960px] flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <Link
            href="/routin"
            className="text-[13px] text-[#85827D] no-underline transition-colors hover:text-[#6A826D]"
          >
            App overview
          </Link>
          <Link
            href="/contact?category=app&app=routin"
            className="text-[13px] text-[#85827D] no-underline transition-colors hover:text-[#6A826D]"
          >
            Contact
          </Link>
          <span className="text-[13px] text-[#85827D]">© 2026 ychof</span>
        </div>
      </footer>
    </div>
  );
}
