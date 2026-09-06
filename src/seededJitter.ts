// Organic visual scatter for the matches.

function seededFraction(n: number): number {
  const x = Math.sin(n) * 43758.5453;
  return x - Math.floor(x);
}

export function jitter(seed: number, range: number): number {
  return (seededFraction(seed) - 0.5) * 2 * range;
}

export function seedOf(text: string): number {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash * 31 + text.charCodeAt(i)) | 0;
  }
  return hash;
}