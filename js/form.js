'use strict';

(function () {
  var offerTitleInput = document.querySelector('#title');
  var formElement = document.querySelector('.ad-form');
  var formResetElement = formElement.querySelector('.ad-form__reset');
  var roomsNumberInput = document.querySelector('#room_number');
  var guestsNumberInput = document.querySelector('#capacity');
  var homeTypeInput = document.querySelector('#type');

  window.form = {
    priceInput: document.querySelector('#price'),
    checkInSelect: document.querySelector('#timein'),
    checkOutSelect: document.querySelector('#timeout')
  };

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

  formElement.addEventListener('change', function () {
    if (parseInt(roomsNumberInput.value, 10) < parseInt(guestsNumberInput.value, 10)) {
      guestsNumberInput.setCustomValidity('Слишком много народу для такой комнатушки!');
    } else if (parseInt(roomsNumberInput.value, 10) === window.Constants.GUESTS_MAXCOUNT && parseInt(guestsNumberInput.value, 10) !== window.Constants.ZERO) {
      guestsNumberInput.setCustomValidity('Эта хата не для гостей!');
    } else if (guestsNumberInput.value === '0' && parseInt(roomsNumberInput.value, 10) !== window.Constants.GUESTS_MAXCOUNT) {
      guestsNumberInput.setCustomValidity('Выберите количество гостей!');
    } else {
      guestsNumberInput.setCustomValidity('');
    }
  });

  homeTypeInput.addEventListener('change', function () {
    if (homeTypeInput.value === window.Constants.PLACE_TYPE.bungalo) {
      window.form.priceInput.setAttribute('min', window.Constants.MIN_PRICE.bungalo);
      window.form.priceInput.setAttribute('placeholder', window.Constants.MIN_PRICE.bungalo);
    } else if (homeTypeInput.value === window.Constants.PLACE_TYPE.flat) {
      window.form.priceInput.setAttribute('min', window.Constants.MIN_PRICE.flat);
      window.form.priceInput.setAttribute('placeholder', window.Constants.MIN_PRICE.flat);
    } else if (homeTypeInput.value === window.Constants.PLACE_TYPE.house) {
      window.form.priceInput.setAttribute('min', window.Constants.MIN_PRICE.house);
      window.form.priceInput.setAttribute('placeholder', window.Constants.MIN_PRICE.house);
    } else {
      window.form.priceInput.setAttribute('min', window.Constants.MIN_PRICE.palace);
      window.form.priceInput.setAttribute('placeholder', window.Constants.MIN_PRICE.palace);
    }
  });

  var syncSelectElements = function (selected, synchronized) {
    var activeSelectOptionSelected = selected.querySelector('[selected]');
    activeSelectOptionSelected.removeAttribute('selected');

    var activeSelectOptionSelectedCurrent = selected.querySelector('[value="' + selected.value + '"]');
    activeSelectOptionSelectedCurrent.setAttribute('selected', '');

    synchronized.value = activeSelectOptionSelectedCurrent.value;

    var selectOptionSelected = synchronized.querySelector('[selected]');
    selectOptionSelected.removeAttribute('selected');

    var selectOptionValue = synchronized.querySelector('[value="' + synchronized.value + '"]');
    selectOptionValue.setAttribute('selected', '');
  };

  window.form.checkInSelect.addEventListener('change', function () {
    syncSelectElements(window.form.checkInSelect, window.form.checkOutSelect);
  });

  window.form.checkOutSelect.addEventListener('change', function () {
    syncSelectElements(window.form.checkOutSelect, window.form.checkInSelect);
  });

  var formSubmitHandler = function (evt) {
    window.backend.upload(new FormData(formElement), function () {
      window.utils.returnSuccessMessage();
      window.utils.changeToInitialState();
    });

    evt.preventDefault();
    formElement.removeEventListener('submit', submitForm);
  };

  var formResetHandler = function () {
    window.utils.changeToInitialState();
    formResetElement.removeEventListener('click', resetForm);
  };

  var resetForm = function () {
    formResetElement.addEventListener('click', formResetHandler);
  };

  var submitForm = function () {
    formElement.addEventListener('submit', formSubmitHandler);
  };

  resetForm();
  submitForm();
})();
