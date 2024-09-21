export function convertMbToGb(mb: number): string {
  const gb = mb / 1024;
  return `${gb.toFixed(2)} GB`;
}
