// ============================================================
// Terms & Conditions Page — Ganesh Plumbing Services
// ============================================================


import { createMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/shared/PageHero";
import { Section } from "@/components/layout/Section";
import { MotionDiv } from "@/components/shared/MotionDiv";
import { SITE_CONFIG } from "@/lib/constants";
import Link from "next/link";

export const metadata = createMetadata({
  title: "Terms & Conditions | Ganesh Plumbing Services",
  description:
    "Terms and Conditions for Ganesh Plumbing Services. Read our service agreements, pricing policies, and customer responsibilities.",
  path: "/terms",
});

export default function TermsAndConditionsPage() {
  const lastUpdated = "July 24, 2026";

  return (
    <>
      <PageHero
        badge="Legal Information"
        title="Terms & Conditions"
        subtitle={`Last Updated: ${lastUpdated}`}
      />

      <Section variant="default" spacing="lg" containerSize="md">
        <MotionDiv preset="fade" className="mx-auto max-w-3xl space-y-12">
          
          <section id="introduction" className="scroll-mt-24 space-y-4">
            <h2 className="font-heading text-2xl font-bold text-foreground">1. Introduction</h2>
            <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                Welcome to <strong>{SITE_CONFIG.name}</strong>. These Terms and Conditions outline the rules and regulations for the use of our website ({SITE_CONFIG.url}) and the plumbing services we provide in Hyderabad, Telangana, India.
              </p>
            </div>
          </section>

          <section id="acceptance" className="scroll-mt-24 space-y-4">
            <h2 className="font-heading text-2xl font-bold text-foreground">2. Acceptance of Terms</h2>
            <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                By accessing this website or booking a service with {SITE_CONFIG.name}, you accept these terms and conditions in full. Do not continue to use {SITE_CONFIG.name}&apos;s website or services if you do not accept all of the terms and conditions stated on this page.
              </p>
            </div>
          </section>

          <section id="services-offered" className="scroll-mt-24 space-y-4">
            <h2 className="font-heading text-2xl font-bold text-foreground">3. Services Offered</h2>
            <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                We offer a range of residential and commercial plumbing services, including but not limited to leak detection, pipe repair, drain cleaning, water heater installation, and emergency plumbing. While we strive to resolve every issue, we reserve the right to decline services if the site is deemed unsafe or if the requested repair violates local building codes.
              </p>
            </div>
          </section>

          <section id="customer-responsibilities" className="scroll-mt-24 space-y-4">
            <h2 className="font-heading text-2xl font-bold text-foreground">4. Customer Responsibilities</h2>
            <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                As a customer, you agree to:
              </p>
              <ul className="list-inside list-disc space-y-2 pl-4">
                <li>Provide accurate details regarding the plumbing issue and property location.</li>
                <li>Ensure our plumbers have safe, unobstructed access to the work area, including water shut-off valves and electrical panels if necessary.</li>
                <li>Secure pets and clear the work area of valuable or fragile items prior to our arrival.</li>
              </ul>
            </div>
          </section>

          <section id="estimates-pricing" className="scroll-mt-24 space-y-4">
            <h2 className="font-heading text-2xl font-bold text-foreground">5. Estimates & Pricing</h2>
            <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                Initial estimates provided over the phone or via WhatsApp are approximate. A final, binding quote will be provided after an on-site inspection. If hidden damage or unforeseen complications are discovered during the repair process, we will pause work and present a revised estimate for your approval before continuing.
              </p>
            </div>
          </section>

          <section id="emergency-disclaimer" className="scroll-mt-24 space-y-4">
            <h2 className="font-heading text-2xl font-bold text-foreground">6. Emergency Service Disclaimer</h2>
            <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                We offer 24/7 emergency plumbing services. Please note that services rendered outside of standard business hours (late nights, weekends, and public holidays) may be subject to additional emergency dispatch fees. We will inform you of any such fees before dispatching a technician.
              </p>
            </div>
          </section>

          <section id="scheduling-cancellations" className="scroll-mt-24 space-y-4">
            <h2 className="font-heading text-2xl font-bold text-foreground">7. Appointment Scheduling & Cancellations</h2>
            <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                We make every effort to arrive within the scheduled time window. However, unforeseen emergencies or traffic conditions may cause delays. If you need to cancel or reschedule an appointment, we request at least 2 hours&apos; notice.
              </p>
            </div>
          </section>

          <section id="payments" className="scroll-mt-24 space-y-4">
            <h2 className="font-heading text-2xl font-bold text-foreground">8. Payments</h2>
            <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                Payment is due in full upon completion of the service unless otherwise agreed upon in writing. We accept cash, UPI (Google Pay, PhonePe, Paytm), and major credit/debit cards. Unpaid balances may be subject to late fees.
              </p>
            </div>
          </section>

          <section id="warranties" className="scroll-mt-24 space-y-4">
            <h2 className="font-heading text-2xl font-bold text-foreground">9. Warranties & Limitations</h2>
            <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                We stand behind the quality of our workmanship. We offer a limited warranty on our labor (duration varies by service type). However, this warranty does not cover:
              </p>
              <ul className="list-inside list-disc space-y-2 pl-4">
                <li>Materials, fixtures, or parts purchased independently by the customer.</li>
                <li>Damage caused by natural wear and tear, improper use, or lack of maintenance.</li>
                <li>Issues arising from pre-existing faulty plumbing systems.</li>
              </ul>
            </div>
          </section>

          <section id="third-party" className="scroll-mt-24 space-y-4">
            <h2 className="font-heading text-2xl font-bold text-foreground">10. Third-Party Links</h2>
            <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                Our website may contain links to third-party websites or services that are not owned or controlled by {SITE_CONFIG.name}. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party web sites or services.
              </p>
            </div>
          </section>

          <section id="intellectual-property" className="scroll-mt-24 space-y-4">
            <h2 className="font-heading text-2xl font-bold text-foreground">11. Intellectual Property</h2>
            <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                Unless otherwise stated, {SITE_CONFIG.name} owns the intellectual property rights for all material on this website. All intellectual property rights are reserved. You may access this from {SITE_CONFIG.name} for your own personal use subjected to restrictions set in these terms and conditions.
              </p>
            </div>
          </section>

          <section id="limitation-liability" className="scroll-mt-24 space-y-4">
            <h2 className="font-heading text-2xl font-bold text-foreground">12. Limitation of Liability</h2>
            <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                To the maximum extent permitted by applicable law, {SITE_CONFIG.name} shall not be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the services.
              </p>
            </div>
          </section>

          <section id="changes-to-terms" className="scroll-mt-24 space-y-4">
            <h2 className="font-heading text-2xl font-bold text-foreground">13. Changes to Terms</h2>
            <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
              </p>
            </div>
          </section>

          <section id="governing-law" className="scroll-mt-24 space-y-4">
            <h2 className="font-heading text-2xl font-bold text-foreground">14. Governing Law</h2>
            <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                These Terms shall be governed and construed in accordance with the laws of India, specifically within the jurisdiction of Telangana, without regard to its conflict of law provisions.
              </p>
            </div>
          </section>

          <section id="contact-us" className="scroll-mt-24 space-y-4">
            <h2 className="font-heading text-2xl font-bold text-foreground">15. Contact Information</h2>
            <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                If you have any questions about these Terms, please contact us:
              </p>
              <address className="rounded-xl border border-border bg-card p-6 font-medium not-italic">
                <p className="font-bold text-foreground">{SITE_CONFIG.name}</p>
                <p className="mt-2">218/2, near Ambedkar Circle,</p>
                <p>near Janapriya Apartments, Ambedkar Nagar,</p>
                <p>Hafeezpet, Miyapur, Hyderabad, Telangana 500049</p>
                <p className="mt-4">
                  <strong>Phone:</strong> <a href={`tel:${SITE_CONFIG.phone}`} className="text-brand-600 hover:underline">{SITE_CONFIG.phone}</a>
                </p>
                <p className="mt-1">
                  <strong>Email:</strong> <a href={`mailto:${SITE_CONFIG.email}`} className="text-brand-600 hover:underline">{SITE_CONFIG.email}</a>
                </p>
              </address>
              <p className="pt-4">
                For immediate assistance or to book a service, please visit our <Link href="/contact" className="font-medium text-brand-600 hover:underline">Contact Page</Link>.
              </p>
            </div>
          </section>

        </MotionDiv>
      </Section>
    </>
  );
}
