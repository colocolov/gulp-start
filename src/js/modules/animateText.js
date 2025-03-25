document.addEventListener("DOMContentLoaded", function () {
  const textBlocks = document.querySelectorAll(".text-animate");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const repeat = entry.target.dataset.repeat === "true"; // Читаем data-атрибут

        if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
          entry.target.classList.add("visible"); // Запускаем анимацию
        } else if (repeat) {
          entry.target.classList.remove("visible"); // Если repeat=true, убираем анимацию
        }
      });
    },
    { threshold: 0.5 }
  );

  // Запускаем отслеживание для всех элементов .text-animate
  textBlocks.forEach((block) => observer.observe(block));
}); 



