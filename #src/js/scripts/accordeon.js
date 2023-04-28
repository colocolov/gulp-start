// accordeon
document.addEventListener("DOMContentLoaded", () => {
  const accordeons = document.querySelectorAll(".accordeon__item");

  if (accordeons.length) { // если есть аккордеоны
    accordeons.forEach((el) => {
      el.addEventListener("click", (e) => {
        const self = e.currentTarget;
        const title = self.querySelector(".accordeon__name");
        const content = self.querySelector(".accordeon__decription");

        self.classList.toggle("active");
      });
    });
  }
});
// ----- END
