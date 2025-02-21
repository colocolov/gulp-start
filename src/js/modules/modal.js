// Получаем элементы
const modal = document.getElementById('modal');

if (modal) {

  const openModalBtns = document.querySelectorAll('.openModalBtn');
  const closeModalBtn = document.getElementById('closeModal');
  const submitBtn = document.getElementById('submit');
  const socialLink = document.querySelectorAll('.social__icon');
  const body = document.body;

  // Функция закрытия окна
  function closeModal() {
    modal.classList.remove("open");
    body.classList.remove("_lock");
  }

  // Открытие модального окна при клике на кнопку
  openModalBtns.forEach(button => {
    button.onclick = function() {
      modal.classList.add('open');
      body.classList.add('_lock');
    };
  });

  // Закрытие модального окна при клике на крестик
  closeModalBtn.onclick = function() {
    closeModal();
  };

  // Закрытие модального окна при клике на фон
  window.onclick = function(event) {
    if (event.target == modal) {
      closeModal();
    }
  };

  // Закрытие при клике на соц.сети
  if (socialLink.length) {
    socialLink.forEach((item) => {
      item.addEventListener("click", () => {
        closeModal();
      });
    });
  }


  // Закрытие модального окна про клавише Esc
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' || e.keyCode === 27) {
      closeModal();
    }
  });

  // Логика отправки (можно заменить на вашу реализацию)
  submitBtn.onclick = function() {
    const phone = document.getElementById('phone').value;
    if (phone) {
      // alert('Номер телефона: ' + phone);
      modal.style.display = "none";
      body.classList.remove("_lock");
    } else {
      alert('Пожалуйста, введите номер телефона.');
    }
  };

}