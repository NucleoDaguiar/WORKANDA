const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function setupWaitlistForm() {
  const waitlistForm = document.getElementById('waitlistForm');
  const feedback = document.getElementById('waitlistFeedback');
  const counter = document.getElementById('subscriberCount');

  if (!waitlistForm) return;

  waitlistForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('waitlistName')?.value.trim();
    const email = document.getElementById('waitlistEmail')?.value.trim();

    if (!name || !email) {
      feedback.textContent = 'Preencha nome e e-mail corretamente.';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      feedback.textContent = 'Digite um e-mail válido.';
      return;
    }

    feedback.textContent = 'Cadastro validado. Conecte agora a integração real da ferramenta escolhida.';

    if (counter) {
      const current = Number(counter.textContent.replace(/\./g, ''));
      if (!Number.isNaN(current)) {
        counter.textContent = String(current + 1).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      }
    }

    setTimeout(() => {
      window.location.href = 'thank-you.html';
    }, 900);
  });
}

function setupContactForm() {
  const contactForm = document.getElementById('contactForm');
  const feedback = document.getElementById('contactFeedback');

  if (!contactForm) return;

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    feedback.textContent = 'Formulário validado. Agora basta conectar sua ferramenta de recebimento.';
  });
}

setupGsapAnimations();
setupWaitlistForm();
setupContactForm();
