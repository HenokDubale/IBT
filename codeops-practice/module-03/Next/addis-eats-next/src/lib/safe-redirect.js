// Accept only a local path. Anything else falls back to /orders.
// export function getSafeNext(next) {
//   const fallback = "/orders";

//   if (typeof next !== "string") return fallback;
//   if (!next.startsWith("/")) return fallback; // not a local path
//   if (next.startsWith("//")) return fallback; // //evil.com is another site
//   if (/[\x00-\x1f\\]/.test(next)) return fallback; // backslashes, tabs, newlines

//   return next;
// }

export function getSafeNext(next, fallback = "/orders") {
  if (typeof next !== "string") return fallback;
  if (!next.startsWith("/")) return fallback; // not a local path
  if (next.startsWith("//")) return fallback; // //evil.com is another site
  if (/[\x00-\x1f\\]/.test(next)) return fallback; // backslashes, control chars
  if (next.startsWith("/signin") || next.startsWith("/register")) {
    return fallback; // would loop
  }

  return next;
}
