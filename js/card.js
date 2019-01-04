'use strict';

(function () {
  var similarOfferTemplate = document.querySelector('#card').content.querySelector('.popup');

  //функция отрисовки объявления
  window.renderOffer = function (array) {
    var offerElement = similarOfferTemplate.cloneNode(true);

    offerElement.querySelector('.popup__title').textContent = array.offer.title;
    offerElement.querySelector('.popup__text--address').textContent = array.offer.address;
    offerElement.querySelector('.popup__text--price').textContent = `${array.offer.price}₽/ночь`;
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

    offerElement.querySelector('.popup__text--capacity').textContent = `${array.offer.rooms} комнаты для ${array.offer.guests} гостей`;
    offerElement.querySelector('.popup__text--time').textContent = `Заезд после ${array.offer.checkin}, выезд до ${array.offer.checkout}`;
    offerElement.querySelector('.popup__features').textContent = array.offer.features;
    offerElement.querySelector('.popup__description').textContent = array.offer.description;
    offerElement.querySelector('.popup__photos').querySelector('img').setAttribute('src', `${array.offer.photos[0]}`);
    offerElement.querySelector('img').setAttribute('src', `${array.author.avatar}`);

    for (var i = 1; i < photos.length; i++ ) {
      var popupPhotos = offerElement.querySelector('.popup__photos');
      var image = popupPhotos.querySelector('img');
      popupPhotos.appendChild(image.cloneNode(true));

      // ищет и наполняет все созданные элементы
      var images = popupPhotos.querySelectorAll('img');
      images[i].setAttribute('src', `${array.offer.photos[i]}`);
    }

    return offerElement;
  };
})();
