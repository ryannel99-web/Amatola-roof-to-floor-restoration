import { defineMiddleware } from 'astro:middleware';
import { verifySession } from './lib/auth';

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const cookie = context.cookies.get('admin_session');
    const valid = cookie ? await verifySession(cookie.value) : false;

    if (!valid) {
      return context.redirect('/admin/login');
    }
  }

  return next();
});
