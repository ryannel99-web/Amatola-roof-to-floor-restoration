const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": undefined, "SSR": true};
const SESSION_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1e3;
function requireEnv(name) {
  const value = Object.assign(__vite_import_meta_env__, { ADMIN_PASSWORD: "local-dev-change-me", SESSION_SECRET: "7f9d76fc0bfacad9a4a97b34dfa074259987347fd4aafd24cf6ae2c86f29d5fb", _: "/Users/ryannel/Desktop/amatola-web/node_modules/.bin/astro" })[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}
async function getKey() {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(requireEnv("SESSION_SECRET")),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}
async function createSession(password) {
  const adminPassword = requireEnv("ADMIN_PASSWORD");
  if (password !== adminPassword) return null;
  const timestamp = Date.now().toString();
  const key = await getKey();
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(timestamp));
  const sigHex = Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, "0")).join("");
  return `${timestamp}.${sigHex}`;
}
async function verifySession(token) {
  try {
    const dotIndex = token.indexOf(".");
    if (dotIndex === -1) return false;
    const timestamp = token.slice(0, dotIndex);
    const sigHex = token.slice(dotIndex + 1);
    const age = Date.now() - parseInt(timestamp, 10);
    if (isNaN(age) || age < 0 || age > SESSION_MAX_AGE_MS) return false;
    const sigBytes = new Uint8Array(
      (sigHex.match(/../g) ?? []).map((h) => parseInt(h, 16))
    );
    const key = await getKey();
    return crypto.subtle.verify("HMAC", key, sigBytes, new TextEncoder().encode(timestamp));
  } catch {
    return false;
  }
}

export { createSession as c, verifySession as v };
