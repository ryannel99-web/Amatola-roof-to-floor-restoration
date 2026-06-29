import { c as createSession } from './auth_2nt-sm7F.mjs';

const prerender = false;
const POST = async ({ request, cookies }) => {
  let body = {};
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid request body" }, 400);
  }
  const token = await createSession(body.password ?? "");
  if (!token) {
    return json({ error: "Incorrect password" }, 401);
  }
  cookies.set("admin_session", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/"
  });
  return json({ ok: true }, 200);
};
const DELETE = async ({ cookies }) => {
  cookies.delete("admin_session", { path: "/" });
  return json({ ok: true }, 200);
};
function json(data, status) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" }
  });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
