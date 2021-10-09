export function sleep(ms: number): void {
  const date = Date.now();
  let curDate = null;
  /* eslint-disable no-loops/no-loops*/
  do {
    curDate = Date.now();
  } while (curDate - date < ms);
}
