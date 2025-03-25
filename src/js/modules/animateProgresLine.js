// ---------------- анимация линии с раделами

class ScrollAnimation {
  constructor(container) {
    this.container = container;
    this.line = container.querySelector('.line');
    this.sections = container.querySelectorAll('.section');
    this.duration = parseInt(container.dataset.duration) || 7000;
    this.shouldRepeat = container.dataset.repeat === 'true';
    this.animationId = null;
    this.startTime = null;
    this.sectionPositions = [];
    
    this.init();
  }

  init() {
    this.calculatePositions();
    this.setupObserver();
    window.addEventListener('resize', this.calculatePositions.bind(this));
  }

  calculatePositions() {
    const containerRect = this.container.getBoundingClientRect();
    const scrollX = window.scrollX || window.pageXOffset;
    
    this.sectionPositions = Array.from(this.sections).map(section => {
      const rect = section.getBoundingClientRect();
      return {
        left: rect.left + scrollX - containerRect.left,
        width: rect.width
      };
    });
  }

  setupObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.startAnimation();
        } else if (!this.shouldRepeat) {
          this.resetAnimation();
        }
      });
    }, { threshold: 0.5 });

    observer.observe(this.container);
  }

  startAnimation() {
    cancelAnimationFrame(this.animationId);
    this.line.style.transform = 'translate(-50%, -50%) scaleX(0)';
    
    requestAnimationFrame(() => {
      this.line.style.transition = `transform ${this.duration}ms linear`;
      this.line.style.transform = 'translate(-50%, -50%) scaleX(1)';
      this.startTime = Date.now();
      this.animateSections();
    });
  }

  animateSections() {
    const elapsed = Date.now() - this.startTime;
    const progress = elapsed / this.duration;
    
    this.sections.forEach((section, index) => {
      const sectionStart = this.sectionPositions[index].left / window.innerWidth;
      if (progress >= sectionStart && !section.classList.contains('visible')) {
        section.classList.add('visible');
      }
    });

    if (progress < 1) {
      this.animationId = requestAnimationFrame(this.animateSections.bind(this));
    }
  }

  resetAnimation() {
    cancelAnimationFrame(this.animationId);
    this.line.style.transition = 'none';
    this.sections.forEach(section => section.classList.remove('visible'));
  }
}

// Инициализация для всех контейнеров
document.querySelectorAll('.scroll-animation').forEach(container => {
  new ScrollAnimation(container);
});