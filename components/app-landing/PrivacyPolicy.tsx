import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import { PRIVACY_CONTACT_FORM, type AppConfig } from "@/lib/apps";
import { TERMS_WRAPPER_CLASS } from "@/lib/terms";

export default function PrivacyPolicy({ app }: { app: AppConfig }) {
  const name = app.fullName;
  return (
    <div style={{ "--accent": app.accent } as React.CSSProperties}>
      <AppHeader app={app} />
      <div className={TERMS_WRAPPER_CLASS}>
        <h2>Privacy Policy</h2>
        <h4>About</h4>
        <p>This is the privacy policy for the &ldquo;{name}&rdquo; app.</p>
        <p>
          ychof built the &ldquo;{name}
          &rdquo; app as a free app. This service is provided by ychof at no cost and is intended for use as is.
        </p>
        <p>
          This page is used to inform you of my policies regarding the collection, use, and disclosure of personal information when you use this service.
        </p>
        <p>
          If you choose to use my service, you agree to the collection and use of information in relation to this policy.
          The personal information that I collect is used for providing and improving the service.
          I will not use or share your information with anyone except as described in this Privacy Policy.
        </p>
        <p>
          The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which are accessible at &ldquo;
          {name}&rdquo;, unless otherwise defined in this Privacy Policy.
        </p>
        <h4>Information Collection and Use</h4>
        <p>
          For a better experience while using our service, I may require you to provide us with certain personally identifiable information.
          The information that I request will be retained on your device and is not collected by me in any way.
        </p>
        <p>
          The app does use third-party services that may collect information used to identify you.
        </p>
        <p>Links to the privacy policies of the third-party service providers used by the app</p>
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
        </ul>
        <h4>Log Data</h4>
        <p>
          I want to inform you that whenever you use my service, in the event of an error in the app,
          I collect data and information (through third-party products) on your phone called Log Data.
          This Log Data may include information such as your device&rsquo;s IP address, device name, operating system version,
          the configuration of the app when using my service, the time and date of your use of the service, and other statistics.
        </p>
        <h4>Cookies</h4>
        <p>
          Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers.
          These are sent to your browser from the websites that you visit and are stored on your device&rsquo;s internal memory.
        </p>
        <p>
          This service does not use these &ldquo;cookies&rdquo; explicitly.
          However, the app may use third-party code and libraries that use &ldquo;cookies&rdquo; to collect information and improve their services.
          You have the option to either accept or refuse these cookies and to know when a cookie is being sent to your device.
          If you choose to refuse our cookies, you may not be able to use some portions of this service.
        </p>
        <h4>Service Providers</h4>
        <p>I may employ third-party companies and individuals for the following reasons:</p>
        <ul>
          <li>
            <span>✓</span> To facilitate our service;
          </li>
          <li>
            <span>✓</span> To provide the service on our behalf;
          </li>
          <li>
            <span>✓</span> To perform service-related services; or
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
          I value your trust in providing us your personal information, and we strive to use commercially acceptable means of protecting it.
          But please remember that no method of transmission over the internet, or method of electronic storage, is 100% secure and reliable, and I cannot guarantee its absolute security.
        </p>
        <h4>Links to Other Sites</h4>
        <p>
          This service may contain links to other sites.
          If you click on a third-party link, you will be directed to that site.
          Note that these external sites are not operated by me.
          Therefore, I strongly advise you to review the privacy policy of these websites.
          I have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party sites or services.
        </p>
        <h4>Children&rsquo;s Privacy</h4>
        <p>
          I do not knowingly collect personally identifiable information from children under 13 years of age.
          In the case I discover that a child under 13 has provided me with personal information, I immediately delete this from our servers.
          If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact me so that I can take the necessary actions.
        </p>
        <h4>Changes to This Privacy Policy</h4>
        <p>
          I may update our Privacy Policy from time to time.
          Thus, you are advised to review this page periodically for any changes.
          I will notify you of any changes by posting the new Privacy Policy on this page.
        </p>
        <p>This policy is effective as of {app.effectiveDate}.</p>
        <h4>Contact Us</h4>
        <p>
          If you have any questions or suggestions about my Privacy Policy, do not hesitate to contact me{" "}
          <a href={PRIVACY_CONTACT_FORM}>here</a>.
        </p>
      </div>
      <AppFooter app={app} />
    </div>
  );
}
