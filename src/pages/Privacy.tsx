import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { LINKS, SUPPORT_EMAIL } from "@/lib/site";

const LAST_UPDATED = "October 17, 2026";

const AT_A_GLANCE = [
  "DataCia is free, with no account or licence",
  "Your credentials, queries and data never reach us",
  "AI is optional and talks only to the provider you choose",
  "Anonymous error reports, which you can turn off",
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
            <li>
              The error message, stack trace and related log lines. An error message can include a database or host
              name.
            </li>
            <li>Operating system, OS version and CPU architecture</li>
            <li>App version</li>
            <li>
              A <strong>hardware ID</strong>: a one-way SHA-256 hash of your device identifier. It can't be reversed
              and isn't linked to any personal information; it only lets us group errors from the same machine.
            </li>
          </ul>
          <p>
            If an AI request fails, we log the provider, the model name and the type of error (for example a timeout).
            We never log the prompt, the reply or your API key.
          </p>
          <p>
            Reports never include queries, results or passwords. We don't collect your name, email address, location or
            usage analytics, and we don't use advertising or analytics trackers.
          </p>
          <p>
            To stop sending reports, turn off <strong>Send anonymous error reports</strong> in Settings → Privacy.
          </p>
        </Section>

        <Section id="not-collected" title="What we never collect">
          <ul>
            <li>
              <strong>Database credentials</strong>, which are stored only on your device, encrypted with a key bound to that
              machine
            </li>
            <li>
              <strong>Queries, results or any data</strong> from your databases
            </li>
            <li>
              <strong>AI API keys, prompts or responses</strong>
            </li>
            <li>
              <strong>Accounts or contact details</strong>, since the app has no sign-in
            </li>
          </ul>
        </Section>

        <Section id="connections" title="How connections work">
          <p>
            Database connections, including SSH tunnels, go directly from your device to your database. DataCia doesn't
            route, proxy or inspect that traffic.
          </p>
        </Section>

        <Section id="ai" title="AI assistant">
          <p>
            The AI assistant is optional and stays off until you connect a provider. When you use it, information is
            sent directly from your device to the provider you choose: Anthropic, OpenAI, Google Gemini, OpenRouter,
            OpenCode, or a model server you run yourself. DataCia doesn't operate an AI service and never receives your
            prompts, responses or API keys. API keys are stored encrypted on your device.
          </p>
          <p>
            To answer a request, the assistant may share the following with your provider: your messages and the recent
            conversation, the SQL in your editor and its last error, table names and structures, and the results of
            read-only queries it runs on the open connection, which can include records from your database.
          </p>
          <p>
            Your provider processes this information under its own terms and privacy policy, which govern whether it is
            retained or used for training:{" "}
            <ExternalLink href="https://www.anthropic.com/legal/privacy">Anthropic</ExternalLink>,{" "}
            <ExternalLink href="https://openai.com/policies/privacy-policy/">OpenAI</ExternalLink>,{" "}
            <ExternalLink href="https://policies.google.com/privacy">Google</ExternalLink>,{" "}
            <ExternalLink href="https://openrouter.ai/privacy">OpenRouter</ExternalLink> and{" "}
            <ExternalLink href="https://opencode.ai">OpenCode</ExternalLink>. With a local model, the information stays
            on your machine.
          </p>
          <p>
            If a database holds personal or sensitive data, make sure your chosen provider is appropriate for it before
            using the assistant with that connection.
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
            Connections, saved queries, history, settings, AI API keys and your AI chat are stored locally on your
            device. Uninstalling DataCia and removing its app-data folder deletes them. Anything already sent to an AI
            provider is kept or deleted under that provider's policy.
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
