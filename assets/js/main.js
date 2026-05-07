var EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
var EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
var EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';

document.addEventListener('DOMContentLoaded', function () {
  var navbar = document.getElementById('navbar');
  var backToTop = document.getElementById('back-to-top');
  var navToggle = document.getElementById('nav-toggle');
  var navLinks = document.getElementById('nav-links');
  var sections = Array.prototype.slice.call(document.querySelectorAll('section[id]'));
  var navAnchors = Array.prototype.slice.call(document.querySelectorAll('.nav-link[href^="#"]'));

  function closeMenu() {
    if (!navLinks || !navToggle) return;
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var open = !navLinks.classList.contains('open');
      navLinks.classList.toggle('open', open);
      navToggle.classList.toggle('open', open);
      navToggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeMenu();
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (event) {
      var targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;
      var target = document.querySelector(targetId);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      closeMenu();
    });
  });

  function updateChrome() {
    var scrollY = window.scrollY || document.documentElement.scrollTop;
    if (navbar) navbar.classList.toggle('scrolled', scrollY > 42);
    if (backToTop) backToTop.classList.toggle('visible', scrollY > 420);

    var current = '';
    var offset = 120;
    sections.forEach(function (section) {
      var top = section.offsetTop - offset;
      var bottom = top + section.offsetHeight;
      if (scrollY >= top && scrollY < bottom) current = section.id;
    });

    navAnchors.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', updateChrome, { passive: true });
  window.addEventListener('resize', updateChrome, { passive: true });
  updateChrome();

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  document.querySelectorAll('.filter-btn').forEach(function (button) {
    button.addEventListener('click', function () {
      var filter = button.getAttribute('data-filter') || 'all';
      document.querySelectorAll('.filter-btn').forEach(function (btn) {
        btn.classList.toggle('active', btn === button);
      });
      document.querySelectorAll('.project-card[data-category]').forEach(function (card) {
        var categories = (card.getAttribute('data-category') || '').split(/\s+/);
        card.classList.toggle('hidden', filter !== 'all' && categories.indexOf(filter) === -1);
      });
    });
  });

  if (window.emailjs && typeof window.emailjs.init === 'function' && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
    window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }

  var contactForm = document.getElementById('contact-form');
  var submitBtn = document.getElementById('contact-submit-btn');
  var formStatus = document.getElementById('form-status');
  var nameInput = document.getElementById('contact-name');
  var emailInput = document.getElementById('contact-email');
  var messageInput = document.getElementById('contact-message');

  function setStatus(type, message) {
    if (!formStatus) return;
    formStatus.className = type;
    formStatus.textContent = message;
  }

  function clearStatus() {
    if (!formStatus) return;
    formStatus.className = '';
    formStatus.textContent = '';
  }

  function setError(input, id, message) {
    var error = document.getElementById(id);
    if (input) input.classList.add('invalid');
    if (error) error.textContent = message;
  }

  function clearError(input, id) {
    var error = document.getElementById(id);
    if (input) input.classList.remove('invalid');
    if (error) error.textContent = '';
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function validateForm() {
    var valid = true;
    var nameValue = nameInput ? nameInput.value.trim() : '';
    var emailValue = emailInput ? emailInput.value.trim() : '';
    var messageValue = messageInput ? messageInput.value.trim() : '';

    if (nameValue.length < 2) {
      setError(nameInput, 'name-error', 'Please enter your name.');
      valid = false;
    } else {
      clearError(nameInput, 'name-error');
    }

    if (!isValidEmail(emailValue)) {
      setError(emailInput, 'email-error', 'Please enter a valid email address.');
      valid = false;
    } else {
      clearError(emailInput, 'email-error');
    }

    if (messageValue.length < 10) {
      setError(messageInput, 'message-error', 'Please write at least 10 characters.');
      valid = false;
    } else {
      clearError(messageInput, 'message-error');
    }

    return valid;
  }

  [nameInput, emailInput, messageInput].forEach(function (input) {
    if (!input) return;
    input.addEventListener('input', function () {
      if (input.classList.contains('invalid')) validateForm();
    });
  });

  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();
      clearStatus();
      if (!validateForm()) return;

      var emailReady = window.emailjs &&
        typeof window.emailjs.send === 'function' &&
        EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY' &&
        EMAILJS_SERVICE_ID !== 'YOUR_SERVICE_ID' &&
        EMAILJS_TEMPLATE_ID !== 'YOUR_TEMPLATE_ID';

      if (!emailReady) {
        setStatus('error', 'Email service is not configured yet. Connect EmailJS credentials in assets/js/main.js, or use LinkedIn/GitHub above.');
        return;
      }

      if (submitBtn) {
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
      }

      window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: nameInput.value.trim(),
        from_email: emailInput.value.trim(),
        subject: (document.getElementById('contact-subject') || {}).value || 'Portfolio Contact',
        message: messageInput.value.trim(),
        reply_to: emailInput.value.trim()
      }).then(function () {
        setStatus('success', 'Message sent successfully. I will get back to you soon.');
        contactForm.reset();
      }).catch(function (error) {
        console.error('EmailJS error:', error);
        setStatus('error', 'Something went wrong while sending. Please try again or reach out through LinkedIn.');
      }).finally(function () {
        if (submitBtn) {
          submitBtn.classList.remove('loading');
          submitBtn.disabled = false;
        }
      });
    });
  }
});
