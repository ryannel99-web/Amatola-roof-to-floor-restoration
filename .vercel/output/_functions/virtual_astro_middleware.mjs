import { d as defineMiddleware, s as sequence } from './chunks/sequence_D_AgsSjh.mjs';
import 'piccolore';
import 'clsx';
import { v as verifySession } from './chunks/auth_2nt-sm7F.mjs';

const onRequest$1 = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const cookie = context.cookies.get("admin_session");
    const valid = cookie ? await verifySession(cookie.value) : false;
    if (!valid) {
      return context.redirect("/admin/login");
    }
  }
  return next();
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
