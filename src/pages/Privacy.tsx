import { NavBar } from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <NavBar />
      <main className="flex-1 container mx-auto px-6 py-16 max-w-3xl mt-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">DataCia Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-12">Last updated: March 2026</p>

        <div className="space-y-8 text-base leading-relaxed text-muted-foreground">
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Overview</h2>
            <p>
              DataCia is a desktop database client. We built it to be private by design, your database credentials never leave your device, and your data never passes through our servers. This policy explains the limited information we do collect, why we collect it, and what we do with it.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">What We Collect</h2>

            <div className="mt-4 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">1. Diagnostic & Error Data</h3>
                <p className="mb-2">To improve stability and fix device-specific bugs, we collect:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Error logs and crash reports</li>
                  <li>Operating system and architecture</li>
                  <li>App version</li>
                  <li>A hardware ID, a one-way hash generated from your device. This is not linked to any personal information and cannot be used to identify you. It only helps us correlate errors from the same device across sessions.</li>
                </ul>
                <p className="mt-3 font-medium">
                  We do not collect your name, location, browsing history, or any information that can identify you as a person. We also do not use third-party analytics trackers (like Google Analytics).
                </p>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">2. Subscription & Account</h3>
                <p className="mb-2">If you purchase a subscription or activate a license, we collect your email address. We use this to:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Identify your account</li>
                  <li>Deliver your license key</li>
                  <li>Reach out if there's a problem with your subscription</li>
                </ul>
                <p className="mt-3 font-medium">
                  We do not sell or share your email with third parties.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">What We Do Not Collect</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Database credentials</strong> — stored locally on your device, encrypted, never sent to our servers</li>
              <li><strong>Query contents or results</strong></li>
              <li><strong>Any data from your databases</strong></li>
              <li><strong>Personal identifiers</strong> beyond email (for subscribers)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">How Connections Work</h2>
            <p className="mb-3">
              All database connections are made directly from your device to your database. DataCia does not route, proxy, or inspect your database traffic. Your queries go straight from your machine to your database, we are not in that path.
            </p>
            <p>
              Similarly, any AI-powered features make calls directly from your device to the respective LLM provider. We do not see, log, or store the content of those calls.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Data Storage & Deletion</h2>
            <p className="mb-3">
              Database credentials and connection details are stored locally on your device in encrypted form. Nothing is uploaded to the cloud.
            </p>
            <p>
              If you have purchased a subscription and would like your email address and account records to be permanently deleted, please contact us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Payments</h2>
            <p>
              Payments are processed by LemonSqueezy, powered by Stripe. When you add a payment method or complete a purchase, you are subject to LemonSqueezy's and Stripe's terms of service and privacy policies. DataCia does not store or have access to your payment card information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Changes to This Policy</h2>
            <p>
              If we make significant changes, we'll notify subscribers via email. The latest version will always be available at datacia.app/privacy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Contact</h2>
            <p>
              Questions? Reach out at <a href="mailto:rwiteshbera@gmail.com" className="text-primary hover:underline">rwiteshbera@gmail.com</a>.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
