const orderDialog = document.getElementById('order-dialog');
const orderForm = document.getElementById('order-form');
const orderButtons = document.querySelectorAll('.product-card__button');
const closeDialogButton = document.getElementById('close-order-dialog');
const selectedProductInput = document.getElementById('selected-product');
const selectedProductName = document.getElementById('selected-product-name');
const successMessage = document.getElementById('success-message');
const formElements = Array.from(orderForm.elements);

function clearErrors() {
  formElements.forEach((element) => {
    element.removeAttribute('aria-invalid');
  });
}

orderButtons.forEach((button) => {
  button.addEventListener('click', () => {
    clearErrors();
    successMessage.hidden = true;
    selectedProductInput.value = button.dataset.product;
    selectedProductName.textContent = button.dataset.product;
    orderDialog.showModal();
  });
});

closeDialogButton.addEventListener('click', () => {
  orderDialog.close();
});

orderForm.addEventListener('submit', (event) => {
  // Серверной части нет: отменяем настоящую отправку данных.
  event.preventDefault();
  clearErrors();

  if (!orderForm.checkValidity()) {
    formElements.forEach((element) => {
      if (element.willValidate && !element.validity.valid) {
        element.setAttribute('aria-invalid', 'true');
      }
    });
    orderForm.reportValidity();
    return;
  }

  successMessage.hidden = false;
  orderForm.reset();
  orderDialog.close();
  successMessage.scrollIntoView({ block: 'center' });
});
