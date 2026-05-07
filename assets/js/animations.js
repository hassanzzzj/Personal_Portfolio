document.addEventListener('DOMContentLoaded', function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (window.AOS && typeof window.AOS.init === 'function') {
    window.AOS.init({
      duration: 760,
      once: true,
      easing: 'ease-out-cubic',
      offset: 70,
      disable: reduceMotion
    });
  } else {
    document.querySelectorAll('[data-aos]').forEach(function (el) {
      el.removeAttribute('data-aos');
    });
  }

  if (window.Typed && document.getElementById('typed-output') && !reduceMotion) {
    new window.Typed('#typed-output', {
      strings: [
        'agentic AI systems',
        'reliable RAG pipelines',
        'FastAPI AI services',
        'multi-agent workflows',
        'evaluation-first LLM apps'
      ],
      typeSpeed: 54,
      backSpeed: 30,
      backDelay: 1800,
      startDelay: 350,
      loop: true,
      smartBackspace: true
    });
  }

  (function initParticles() {
    var canvas = document.getElementById('particle-canvas');
    if (!canvas || reduceMotion) return;
    var ctx = canvas.getContext('2d');
    if (!ctx) return;

    var particles = [];
    var count = Math.min(82, Math.max(38, Math.floor(window.innerWidth / 18)));
    var colors = ['rgba(61,214,163,', 'rgba(85,183,255,', 'rgba(246,200,95,'];

    function resize() {
      var ratio = window.devicePixelRatio || 1;
      canvas.width = Math.floor(window.innerWidth * ratio);
      canvas.height = Math.floor(window.innerHeight * ratio);
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    function createParticle() {
      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.9 + 0.5,
        dx: (Math.random() - 0.5) * 0.34,
        dy: (Math.random() - 0.5) * 0.34,
        color: colors[Math.floor(Math.random() * colors.length)] + (Math.random() * 0.45 + 0.18) + ')'
      };
    }

    function reset() {
      particles = [];
      count = Math.min(82, Math.max(38, Math.floor(window.innerWidth / 18)));
      for (var i = 0; i < count; i += 1) particles.push(createParticle());
    }

    function drawLines() {
      for (var i = 0; i < particles.length; i += 1) {
        for (var j = i + 1; j < particles.length; j += 1) {
          var dx = particles[i].x - particles[j].x;
          var dy = particles[i].y - particles[j].y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(85,183,255,' + (0.09 * (1 - dist / 120)) + ')';
            ctx.lineWidth = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    function tick() {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      drawLines();
      particles.forEach(function (p) {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < -10) p.x = window.innerWidth + 10;
        if (p.x > window.innerWidth + 10) p.x = -10;
        if (p.y < -10) p.y = window.innerHeight + 10;
        if (p.y > window.innerHeight + 10) p.y = -10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });
      window.requestAnimationFrame(tick);
    }

    resize();
    reset();
    tick();
    window.addEventListener('resize', function () {
      resize();
      reset();
    }, { passive: true });
  })();

  (function initSkillBars() {
    var skillBars = document.querySelectorAll('.skill-fill');
    if (!skillBars.length) return;

    if (!('IntersectionObserver' in window)) {
      skillBars.forEach(function (bar) {
        bar.style.width = (bar.getAttribute('data-width') || '0') + '%';
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var bar = entry.target;
        window.setTimeout(function () {
          bar.style.width = (bar.getAttribute('data-width') || '0') + '%';
        }, 120);
        obs.unobserve(bar);
      });
    }, { threshold: 0.35 });

    skillBars.forEach(function (bar) {
      bar.style.width = '0%';
      observer.observe(bar);
    });
  })();
});
