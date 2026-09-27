# Placeholders to fill in

Everything you still need to fill in is in **[SQUARE BRACKETS]**. Use VS Code's **Find in Files** (`Ctrl+Shift+F`) and replace each one across the whole folder.

To find anything left, search for `\[[A-Z]` with regex turned on (the `.*` button).

> The page files named below (`index.html`, `assets/...`) now live in `legacy/` while they are ported to Next.js. See the porting table in [README.md](README.md). Site-wide files moved: `robots.txt` and `sitemap.xml` are in `public/`, and the favicon is `app/icon.svg`.

## Site-wide (header, footer, every page)

| Placeholder | What to put | Example |
|---|---|---|
| `[BUSINESS NAME]` | Brand name shown on the site | Acme Web Co. |
| `[LEGAL BUSINESS NAME]` | Name on your LLC filing (footer copyright, privacy policy) | Acme Web Co |
| `[B]` | 1–2 letters for the logo square (or swap in a logo image) | AW |
| `[EMAIL]` | Business email (also update `FALLBACK_EMAIL` in `assets/js/main.js`) | hello@yourdomain.com |
| `[PHONE]` | Phone as displayed | (813) 555-0100 |
| `[PHONE-DIGITS]` | Same phone for tap-to-call links | +18135550100 |
| `[CITY]` | Your city | Tampa |
| `[CITY / SERVICE AREA]` / `[SERVICE AREA]` | Area you serve | Tampa Bay |
| `[LINKEDIN URL]` | Your LinkedIn profile | https://linkedin.com/in/... |
| `[DOMAIN]` | Your domain (sitemap, robots.txt, og:image comment) | yourdomain.com |
| `[BOOKING LINK, ...]` | Calendly / Google Calendar booking page | https://calendly.com/... |

## Home page (`index.html`)
- `[NICHE, e.g. ...]`: the trade you pick first (plan Phase 1, Step 1).
- **Pilot banner**: the dark strip at the top of every page. To remove it, delete the `PILOT OFFER BANNER` block from each page.

## Packages (`packages.html`)
- Build prices: `$[1,500]` (Launch), `$[3,000]` (Growth). These are the only places they appear.

## Care plans (`care-plans.html`)
- Plan prices: `$[79]`, `$[149]`, `$[299]`. These are the only places they appear.
- Plan names: `[Essential]`, `[Standard]`, `[Growth]`. Each name appears on its card, in the comparison table and in the call to action. Rename them all if you match your existing Care Plan names.
- `[Minimum term: 6 / 12]` and `[6 / 12]` (FAQ), `[Confirm policy.]` (switching plans).
- `[RATE]`: hourly rate for extra work.
- Add-on pricing note.

## Our work (`work.html`)
- **Projects**: screenshot, client name, trade, city, package, one-line result, live link. Copy a `<!-- PROJECT -->` block to add more. Until you have client work, keep "This website" and remove the others.
- **Testimonials**: quote, name, title, business. Remove the section until you have one.

## About (`about.html`)
- Headshot: save as `assets/img/headshot.jpg` (about 640×800) and swap the placeholder div for the `<img>` tag in the comment right above it.
- Story paragraphs, the facts list (`[U.S. Navy]`, `[NICHE ...]`), and the three skill/community cards.

## Contact (`contact.html`)
- Hours, booking link, email, phone.
- **Connect the form**: open `assets/js/main.js` and set `FORM_ENDPOINT` to your n8n webhook's Production URL. Until you do, the form shows a "not connected yet" notice instead of sending.

## Privacy (`privacy.html`)
- `[DATE]`, `[ANALYTICS TOOL]`, retention period. Have it reviewed along with your contracts.

## Branding
- Colors: change `--brand`, `--brand-dark` and `--brand-soft` at the top of `assets/css/styles.css`.
- Favicon: `assets/img/favicon.svg` (the letter and color).
