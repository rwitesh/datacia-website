import { Link } from "react-router-dom";
import logo from "@/assets/logo.webp";
import { GitHubIcon } from "@/components/icons/brand";
import { Container } from "@/components/ui/container";
import { LINKS, SUPPORT_EMAIL } from "@/lib/site";

type FooterLink = { label: string; href: string; external?: boolean };

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Download", href: "/download" },
      { label: "Release notes", href: LINKS.releases, external: true },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Source code", href: LINKS.repo, external: true },
      { label: "Report an issue", href: LINKS.newIssue, external: true },
      { label: "Contribute", href: LINKS.development, external: true },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Contact", href: `mailto:${SUPPORT_EMAIL}`, external: true },
    ],
  },
];

const linkClass = "text-[13px] text-muted-foreground transition-colors hover:text-foreground";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <Container width="wide" className="py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Link to="/" className="flex items-center gap-2.5 text-[17px] font-semibold tracking-tight">
              <img src={logo} alt="" className="size-7" width={28} height={28} />
              DataCia
            </Link>
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-muted-foreground">
              A fast, free and open-source SQL client for PostgreSQL, MySQL, SQLite and ClickHouse.
            </p>
          </div>

          {COLUMNS.map((column) => (
            <div key={column.title}>
              <h3 className="mb-4 text-xs font-semibold text-foreground">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                        {link.label}
                      </a>
                    ) : (
                      <Link to={link.href} className={linkClass}>
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col-reverse items-start justify-between gap-4 border-t border-line pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-subtle-foreground">
            © {new Date().getFullYear()} DataCia. Free and open source, built in the open.
          </p>
          <a href={LINKS.repo} target="_blank" rel="noopener noreferrer" className={`${linkClass} inline-flex items-center gap-2`}>
            <GitHubIcon className="size-4" />
            rwitesh/datacia
          </a>
        </div>
      </Container>
    </footer>
  );
}
