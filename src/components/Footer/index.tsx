import { Link } from "react-router-dom";

const footerLinks = {
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
  ],
};

const Footer = () => {
  return (
    <footer className="bg-background">
      <div className="container mx-auto px-12 py-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <Link to="/" className="font-mono text-xl font-bold tracking-tight text-foreground">
              Data<span className="text-primary">Cia</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Local-first database client for developers who value speed, privacy, and control.
            </p>
            <a
              href="https://datacia.app"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-xs text-primary hover:underline font-mono"
            >
              datacia.app
            </a>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="mb-4 text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-2 pt-2 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} DataCIa. Built with care by a solo developer.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
