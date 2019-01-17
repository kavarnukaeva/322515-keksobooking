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

  var formElement = document.querySelector('.ad-form');
  var formResetElement = formElement.querySelector('.ad-form__reset');
  var roomsNumberInput = document.querySelector('#room_number');
  var guestsNumberInput = document.querySelector('#capacity');
  var homeTypeInput = document.querySelector('#type');
  window.priceInput = document.querySelector('#price');
  var checkInSelect = document.querySelector('#timein');
  var checkOutSelect = document.querySelector('#timeout');

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
      window.priceInput.setAttribute('min', window.Constants.MIN_PRICE.bungalo);
      window.priceInput.setAttribute('placeholder', window.Constants.MIN_PRICE.bungalo);
    } else if (homeTypeInput.value === window.Constants.PLACE_TYPE.flat) {
      window.priceInput.setAttribute('min', window.Constants.MIN_PRICE.flat);
      window.priceInput.setAttribute('placeholder', window.Constants.MIN_PRICE.flat);
    } else if (homeTypeInput.value === window.Constants.PLACE_TYPE.house) {
      window.priceInput.setAttribute('min', window.Constants.MIN_PRICE.house);
      window.priceInput.setAttribute('placeholder', window.Constants.MIN_PRICE.house);
    } else {
      window.priceInput.setAttribute('min', window.Constants.MIN_PRICE.palace);
      window.priceInput.setAttribute('placeholder', window.Constants.MIN_PRICE.palace);
    }
  });

  var sync = function (selected, synchronized) {
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

  checkInSelect.addEventListener('change', function () {
    sync(checkInSelect, checkOutSelect);
  });

  checkOutSelect.addEventListener('change', function () {
    sync(checkOutSelect, checkInSelect);
  });

  formElement.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(formElement), function () {
      window.utils.returnSuccessMessage();
      window.utils.changeToInitialState();
    });
    evt.preventDefault();
  });

  formResetElement.addEventListener('click', function () {
    window.utils.changeToInitialState();
  });
})();
