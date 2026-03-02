// ===== CONFIG =====
// 1) Maak een Formspree form aan en plak hier je endpoint:
//    voorbeeld: https://formspree.io/f/abcdwxyz
const FORMSPREE_ENDPOINT = "https://formspree.io/f/PLAK_HIER_JE_ID";

// 2) Waar jij de mails wilt ontvangen stel je in bij Formspree (dashboard)
//    Dit is dus niet iets wat je veilig in JS kunt hardcoden.

document.addEventListener("DOMContentLoaded", () => {
  // Splash screen na 2.5s weg
  setTimeout(() => {
    const splash = document.getElementById("splashScreen");
    if (splash) splash.classList.add("hidden");
  }, 2500);

  // Forms
  wireForm({
    formId: "quoteForm",
    subject: "Offerte aanvraag via website",
    successMessage: "Bedankt! Je offerte-aanvraag is verzonden. Ik neem snel contact op."
  });

  wireForm({
    formId: "appointmentForm",
    subject: "Afspraak aanvraag via website",
    successMessage: "Top! Je afspraak-aanvraag is verzonden. Ik stuur je snel een bevestiging."
  });

  injectNotificationAnimations();
});

// ===== FORM WIRING (werkt met name="" velden) =====
function wireForm({ formId, subject, successMessage }) {
  const form = document.getElementById(formId);
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const payload = collectFormData(form);
    payload._subject = subject; // Formspree gebruikt dit als onderwerp

    // Basis-validatie (email)
    if (payload.email && !isValidEmail(String(payload.email))) {
      showNotification("Vul een geldig e-mailadres in.", true);
      return;
    }

    // Verstuur via Formspree
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Form submit failed");

      showNotification(successMessage, false);
      form.reset();
    } catch (err) {
      console.error(err);
      showNotification("Oeps—versturen ging mis. Probeer het opnieuw of mail me direct.", true);
    }
  });
}

// Verzamelt automatisch alle input/select/textarea met een name=""
function collectFormData(form) {
  const data = {};
  const fields = form.querySelectorAll("input[name], select[name], textarea[name]");

  fields.forEach((el) => {
    const name = el.getAttribute("name");
    if (!name) return;

    if (el.type === "checkbox") {
      data[name] = el.checked;
      return;
    }

    if (el.type === "radio") {
      if (el.checked) data[name] = el.value;
      return;
    }

    data[name] = el.value;
  });

  // Handig: voeg context toe
  data.page = window.location.href;
  data.timestamp = new Date().toISOString();

  return data;
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, isError = false) {
  const notification = document.createElement("div");
  notification.className = `notification ${isError ? "error" : "success"}`;
  notification.textContent = message;

  // Kleur uit je CSS variables
  const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent-color").trim() || "#1e88e5";
  const accentRgb = getComputedStyle(document.documentElement).getPropertyValue("--accent-rgb").trim() || "30, 136, 229";

  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: ${isError ? "#ff4d4f" : accent};
    color: ${isError ? "#ffffff" : "#0a0a0a"};
    padding: 15px 25px;
    border-radius: 8px;
    font-weight: 700;
    z-index: 10000;
    animation: slideIn 0.3s ease;
    box-shadow: 0 4px 15px rgba(${accentRgb}, 0.35);
    max-width: 360px;
    line-height: 1.3;
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease";
    setTimeout(() => {
      if (notification.parentNode) notification.parentNode.removeChild(notification);
    }, 300);
  }, 5000);
}

// ===== HELPERS =====
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function injectNotificationAnimations() {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(400px); opacity: 0; }
      to   { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
      from { transform: translateX(0); opacity: 1; }
      to   { transform: translateX(400px); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
}
