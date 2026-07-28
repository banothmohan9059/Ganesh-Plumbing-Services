// ============================================================
// Privacy Policy Page — Ganesh Plumbing Services
// ============================================================


import { createMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/shared/PageHero";
import { Section } from "@/components/layout/Section";
import { MotionDiv } from "@/components/shared/MotionDiv";
import { SITE_CONFIG } from "@/lib/constants";
import Link from "next/link";

export const metadata = createMetadata({
  title: "Privacy Policy | Ganesh Plumbing Services",
  description:
    "Privacy Policy for Ganesh Plumbing Services. Learn how we collect, use, and protect your personal information when you use our website and services.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  const lastUpdated = "July 24, 2026";

  return (
    <>
      <PageHero
        badge="Legal Information"
        title="Privacy Policy"
        subtitle={`Last Updated: ${lastUpdated}`}
      />

      <Section variant="default" spacing="lg" containerSize="md">
        <MotionDiv preset="fade" className="mx-auto max-w-3xl space-y-12">
          
          <section id="introduction" className="scroll-mt-24 space-y-4">
            <h2 className="font-heading text-2xl font-bold text-foreground">1. Introduction</h2>
            <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                Welcome to <strong>{SITE_CONFIG.name}</strong>. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice or our practices with regard to your personal information, please contact us at {SITE_CONFIG.email}.
              </p>
              <p>
                When you visit our website ({SITE_CONFIG.url}) and use our plumbing services, you trust us with your personal information. We take your privacy very seriously. In this privacy notice, we describe our privacy policy in clear and plain language to explain what information we collect, how we use it, and what rights you have in relation to it.
              </p>
            </div>
          </section>

          <section id="information-collection" className="scroll-mt-24 space-y-4">
            <h2 className="font-heading text-2xl font-bold text-foreground">2. Information We Collect</h2>
            <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our services, or otherwise when you contact us. The personal information that we collect depends on the context of your interactions with us and the website, the choices you make, and the services you use. The personal information we collect may include the following:
              </p>
              <ul className="list-inside list-disc space-y-2 pl-4">
                <li><strong>Contact Information:</strong> Names, phone numbers, and email addresses provided via our contact form or direct communication.</li>
                <li><strong>Service Details:</strong> Information regarding the plumbing issues you are experiencing, your home or business address, and scheduling preferences.</li>
                <li><strong>Website Usage Data:</strong> IP addresses, browser types, and device information collected automatically when you navigate our website.</li>
              </ul>
            </div>
          </section>

          <section id="how-we-use" className="scroll-mt-24 space-y-4">
            <h2 className="font-heading text-2xl font-bold text-foreground">3. How We Use Your Information</h2>
            <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
              </p>
              <ul className="list-inside list-disc space-y-2 pl-4">
                <li>To provide and manage our plumbing services at your location.</li>
                <li>To communicate with you regarding appointments, estimates, and inquiries.</li>
                <li>To send administrative information to you, such as updates to our terms, conditions, and policies.</li>
                <li>To respond to your questions and provide customer support via phone, email, or WhatsApp.</li>
                <li>To improve our website functionality and optimize user experience.</li>
              </ul>
            </div>
          </section>

          <section id="cookies" className="scroll-mt-24 space-y-4">
            <h2 className="font-heading text-2xl font-bold text-foreground">4. Cookies and Tracking Technologies</h2>
            <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Cookies are small data files stored on your hard drive or in device memory that help us improve our services and your experience. You can choose to set your browser to remove or reject browser cookies.
              </p>
            </div>
          </section>

          <section id="third-party" className="scroll-mt-24 space-y-4">
            <h2 className="font-heading text-2xl font-bold text-foreground">5. Third-Party Services</h2>
            <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                We may share your information with trusted third-party service providers that perform services for us or on our behalf. These include:
              </p>
              <ul className="list-inside list-disc space-y-2 pl-4">
                <li><strong>Google Maps:</strong> Used to display our service locations and business headquarters.</li>
                <li><strong>Google Analytics:</strong> (Future implementation) Used to analyze website traffic and user behavior.</li>
                <li><strong>Google Business Profile:</strong> Used to manage our local presence and customer reviews.</li>
                <li><strong>WhatsApp:</strong> Used as a primary communication channel for rapid customer support and emergency service requests.</li>
                <li><strong>Email Providers:</strong> Used for secure transmission of contact form submissions and professional correspondence.</li>
              </ul>
              <p>
                These third parties are bound by strict confidentiality agreements and are prohibited from using your personal information for any purpose other than providing these specialized services to {SITE_CONFIG.name}.
              </p>
            </div>
          </section>

          <section id="data-protection" className="scroll-mt-24 space-y-4">
            <h2 className="font-heading text-2xl font-bold text-foreground">6. Data Protection and Security</h2>
            <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
              </p>
            </div>
          </section>

          <section id="your-rights" className="scroll-mt-24 space-y-4">
            <h2 className="font-heading text-2xl font-bold text-foreground">7. Your Rights</h2>
            <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                Depending on your location and applicable data protection laws, you may have certain rights regarding your personal information, including the right to:
              </p>
              <ul className="list-inside list-disc space-y-2 pl-4">
                <li>Request access and obtain a copy of your personal information.</li>
                <li>Request rectification or erasure of your data.</li>
                <li>Restrict the processing of your personal information.</li>
                <li>Object to the processing of your data for direct marketing purposes.</li>
              </ul>
              <p>
                To exercise any of these rights, please contact us using the information provided below.
              </p>
            </div>
          </section>

          <section id="childrens-privacy" className="scroll-mt-24 space-y-4">
            <h2 className="font-heading text-2xl font-bold text-foreground">8. Children&apos;s Privacy</h2>
            <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that a child has provided us with personal information, we will take steps to delete such information immediately.
              </p>
            </div>
          </section>

          <section id="policy-updates" className="scroll-mt-24 space-y-4">
            <h2 className="font-heading text-2xl font-bold text-foreground">9. Policy Updates</h2>
            <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                We may update this privacy notice from time to time. The updated version will be indicated by an updated &quot;Last Updated&quot; date and the updated version will be effective as soon as it is accessible. We encourage you to review this privacy notice frequently to be informed of how we are protecting your information.
              </p>
            </div>
          </section>

          <section id="contact-us" className="scroll-mt-24 space-y-4">
            <h2 className="font-heading text-2xl font-bold text-foreground">10. Contact Information</h2>
            <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                If you have questions or comments about this notice, you may email us at <a href={`mailto:${SITE_CONFIG.email}`} className="font-medium text-brand-600 hover:underline">{SITE_CONFIG.email}</a> or contact us by post or phone:
              </p>
              <address className="rounded-xl border border-border bg-card p-6 font-medium not-italic">
                <p className="font-bold text-foreground">{SITE_CONFIG.name}</p>
                <p className="mt-2">218/2, near Ambedkar Circle,</p>
                <p>near Janapriya Apartments, Ambedkar Nagar,</p>
                <p>Hafeezpet, Miyapur, Hyderabad, Telangana 500049</p>
                <p className="mt-4">
                  <strong>Phone:</strong> <a href={`tel:${SITE_CONFIG.phone}`} className="text-brand-600 hover:underline">{SITE_CONFIG.phone}</a>
                </p>
              </address>
              <p className="pt-4">
                For immediate assistance, please visit our <Link href="/contact" className="font-medium text-brand-600 hover:underline">Contact Page</Link>.
              </p>
            </div>
          </section>

        </MotionDiv>
      </Section>
    </>
  );
}
