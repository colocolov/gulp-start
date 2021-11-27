// слайдер отзывов
var reviewsSlider = new Swiper(".reviews__sliders", {
  loop: true,
  navigation: {
    nextEl: ".reviews-button--right",
    prevEl: ".reviews-button--left",
    clickable: true,
  },
  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
    clickable: true,
  },
});
//----- END
