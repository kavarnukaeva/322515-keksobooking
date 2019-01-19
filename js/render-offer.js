'use strict';

(function () {
  var similarOfferElementTemplate = document.querySelector('#card').content.querySelector('.popup');

  var insertOfferElementType = function (type, el) {
    el.querySelector('.popup__type').textContent = window.Constants.PLACE_ELEMENTS_CONTENT[type];
  };

  var insertOfferElementDetails = function (array, el) {
    if (array.length) {
      el.textContent = array;
    } else {
      window.utils.hideElement(el);
    }
  };

  // функция отрисовки объявления
  window.renderOffer = function (array) {
    var offerElement = similarOfferElementTemplate.cloneNode(true);
    var offerTitleElement = offerElement.querySelector('.popup__title');
    var offerFeaturesElement = offerElement.querySelector('.popup__features');
    var offerFeatureElements = offerElement.querySelectorAll('.popup__features li');
    var offerDescriptionElement = offerElement.querySelector('.popup__description');
    var offerAddressElement = offerElement.querySelector('.popup__text--address');
    var offerPriceElement = offerElement.querySelector('.popup__text--price');
    var offerCapacityElement = offerElement.querySelector('.popup__text--capacity');
    var offerTimeElement = offerElement.querySelector('.popup__text--time');
    var offerPhotosElement = offerElement.querySelector('.popup__photos');

    offerTitleElement.textContent = array.offer.title;

    if (array.offer.address.length) {
      offerAddressElement.textContent = array.offer.address;
    } else {
      window.utils.hideElement(offerAddressElement);
    }

    offerPriceElement.textContent = array.offer.price + window.Constants.PER_NIGHT;

    insertOfferElementType(array.offer.type, offerElement);

    if (array.offer.rooms && array.offer.guests) {
      offerCapacityElement.textContent = array.offer.rooms + ' комнаты для ' + array.offer.guests + ' гостей';
    } else {
      window.utils.hideElement(offerCapacityElement);
    }

    if (array.offer.checkin.length && array.offer.checkout.length) {
      offerTimeElement.textContent = 'Заезд после ' + array.offer.checkin + ', выезд до ' + array.offer.checkout;
    } else {
      window.utils.hideElement(offerTimeElement);
    }

    if (array.offer.features.length) {

      array.offer.features.forEach(function (el) {
        var feature = offerElement.querySelector('.popup__feature--' + el + '');
        feature.textContent = el;
      });
    } else {
      window.utils.hideElement(offerFeaturesElement);
    }

    offerFeatureElements.forEach(function (el) {
      if (el.textContent === '') {
        window.utils.hideElement(el);
      }
    });

    insertOfferElementDetails(array.offer.description, offerDescriptionElement);

    if (array.offer.photos.length) {
      offerElement.querySelector('img').setAttribute('src', array.author.avatar);

      var fragment = document.createDocumentFragment();

      array.offer.photos.forEach(function (item) {
        var newImgElement = document.createElement('img');
        newImgElement.setAttribute('width', window.Constants.PHOTO_WIDTH);
        newImgElement.setAttribute('height', window.Constants.PHOTO_HEIGHT);
        newImgElement.setAttribute('src', item);

        newImgElement.className = 'popup__photo';
        fragment.appendChild(newImgElement);
      });
      offerPhotosElement.appendChild(fragment);
    } else {
      window.utils.hideElement(offerPhotosElement);
    }

    return offerElement;
  };
})();
