export function timeout(time: number = 700) {
  return new Promise(resolve => setTimeout(resolve, time));
}
