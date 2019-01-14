'use strict';

(function () {
  var similarOfferTemplate = document.querySelector('#card').content.querySelector('.popup');

  // функция отрисовки объявления
  window.renderOffer = function (array) {
    var offerElement = similarOfferTemplate.cloneNode(true);

    offerElement.querySelector('.popup__title').textContent = array.offer.title;

    if (array.offer.address.length) {
      offerElement.querySelector('.popup__text--address').textContent = array.offer.address;
    } else {
      offerElement.querySelector('.popup__text--address').style.display = 'none';
    }

    offerElement.querySelector('.popup__text--price').textContent = array.offer.price + ' ₽/ночь';
    if (array.offer.type === 'palace') {
      offerElement.querySelector('.popup__type').textContent = 'Дворец';
    }

    if (array.offer.type === 'flat') {
      offerElement.querySelector('.popup__type').textContent = 'Квартира';
    }

    if (array.offer.type === 'house') {
      offerElement.querySelector('.popup__type').textContent = 'Дом';
    }

    if (array.offer.type === 'bungalo') {
      offerElement.querySelector('.popup__type').textContent = 'Бунгало';
    }

    if (array.offer.rooms && array.offer.guests) {
      offerElement.querySelector('.popup__text--capacity').textContent = array.offer.rooms + ' комнаты для ' + array.offer.guests + ' гостей';
    } else {
      offerElement.querySelector('.popup__text--capacity').style.display = 'none';
    }

    if (array.offer.checkin.length && array.offer.checkout.length) {
      offerElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + array.offer.checkin + ', выезд до ' + array.offer.checkout;
    } else {
      offerElement.querySelector('.popup__text--time').style.display = 'none';
    }

    if (array.offer.features.length) {
      offerElement.querySelector('.popup__features').textContent = array.offer.features;
    } else {
      offerElement.querySelector('.popup__features').style.display = 'none';
    }

    if (array.offer.description.length) {
      offerElement.querySelector('.popup__description').textContent = array.offer.description;
    } else {
      offerElement.querySelector('.popup__description').style.display = 'none';
    }

    if (array.offer.photos.length) {
      offerElement.querySelector('img').setAttribute('src', array.author.avatar);

      var popupPhotos = offerElement.querySelector('.popup__photos');
      var fragment = document.createDocumentFragment();

      array.offer.photos.forEach(function (item) {
        var newElement = document.createElement('img');
        newElement.setAttribute('width', window.Constants.PHOTO_WIDTH);
        newElement.setAttribute('height', window.Constants.PHOTO_HEIGHT);
        newElement.setAttribute('src', item);

        newElement.className = 'popup__photo';
        fragment.appendChild(newElement);
      });
      popupPhotos.appendChild(fragment);
    } else {
      offerElement.querySelector('.popup__photos').style.display = 'none';
    }

    return offerElement;
  };
})();
