'use strict';

(function () {
  var offerTitleInput = document.querySelector('#title');

  offerTitleInput.addEventListener('invalid', function () {
    if (offerTitleInput.validity.tooShort) {
      offerTitleInput.setCustomValidity('Заголовок должен состоять минимум из 30 символов');
    } else if (offerTitleInput.validity.tooLong) {
      offerTitleInput.setCustomValidity('Заголовок не должен превышать 100 символов');
    } else if (offerTitleInput.validity.valueMissing) {
      offerTitleInput.setCustomValidity('Обязательное поле');
    } else {
      offerTitleInput.setCustomValidity('');
    }
  });

  var form = document.querySelector('.ad-form');
  var formReset = form.querySelector('.ad-form__reset');
  var roomsNumberInput = document.querySelector('#room_number');
  var guestsNumberInput = document.querySelector('#capacity');
  var homeTypeInput = document.querySelector('#type');
  var priceInput = document.querySelector('#price');

  form.addEventListener('change', function () {
    if (parseInt(roomsNumberInput.value, 10) < parseInt(guestsNumberInput.value, 10)) {
      guestsNumberInput.setCustomValidity('Слишком много народу для такой комнатушки!');
    } else if (parseInt(roomsNumberInput.value, 10) === 100 && parseInt(guestsNumberInput.value, 10) !== 0) {
      guestsNumberInput.setCustomValidity('Эта хата не для гостей!');
    } else if (guestsNumberInput.value === '0' && parseInt(roomsNumberInput.value, 10) !== 100) {
      guestsNumberInput.setCustomValidity('Выберите количество гостей!');
    } else {
      guestsNumberInput.setCustomValidity('');
    }
  });

  homeTypeInput.addEventListener('change', function () {
    if (homeTypeInput.value === 'bungalo') {
      priceInput.setAttribute('min', '0');
      priceInput.setAttribute('placeholder', '0');
    } else if (homeTypeInput.value === 'flat') {
      priceInput.setAttribute('min', '1000');
      priceInput.setAttribute('placeholder', '1000');
    } else if (homeTypeInput.value === 'house') {
      priceInput.setAttribute('min', '5000');
      priceInput.setAttribute('placeholder', '5000');
    } else {
      priceInput.setAttribute('min', '10000');
      priceInput.setAttribute('placeholder', '10000');
    }
  });

  form.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(form), function (response) {
      window.utils.changeToInitialState();
    });
    evt.preventDefault();
  });

  formReset.addEventListener('click', function () {
    window.utils.changeToInitialState();
  });
})();
