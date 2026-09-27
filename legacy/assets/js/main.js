/* ==========================================================================
   [BUSINESS NAME] — site script (MVP)
   ========================================================================== */

/* ---------------------------------------------------------------------------
   CONTACT FORM SETTINGS — fill these in when your n8n workflow is ready.
   FORM_ENDPOINT: your n8n webhook "Production URL"
                  e.g. "https://n8n.yourdomain.com/webhook/website-lead"
   CLIENT_ID:     identifies which site the lead came from (your own site = "self")
   While FORM_ENDPOINT is empty, the form shows a notice instead of sending.
--------------------------------------------------------------------------- */
const FORM_ENDPOINT = "";
const CLIENT_ID = "self";
const FALLBACK_EMAIL = "[EMAIL]"; // shown if the form can't send

/* Mobile nav toggle */
(function () {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.getElementById("nav-links");
  if (!toggle || !links) return;
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.textContent = open ? "Close" : "Menu";
  });
})();

/* Footer year */
document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = new Date().getFullYear();
});

/* Pre-select a package when arriving from a "Get started" button (?package=launch) */
(function () {
  const select = document.getElementById("interest");
  if (!select) return;
  const pkg = new URLSearchParams(location.search).get("package");
  if (!pkg) return;
  const match = Array.from(select.options).find((o) => o.value === pkg);
  if (match) select.value = pkg;
})();

/* Contact form: POST JSON to the n8n webhook, then go to the thank-you page */
(function () {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const status = document.getElementById("form-status");
  const button = form.querySelector('button[type="submit"]');
  const startedAt = Date.now();

  function show(msg, kind) {
    status.textContent = msg;
    status.className = "form-status " + kind;
    status.hidden = false;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.hidden = true;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries());

    // Spam checks: honeypot filled, or submitted faster than a human could.
    if (data.company_website || Date.now() - startedAt < 3000) {
      location.href = "thank-you.html";
      return;
    }
    delete data.company_website;

    if (!FORM_ENDPOINT) {
      show(
        "The form isn't connected yet (set FORM_ENDPOINT in assets/js/main.js). " +
          "For now, please email " + FALLBACK_EMAIL + ".",
        "info"
      );
      return;
    }

    const payload = {
      ...data,
      client_id: CLIENT_ID,
      page: location.pathname,
      referrer: document.referrer || null,
      submitted_at: new Date().toISOString(),
    };

    button.disabled = true;
    const label = button.textContent;
    button.textContent = "Sending…";

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("HTTP " + res.status);
      location.href = "thank-you.html";
    } catch (err) {
      show(
        "Sorry, something went wrong sending your message. Please try again, or email " +
          FALLBACK_EMAIL + ".",
        "error"
      );
      button.disabled = false;
      button.textContent = label;
    }
  });
})();
