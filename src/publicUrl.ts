// Generate a public URL based on where the application lives.
export function publicUrl(path: string): string {
  return `${import.meta.env.BASE_URL}${path}`;
}