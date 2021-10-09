export function sleep(ms: number): void {
  const date = Date.now();
  let curDate = null;
  do {
    curDate = Date.now();
  } while (curDate - date < ms);
}
