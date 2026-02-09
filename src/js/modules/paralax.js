class ParallaxController {
  constructor() {
    this.items = [];
    this.ticking = false;

    this.onScroll = this.onScroll.bind(this);
    this.onResize = this.onResize.bind(this);
  }

  init() {
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) return;

    this.collect();
    if (!this.items.length) return;

    window.addEventListener('scroll', this.onScroll, { passive: true });
    window.addEventListener('resize', this.onResize);

    this.update();
  }

  collect() {
    this.items = [];

    document.querySelectorAll('[data-parallax]').forEach((el) => {
      const imgWrap = el.querySelector('.parallax__img');
      const img = imgWrap?.querySelector('img');
      if (!img) return;

      this.items.push({
        el,
        imgWrap,
        img,
        speed: parseFloat(el.dataset.speed) || 1,
        maxShift: 0
      });
    });

    this.calculateBounds();
  }

  calculateBounds() {
    this.items.forEach((item) => {
      const blockHeight = item.el.offsetHeight;
      const imgHeight = item.img.offsetHeight;

      item.maxShift = Math.max(0, (imgHeight - blockHeight) / 2);
    });
  }

  onScroll() {
    if (!this.ticking) {
      requestAnimationFrame(() => {
        this.update();
        this.ticking = false;
      });
      this.ticking = true;
    }
  }

  onResize() {
    this.calculateBounds();
    this.update();
  }

  update() {
    const vh = window.innerHeight;
    const isMobile = window.innerWidth <= 768;
    const mobileFactor = isMobile ? 0.6 : 1;

    this.items.forEach((item) => {
      const rect = item.el.getBoundingClientRect();

      if (rect.bottom < 0 || rect.top > vh) return;
      if (item.maxShift <= 0) return;

      const progress = (rect.top + rect.height) / (vh + rect.height);

      let y =
        (progress - 0.5) *
        -2 *
        item.maxShift *
        item.speed *
        mobileFactor;

      y = Math.max(-item.maxShift, Math.min(item.maxShift, y));

      item.imgWrap.style.transform = `translate3d(0, ${y}px, 0)`;
    });
  }
}

// самозапуск модуля
document.addEventListener('DOMContentLoaded', () => {
  new ParallaxController().init();
});
