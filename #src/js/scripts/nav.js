// мобильное меню

//выпадающее меню для мобильных устройств
document.addEventListener("click", documentActions);

function documentActions(e) {
  const targetElement = e.target;
  if (window.innerWidth > 900) {
    if (targetElement.classList.contains("menu__arrow")) {
      targetElement.closest(".menu__item").classList.toggle("_hover");
    }
    if (
      !targetElement.closest(".menu__item") &&
      document.querySelectorAll(".menu__item._hover").length > 0
    ) {
      // console.log("ehhh");
      // _removeClasses(document.querySelectorAll(".menu__item._hover"), "_hover");
    }
  }
}

// проверка, является ли уствройство мобильным
const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

if (isMobile.any()) {
  // document.querySelector('html').classList.add('_touch');
  document.body.classList.add("_touch");
}

// меню бургер
const iconMenu = document.querySelector(".menu__icon");
const menuBody = document.querySelector(".menu__body");
const menuLink = document.querySelector(".menu__item");
if (iconMenu) {
  iconMenu.addEventListener("click", function (e) {
    document.body.classList.toggle("_lock");
    iconMenu.classList.toggle("_active");
    menuBody.classList.toggle("_active");
  });
}
// закрытие при клике
menuLink.addEventListener("click", function (e) {
  console.log("yes");
  document.body.classList.remove("_lock");
  iconMenu.classList.remove("_active");
  menuBody.classList.remove("_active");
});
