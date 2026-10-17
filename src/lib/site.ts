/** Site-wide constants. Every external link lives here so copy changes stay in one place. */

export const REPO = "rwitesh/datacia";
export const REPO_URL = `https://github.com/${REPO}`;

export const LINKS = {
  repo: REPO_URL,
  releases: `${REPO_URL}/releases`,
  latestRelease: `${REPO_URL}/releases/latest`,
  newIssue: `${REPO_URL}/issues/new`,
  development: `${REPO_URL}/blob/main/DEVELOPMENT.md`,
} as const;

export const SUPPORT_EMAIL = "rwiteshbera@gmail.com";
