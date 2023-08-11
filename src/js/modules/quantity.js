let quantityBtns = document.querySelectorAll('.quantity__btn');
if (quantityBtns.length > 0) {
  for (let index = 0; index < quantityBtns.length; index++) {
    const quantityBtn = quantityBtns[index];
    quantityBtn.addEventListener('click', function (e) {
      let value = parseInt(quantityBtn.closest('.quantity').querySelector('input').value);
      if (quantityBtn.classList.contains('quantity__btn_plus')) {
        value++;
      } else {
        --value;
        if (value < 1) { value = 1; }
      }
      quantityBtn.closest('.quantity').querySelector('input').value = value;
    });

  }
}