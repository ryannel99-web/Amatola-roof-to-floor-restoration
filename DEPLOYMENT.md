# Deployment guide

This is **not** a static HTML site — it's an Astro app with a small Node.js
backend (admin login, photo uploads, a projects API). It needs to run as a
Node.js process; it can't simply be uploaded as `.htm`/image files to a
classic shared-hosting/cPanel account.

## Requirements

- Node.js **22.12+** on the server
- Ability to run a long-lived Node process (directly, via PM2/systemd, or
  via your host's "Node.js app" feature — e.g. cPanel's Setup Node.js App,
  Plesk, a VPS, etc.)
- A reverse proxy (nginx/Apache) in front of it for TLS — recommended but
  not required if your host already terminates SSL for you

## One-time setup on the server

```bash
git clone <this-repo> amatola-web
cd amatola-web
npm ci
cp .env.example .env
```

Edit `.env` and set:

- `ADMIN_PASSWORD` — the password used to log in at `/admin/login`
- `SESSION_SECRET` — a random secret, generate with:
  `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

Data storage is local disk by default (no external service needed):

- Project records → `./data/`
- Uploaded photos → `./uploads/`

Both folders are created automatically. Just make sure they persist across
deploys/restarts (don't wipe the app directory on redeploy — pull/rebuild in
place, or keep those two folders on a persistent volume/mount if using
containers).

## Build and run

```bash
npm run build
node ./dist/server/entry.mjs
```

By default the server listens on port `4321`. Override with env vars if
needed:

```bash
HOST=0.0.0.0 PORT=4321 node ./dist/server/entry.mjs
```

Keep it running with a process manager, e.g. PM2:

```bash
npm install -g pm2
pm2 start dist/server/entry.mjs --name amatola-web
pm2 save
```

## Reverse proxy (nginx example)

Point your registered domain at the server, then proxy to the Node process:

```nginx
server {
    listen 80;
    server_name yourdomain.co.uk www.yourdomain.co.uk;

    location / {
        proxy_pass http://127.0.0.1:4321;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Add HTTPS via Let's Encrypt/certbot (or your host's SSL tooling) on top of
this.

## First-time content

Once it's running, log in at `/admin/login` with `ADMIN_PASSWORD`. The
gallery starts empty — either add projects manually via `/admin`, or call
`POST /api/seed` (while logged in) once to load the 6 starter example
projects.

## Updating the site later

```bash
git pull
npm ci
npm run build
pm2 restart amatola-web   # or however the process is managed
```

`data/` and `uploads/` are untouched by this — they only change through the
admin panel.
