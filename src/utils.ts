export function setsEqual(a: Set<unknown>, b: Set<unknown>) {
  return a.size === b.size && ([...a].every(x => b.has(x)))
}
