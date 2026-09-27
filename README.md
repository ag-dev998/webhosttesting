# [BUSINESS NAME] website (MVP)

A plain HTML/CSS static site. It has no build step and no dependencies. Open `index.html` in a browser to view it, or deploy the folder to Firebase Hosting as is.

## Pages

| File | Page |
|---|---|
| `index.html` | Home / landing page: the pitch. Holds no prices. |
| `packages.html` | Website build packages (Launch, Growth, Custom), what's included, build FAQ |
| `care-plans.html` | Monthly care plans, comparison table, add-ons, care plan FAQ |
| `work.html` | Portfolio projects and testimonials |
| `about.html` | About you |
| `contact.html` | Contact form + other contact options |
| `thank-you.html` | Shown after the form sends |
| `privacy.html` | Privacy policy (draft) |
| `404.html` | "Page not found" (Firebase serves it automatically) |
| `services.html` | Old page. Only forwards to `packages.html`, so you can delete it. |

Shared files:
- `assets/css/styles.css`: all styling. Brand colors are at the top.
- `assets/js/main.js`: mobile menu and the contact form. Form settings are at the top.

### Where to change things

- **Prices** live in exactly one place: build prices on `packages.html`, monthly prices on `care-plans.html`.
- Each main page is split into blocks marked `<!-- ===== SECTION: Name ===== -->`. Search for `SECTION:` to jump between them.
- On `work.html`, add a project by copying a `<!-- PROJECT -->` block.
- **Header and footer** are copied into every page. To change the nav or footer, use Find/Replace across the folder (`Ctrl+Shift+H` in VS Code).

## Filling in placeholders

See **[PLACEHOLDERS.md](PLACEHOLDERS.md)**. Everything you still need to fill in is in `[SQUARE BRACKETS]`.

## Contact form → n8n

The form sends a JSON `POST` to `FORM_ENDPOINT` in `assets/js/main.js`:

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

## Preview locally

Double-click `index.html`, or for clean URLs run a local server from this folder:

```bash
npx serve .          # or: python -m http.server 8080
```

## Deploy to Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
# put your project ID in .firebaserc (replace [FIREBASE-PROJECT-ID])
firebase hosting:channel:deploy preview   # private preview link
firebase deploy --only hosting            # go live
```

`firebase.json` turns on clean URLs (`/packages` instead of `/packages.html`), redirects the old `/services` link to `/packages`, and keeps README/PLACEHOLDERS out of the deploy.

## Before launch
- [ ] All placeholders replaced (search for `\[[A-Z]` with regex on)
- [ ] Form connected and tested end to end (text + email + sheet)
- [ ] Headshot and real project screenshots added
- [ ] Custom domain connected in the Firebase console
- [ ] Analytics added
- [ ] Lighthouse 90+ on mobile
