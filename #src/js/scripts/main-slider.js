// слайдер на главной
const headerSlider = new Swiper(".tophead-slider", {
  // loop: true,
  autoplay: {
    //пауза между прокруткой
    delay: 3000,
    //закончить на последнем слайде
    // stopOnLastSlide: false,
    //отключить после ручного переключения
    // disableOnInteraction: false,
  },
  //скорость переключения слайдов
  speed: 800,
  // навигация по стрелкам
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
    // disabledClass: "stories-button__unactive",
    clickable: true,
    // для ппрвильного направления
  },
  // буллеты
  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
    clickable: true,
    dynamicBullets: true,
  },
  //эффект перехода слайда (только если показ по 1-му слайду)
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
  // показ кол-ва слайдов (работает, когда откл effect: "fade")
  slidesPerView: 3.6,
  // расстояние между слайдами
  spaceBetween: 40,
  //отложенная загрузка:
  //отключаем презагрузку картинок
  preloadImages: false,
  lazy: {
    loadOnTransitionStart: false,
    loadPrevNext: false,
  },
  // переключение при клике на слайд
  slideToClickedSlide: true,
  // отключение прокрутки при наведении мыши
  on: {
    init() {
      this.el.addEventListener("mouseenter", () => {
        this.autoplay.stop();
      });

      this.el.addEventListener("mouseleave", () => {
        this.autoplay.start();
      });
    },
  },
  //
});
//----- END
