export default async (ms: number) =>
  // @ts-expect-error
  new Promise(resolve => setTimeout(resolve, ms));
