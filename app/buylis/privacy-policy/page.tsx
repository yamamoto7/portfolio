import type { Metadata } from "next";
import BuylisHeader from "@/components/buylis/BuylisHeader";
import BuylisFooter from "@/components/buylis/BuylisFooter";
import { TERMS_WRAPPER_CLASS } from "@/lib/terms";

export const metadata: Metadata = { title: "Privacy Policy - Buylis" };

const CONTACT_FORM =
  "https://docs.google.com/forms/d/e/1FAIpQLScIq5olkqW5iIw1PdxWeNKoIx9YBvcsu6YaOOwclsPywcfEbg/viewform";

export default function Page() {
  return (
    <>
      <BuylisHeader />
      <div className={TERMS_WRAPPER_CLASS}>
        <h2>Privacy Policy</h2>
        <h4>About</h4>
        <p>This is the privacy policy for the &quot;Shopping List&quot; app.</p>
        <p>
          ychof built the &quot;Shopping List&quot; app as a free app. This service is provided by ychof at no cost and is intended to be used as is.
        </p>
        <p>
          This page informs you of our policies regarding the collection, use, and disclosure of personal information when you use this service.
        </p>
        <p>
          By using this service, you agree to the collection and use of information in accordance with this policy.
          The personal information I collect is used to provide and improve the service.
          I will not use or share your information with anyone except as described in this privacy policy.
        </p>
        <p>
          The terms used in this privacy policy have the same meaning as in our Terms of Service, accessible within &quot;Shopping List,&quot; unless otherwise defined in this privacy policy.
        </p>
        <h4>Collection and Use of Information</h4>
        <p>
          To provide you with a better service while you use ours, I may ask you to provide certain personally identifiable information.
          The information I request is retained on your device and is not collected by me in any way.
        </p>
        <p>
          The App uses third-party services that may collect information used to identify you.
        </p>
        <p>Links to the privacy policies of the third-party service providers used by the app:</p>
        <ul>
          <li>
            <a
              href="https://support.google.com/admob/answer/6128543?hl=en"
              target="_blank"
              rel="noopener noreferrer"
            >
              AdMob
            </a>
          </li>
          <li>
            <a
              href="https://firebase.google.com/support/privacy?hl=ja"
              target="_blank"
              rel="noopener noreferrer"
            >
              Firebase Crashlytics
            </a>
          </li>
        </ul>
        <h4>Log Data</h4>
        <p>
          I want to inform you that whenever you use my service, in the event of an error in the app,
          I collect data and information (through third-party products) on your phone called Log Data.
          This Log Data may include information such as your device&apos;s IP address, device name, operating system version,
          the configuration of the app when using my service, the time and date of your use of the service, and other statistics.
        </p>
        <h4>Cookies</h4>
        <p>
          Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers.
          They are sent to your browser from the websites you visit and are stored in your device&apos;s internal memory.
        </p>
        <p>
          This service does not use these &quot;cookies&quot; explicitly.
          However, the app may use third-party code and libraries that use &quot;cookies&quot; to collect information and improve their services.
          You have the option to either accept or refuse these cookies, and to know when a cookie is being sent to your device.
          If you choose to refuse our cookies, you may not be able to use some portions of this service.
        </p>
        <h4>Service Providers</h4>
        <p>I may employ third-party companies and individuals for the following reasons:</p>
        <ul>
          <li>
            <span>✓</span> To facilitate our service.
          </li>
          <li>
            <span>✓</span> To provide the service on our behalf.
          </li>
          <li>
            <span>✓</span> To perform service-related services.
          </li>
          <li>
            <span>✓</span> To assist us in analyzing how our service is used.
          </li>
        </ul>
        <p>
          I want to inform users of this service that these third parties have access to their personal information.
          The reason is to perform the tasks assigned to them on our behalf.
          However, they are obligated not to disclose or use the information for any other purpose.
        </p>
        <h4>Security</h4>
        <p>
          Providing your personal information is a matter of your trust, and I strive to protect it using commercially acceptable means.
          Please note, however, that no method of transmission over the internet or method of electronic storage is 100% secure and reliable, and I cannot guarantee its absolute security.
        </p>
        <h4>Links to Other Sites</h4>
        <p>
          This service may contain links to other sites.
          If you click on a third-party link, you will be directed to that site.
          Note that these external sites are not operated by me.
          Therefore, I strongly advise you to review the privacy policy of these websites.
          I have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party sites or services.
        </p>
        <h4>Children&apos;s Privacy</h4>
        <p>
          I do not knowingly collect personally identifiable information from children under 13.
          In the event that I discover that a child under 13 has provided personal information, I will immediately delete it from our servers.
          If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact me so that I can take the necessary action.
        </p>
        <h4>Changes to This Privacy Policy</h4>
        <p>
          I may update this privacy policy from time to time.
          Therefore, you are advised to review this page periodically for any changes.
          I will notify you of any changes by posting the new privacy policy on this page.
        </p>
        <p>This policy is effective as of 2023-01-18.</p>
        <p>This policy is effective as of 2023-01-18</p>
        <h4>Contact</h4>
        <p>
          If you have any questions or suggestions about my privacy policy, please do not hesitate to
          contact me <a href={CONTACT_FORM}>here</a>.
        </p>
      </div>
      <BuylisFooter />
    </>
  );
}
