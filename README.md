# datacia.app

The website for [DataCia](https://github.com/rwitesh/datacia), an AI-assisted, local-first database
client. Free and open source.

Built with [Bun](https://bun.com), React 19, Tailwind CSS v4 and [Motion](https://motion.dev).

## Develop

```bash
bun install
bun dev          # http://localhost:3000 with hot reload
bun run typecheck
bun run build    # static output in dist/
```

## How downloads work

Installers are published as GitHub Releases on `rwitesh/datacia`. The site reads the latest release
from the public GitHub API in the browser (`src/lib/releases.ts`) and links straight to the
installer asset for each platform:

- macOS: `DataCia-<version>-darwin-universal.dmg`
- Windows: `DataCia-<version>-windows-universal-installer.exe`

If the API can't be reached, every download button falls back to the latest release page. If the
asset names produced by the release workflow change, update `INSTALLER_PATTERNS`.

## Structure

```
src/
  pages/              Route components (Home, Download, Privacy, NotFound)
  components/
    layout/           Header, announcement bar, footer, page shell
    home/             Home page sections
    download/         Platform-aware download button
    motion/           Reusable animation primitives (Reveal, SplitWords, SpotlightCard)
    ui/               Buttons, containers, headings
  hooks/              useLatestRelease, usePlatform
  lib/                Site constants, release fetching, platform detection
styles/globals.css    Design tokens (dark default, `.theme-light` sections)
```

## Deploy

`bun run build`, then publish `dist/` (configured for Cloudflare static assets in `wrangler.jsonc`).
