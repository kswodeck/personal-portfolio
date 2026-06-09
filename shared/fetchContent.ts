import type { Content } from './types';

// Resolves content.json relative to the page's base so it works regardless
// of which subdirectory path the app is deployed to (/react/, /vue/, etc.).
export async function fetchContent(): Promise<Content> {
  const url = new URL('content.json', document.baseURI);
  const res = await fetch(url.href);
  if (!res.ok) throw new Error(`Failed to load content.json: ${res.status}`);
  return res.json() as Promise<Content>;
}
