document.addEventListener("DOMContentLoaded", function () {
    // Функция для анимации счетчика
    function animateCounter(el, start = 0, end, duration = 2000) {
        let startTime = null;

        // Функция, которая будет вызываться на каждом кадре анимации
        const step = (timestamp) => {
            if (!startTime) startTime = timestamp; // Запоминаем время старта анимации
            const progress = Math.min((timestamp - startTime) / duration, 1); // Вычисляем прогресс анимации от 0 до 1
            el.innerText = Math.floor(progress * (end - start) + start); // Устанавливаем текущее значение

            if (progress < 1) {
                requestAnimationFrame(step); // Запрашиваем следующий кадр анимации
            } else {
                el.innerText = end; // Гарантируем, что финальное число точно соответствует `end`
            }
        };

        requestAnimationFrame(step); // Запускаем анимацию
    }

    // Функция, которая запускает анимацию при появлении элемента в видимой области экрана
    function startAnimation(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) { // Проверяем, находится ли элемент в видимой области
                const el = entry.target;
                const endValue = parseInt(el.dataset.counter, 10); // Получаем конечное значение счетчика из `data-counter`
                const duration = el.dataset.duration ? parseInt(el.dataset.duration, 10) : 2000; // Получаем длительность из `data-duration`, по умолчанию 2000 мс
                const repeat = el.dataset.repeat === "true"; // Проверяем, указан ли `data-repeat="true"`

                console.log(duration);

                animateCounter(el, 0, endValue, duration); // Запускаем анимацию

                if (!repeat) {
                    observer.unobserve(el); // Если повторная анимация не нужна, отключаем отслеживание элемента
                }
            }
        });
    }

    // Создаем объект `IntersectionObserver` для отслеживания появления элементов в зоне видимости
    const observer = new IntersectionObserver(startAnimation, {
        root: null, // Следим за областью видимости всего окна браузера
        threshold: 0.8 // Запускаем анимацию, когда 50% элемента видно
    });

    // Находим все элементы с атрибутом `data-counter` и начинаем за ними следить
    document.querySelectorAll("[data-counter]").forEach(el => observer.observe(el));
});
