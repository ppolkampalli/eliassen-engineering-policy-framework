/** Scans for the first `# ` heading and returns its text, else `fallback`. */
export function extractMarkdownTitle(text: string, fallback: string): string {
  for (const line of text.split('\n')) {
    const match = /^#\s+(.*)$/.exec(line.trim());
    if (match) return (match[1] as string).trim();
  }
  return fallback;
}

export function titleFallback(filename: string): string {
  return filename.replace(/\.md$/, '');
}
