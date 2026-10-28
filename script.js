/* STUDIO — configure abaixo o WhatsApp oficial do estúdio. */
const CONFIG = {
  whatsapp: "", // DDI + DDD + número, somente dígitos. Ex.: 5511999999999
  mensagem: "Olá! Gostaria de conhecer o Studio e saber mais sobre os treinos."
};

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("main-nav");
function closeNav() {
  if (!toggle || !nav) return;
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", "Abrir menu");
  nav.classList.remove("open");
}
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    toggle.setAttribute("aria-label", open ? "Abrir menu" : "Fechar menu");
    nav.classList.toggle("open", !open);
  });
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeNav));
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeNav(); });
  document.addEventListener("click", (event) => {
    if (!nav.contains(event.target) && !toggle.contains(event.target)) closeNav();
  });
}

const header = document.querySelector(".header");
const updateHeader = () => header?.classList.toggle("scrolled", window.scrollY > 12);
window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

const phone = String(CONFIG.whatsapp).replace(/\D/g, "");
const validPhone = /^55\d{10,11}$/.test(phone);
document.querySelectorAll("[data-wa]").forEach((link) => {
  if (validPhone) {
    link.href = `https://wa.me/${phone}?text=${encodeURIComponent(CONFIG.mensagem)}`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  } else {
    link.href = "#contato";
    link.title = "Configure o WhatsApp do studio no arquivo script.js";
    link.addEventListener("click", (event) => {
      event.preventDefault();
      document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });
    });
  }
});

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, current) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        current.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}
