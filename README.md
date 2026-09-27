# [BUSINESS NAME] website (MVP)

A [Next.js](https://nextjs.org) (App Router, TypeScript, Tailwind CSS) site, exported as static HTML and hosted on Firebase Hosting.

## Folder layout

| Path | What it is |
|---|---|
| `app/` | Pages and layout. Each route is a folder with a `page.tsx` (e.g. `app/packages/page.tsx` → `/packages`). |
| `app/globals.css` | Global styles and Tailwind setup. |
| `app/icon.svg` | Favicon. |
| `public/` | Files served as-is at the site root: `robots.txt`, `sitemap.xml`, images. |
| `legacy/` | The original plain-HTML site (pages, `assets/css/styles.css`, `assets/js/main.js`). Kept only as the source to port into `app/`. Not built or deployed. Delete it once every page is ported. |
| `next.config.ts` | Next.js config (`output: "export"` builds static files into `out/`). |
| `firebase.json` / `.firebaserc` | Firebase Hosting config. Serves `out/`. |

### Porting the legacy pages

| Legacy file | Next.js route |
|---|---|
| `legacy/index.html` | `app/page.tsx` |
| `legacy/packages.html` | `app/packages/page.tsx` |
| `legacy/care-plans.html` | `app/care-plans/page.tsx` |
| `legacy/work.html` | `app/work/page.tsx` |
| `legacy/about.html` | `app/about/page.tsx` |
| `legacy/contact.html` | `app/contact/page.tsx` |
| `legacy/thank-you.html` | `app/thank-you/page.tsx` |
| `legacy/privacy.html` | `app/privacy/page.tsx` |
| `legacy/404.html` | `app/not-found.tsx` |
| `legacy/services.html` | Not needed: `firebase.json` already redirects `/services` → `/packages`. |

The shared header/footer from each legacy page belongs in `app/layout.tsx` (write it once instead of copying it into every page). The mobile menu and contact form logic in `legacy/assets/js/main.js` become client components.

## Filling in placeholders

See **[PLACEHOLDERS.md](PLACEHOLDERS.md)**. Everything you still need to fill in is in `[SQUARE BRACKETS]`.

## Contact form → n8n

The form sends a JSON `POST` to `FORM_ENDPOINT` (currently in `legacy/assets/js/main.js`; move it into the contact form component when you port it):

```json
{
  "name": "...", "business": "...", "email": "...", "phone": "...",
  "website": "...", "interest": "launch|growth|custom|care-plan|automation|pilot|not-sure",
  "source": "referral|networking|search|linkedin|social|other",
  "message": "...",
  "client_id": "self", "page": "/contact.html", "referrer": "...", "submitted_at": "ISO date"
}
```

In n8n: create a **Webhook** node (POST, respond immediately with 200), then add your Twilio text, email, and Google Sheet steps. Paste the webhook's **Production URL** into `FORM_ENDPOINT`.

Also in n8n, allow CORS on the webhook for your domain (Webhook node → Options → *Allowed Origins*). Otherwise the browser blocks the request.

Spam protection: a hidden honeypot field plus a 3-second minimum fill time. Add Cloudflare Turnstile later if spam gets through.

## Develop locally

```bash
npm install     # first time only
npm run dev     # http://localhost:3000, auto-reloads on save
npm run lint
```

## Deploy to Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
# put your project ID in .firebaserc (replace [FIREBASE-PROJECT-ID])
npm run build                             # writes the static site to out/
firebase hosting:channel:deploy preview   # private preview link
firebase deploy --only hosting            # go live
```

`firebase.json` serves the `out/` folder, turns on clean URLs (`/packages` instead of `/packages.html`), and redirects the old `/services` link to `/packages`. Always run `npm run build` before deploying, or Firebase uploads a stale (or missing) `out/`.

## Before launch
- [ ] All placeholders replaced (search for `\[[A-Z]` with regex on)
- [ ] Form connected and tested end to end (text + email + sheet)
- [ ] Headshot and real project screenshots added
- [ ] Custom domain connected in the Firebase console
- [ ] Analytics added
- [ ] Lighthouse 90+ on mobile
