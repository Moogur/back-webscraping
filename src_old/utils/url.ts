export function getNormalUrl(url?: string, prefix?: string): string {
  if (!url) return '';
  return `${prefix ?? ''}${url}`;
}
