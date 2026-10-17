import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { LINKS, SUPPORT_EMAIL } from "@/lib/site";

const LAST_UPDATED = "October 17, 2026";

const AT_A_GLANCE = [
  "No account, licence or payment — DataCia is free",
  "Your credentials, queries and data never leave your device",
  "Anonymous crash reports only, tied to a one-way device hash",
  "Open source, so every claim here can be checked in the code",
];

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <Reveal>
      <section id={id} aria-labelledby={`${id}-title`} className="border-t border-line py-10">
        <h2 id={`${id}-title`} className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          {title}
        </h2>
        <div className="mt-4 space-y-4 text-[16px] leading-relaxed text-muted-foreground [&_li]:pl-1 [&_strong]:font-medium [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
          {children}
        </div>
      </section>
    </Reveal>
  );
}

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
      {children}
    </a>
  );
}

export default function PrivacyPage() {
  return (
    <Container width="narrow" className="py-20 sm:py-28">
      <Reveal immediate>
        <p className="text-sm font-semibold text-accent">Privacy Policy</p>
        <h1 className="text-display mt-3 text-5xl sm:text-6xl">Private by design.</h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          DataCia is a free, open-source desktop database client. This policy explains the small amount of information
          the app and this website handle, and why.
        </p>
        <p className="mt-4 text-sm text-subtle-foreground">Last updated {LAST_UPDATED}</p>
      </Reveal>

      <Reveal immediate delay={0.1}>
        <ul className="surface mt-12 grid gap-4 p-6 sm:grid-cols-2 sm:p-8">
          {AT_A_GLANCE.map((point) => (
            <li key={point} className="flex gap-3 text-[15px] leading-snug">
              <Check className="mt-0.5 size-4 shrink-0 text-success" />
              {point}
            </li>
          ))}
        </ul>
      </Reveal>

      <div className="mt-12">
        <Section id="diagnostics" title="Diagnostic and error data">
          <p>
            To find and fix crashes, the app sends error logs and crash reports to{" "}
            <ExternalLink href="https://sentry.io/privacy/">Sentry</ExternalLink>, our error-monitoring provider. Each
            report includes:
          </p>
          <ul>
            <li>The error message, stack trace and related log lines</li>
            <li>Operating system, OS version and CPU architecture</li>
            <li>App version</li>
            <li>
              A <strong>hardware ID</strong> — a one-way SHA-256 hash of your device identifier. It can't be reversed
              and isn't linked to any personal information; it only lets us group errors from the same machine.
            </li>
          </ul>
          <p>
            We don't collect your name, email address, location or usage analytics, and we don't use advertising or
            analytics trackers.
          </p>
        </Section>

        <Section id="not-collected" title="What we never collect">
          <ul>
            <li>
              <strong>Database credentials</strong> — stored only on your device, encrypted with a key bound to that
              machine
            </li>
            <li>
              <strong>Queries, results or any data</strong> from your databases
            </li>
            <li>
              <strong>AI prompts and responses</strong>
            </li>
            <li>
              <strong>Accounts or contact details</strong> — the app has no sign-in
            </li>
          </ul>
        </Section>

        <Section id="connections" title="How connections work">
          <p>
            Database connections, including SSH tunnels, go directly from your device to your database. DataCia doesn't
            route, proxy or inspect that traffic.
          </p>
          <p>
            The AI assistant is optional. If you add your own Google Gemini API key, requests go straight from your
            device to Google and are covered by{" "}
            <ExternalLink href="https://policies.google.com/privacy">Google's privacy policy</ExternalLink>. We never
            see your key or the content of those requests.
          </p>
        </Section>

        <Section id="updates" title="Downloads and updates">
          <p>
            DataCia is distributed through{" "}
            <ExternalLink href={LINKS.releases}>GitHub Releases</ExternalLink>. The app checks GitHub for new versions
            and downloads updates from there, and the download page on this website reads release details from GitHub's
            public API in your browser. In both cases GitHub receives a standard web request, including your IP
            address, under the{" "}
            <ExternalLink href="https://docs.github.com/site-policy/privacy-policies/github-general-privacy-statement">
              GitHub Privacy Statement
            </ExternalLink>
            .
          </p>
        </Section>

        <Section id="website" title="This website">
          <p>
            datacia.app sets no cookies and runs no analytics. Like any website, our hosting provider may process
            standard request logs, such as IP addresses, to serve and protect the site.
          </p>
        </Section>

        <Section id="storage" title="Storage and deletion">
          <p>
            Connections, saved queries, history and settings are stored locally on your device. Uninstalling DataCia
            and removing its app-data folder deletes them.
          </p>
          <p>
            Earlier versions of DataCia offered paid licences, processed by LemonSqueezy. If you bought one and would
            like your email address and licence records deleted, email us and we'll take care of it.
          </p>
        </Section>

        <Section id="open-source" title="Open source">
          <p>
            The full source code of the app is public at <ExternalLink href={LINKS.repo}>github.com/rwitesh/datacia</ExternalLink>
            , so you can verify exactly what it sends and build it yourself.
          </p>
        </Section>

        <Section id="changes" title="Changes to this policy">
          <p>
            If this policy changes, we'll update this page and the date at the top. Significant changes will also be
            noted in the release notes of the version that introduces them.
          </p>
        </Section>

        <Section id="contact" title="Contact">
          <p>
            Questions or requests? Email{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`} className="text-accent hover:underline">
              {SUPPORT_EMAIL}
            </a>
            .
          </p>
        </Section>
      </div>
    </Container>
  );
}
