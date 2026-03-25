const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function setupMenu() {
  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("siteNav");

  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    nav.classList.toggle("active");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function setupGsapAnimations() {
  if (typeof gsap === "undefined" || prefersReducedMotion) return;

  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".reveal-up").forEach((element) => {
    gsap.to(element, {
      opacity: 1,
      y: 0,
      duration: 0.85,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 88%"
      }
    });
  });

  gsap.utils.toArray(".reveal-left").forEach((element) => {
    gsap.fromTo(
      element,
      { opacity: 0, x: -42 },
      {
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 86%"
        }
      }
    );
  });

  gsap.utils.toArray(".reveal-right").forEach((element) => {
    gsap.fromTo(
      element,
      { opacity: 0, x: 42 },
      {
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 86%"
        }
      }
    );
  });

  const floatingCard = document.querySelector(".floating-card");
  if (floatingCard) {
    gsap.to(floatingCard, {
      y: -16,
      duration: 2.7,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }

  document.querySelectorAll(".phone").forEach((phone, index) => {
    gsap.to(phone, {
      y: index % 2 === 0 ? -16 : 16,
      duration: 2.4 + index * 0.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  });
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function setupContactForm() {
  const form = document.getElementById("contactForm");
  const feedback = document.getElementById("contactFeedback");

  if (!form || !feedback) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name")?.value.trim() || "";
    const email = document.getElementById("email")?.value.trim() || "";

    if (!name) {
      feedback.textContent = "Preencha seu nome.";
      return;
    }

    if (!validateEmail(email)) {
      feedback.textContent = "Digite um e-mail válido.";
      return;
    }

    feedback.textContent = "Formulário validado com sucesso. Agora basta conectar à ferramenta de recebimento.";
    form.reset();
  });
}

function setupWaitlistForm() {
  const form = document.getElementById("waitlistForm");
  const feedback = document.getElementById("waitlistFeedback");
  const counter = document.getElementById("subscriberCount");

  if (!form || !feedback) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("waitlistName")?.value.trim() || "";
    const email = document.getElementById("waitlistEmail")?.value.trim() || "";

    if (!name) {
      feedback.textContent = "Preencha seu nome.";
      return;
    }

    if (!validateEmail(email)) {
      feedback.textContent = "Digite um e-mail válido.";
      return;
    }

    feedback.textContent = "Cadastro validado com sucesso.";

    if (counter) {
      const numeric = Number(counter.textContent.replace(/\./g, ""));
      if (!Number.isNaN(numeric)) {
        counter.textContent = String(numeric + 1).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      }
    }

    setTimeout(() => {
      window.location.href = "thank-you.html";
    }, 900);
  });
}

setupMenu();
setupGsapAnimations();
setupContactForm();
setupWaitlistForm();
