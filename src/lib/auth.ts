const SESSION_SECRET = import.meta.env.SESSION_SECRET ?? 'dev-secret-change-in-production';
const SESSION_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

async function getKey(): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(SESSION_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

export async function createSession(password: string): Promise<string | null> {
  if (!import.meta.env.ADMIN_PASSWORD) return null;
  if (password !== import.meta.env.ADMIN_PASSWORD) return null;

  const timestamp = Date.now().toString();
  const key = await getKey();
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(timestamp));
  const sigHex = Array.from(new Uint8Array(sig))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');

  return `${timestamp}.${sigHex}`;
}

export async function verifySession(token: string): Promise<boolean> {
  try {
    const dotIndex = token.indexOf('.');
    if (dotIndex === -1) return false;
    const timestamp = token.slice(0, dotIndex);
    const sigHex = token.slice(dotIndex + 1);

    const age = Date.now() - parseInt(timestamp, 10);
    if (isNaN(age) || age < 0 || age > SESSION_MAX_AGE_MS) return false;

    const sigBytes = new Uint8Array(
      (sigHex.match(/../g) ?? []).map(h => parseInt(h, 16))
    );
    const key = await getKey();
    return crypto.subtle.verify('HMAC', key, sigBytes, new TextEncoder().encode(timestamp));
  } catch {
    return false;
  }
}
