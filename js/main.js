'use strict';

var OFFERS_QUANTITY = 8;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var MAP_HEIGHT = 704;
var MAP_WIDTH = 1200;
var MAINPIN_HEIGHT = 199.95;
var MAINPIN_WIDTH = 199.95;
var X_MAINPIN = Math.floor(MAP_WIDTH / 2 - MAINPIN_WIDTH / 2);
var Y_MAINPIN = Math.floor(MAP_HEIGHT / 2 - MAINPIN_HEIGHT / 2);
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var similarPinList = document.querySelector('.map__pins');
var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var similarOfferList = document.querySelector('.map');
var similarOfferTemplate = document.querySelector('#card').content.querySelector('.popup');

var avatar = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png'
];

var title = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var type = ['palace', 'flat', 'house', 'bungalo'];
var rooms = [1, 2, 3, 4, 5];
var checkin = ['12:00', '13:00', '14:00'];
var checkout = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var description = [' '];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

// функция перемешивания массива
var shuffle = function (array) {
    var j;
    var x;
    var i;
    for (i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = array[i];
        array[i] = array[j];
        array[j] = x;
    }
    return array;
};

// функция генерации случайных данных
var getRandomValue = function (array) {
  var randomValue = Math.floor(Math.random() * array.length);
  return randomValue;
};

// функция создания массива из 8 объектов
var generateOffer = function (quantity) {
  var array = [];

  for (var i = 0; i < quantity; i++) {
    var x = Math.floor(Math.random() * (1200 - 1) + 1) - (PIN_WIDTH / 2);
    var y = Math.floor(Math.random() * (630 - 130) + 130) - PIN_HEIGHT;
    var price = Math.floor(Math.random() * (1000000 - 1000) + 1000);
    var guests = Math.floor(Math.random() * (20 - 1) + 1);

    array[i] = {
      author: {
        avatar: shuffle(avatar).splice(0, 1)
      },

      offer: {
        title: title[getRandomValue(title)],
        address: `${x}, ${y}`,
        price: price,
        type: type[getRandomValue(type)],
        rooms: rooms[getRandomValue(rooms)],
        guests: guests,
        checkin: checkin[getRandomValue(checkin)],
        checkout: checkout[getRandomValue(checkout)],
        // перемешивает массив и вынимаю случайное число из его копии
        features: shuffle(features).slice(getRandomValue(features)),
        description: description,
        photos: shuffle(photos)
      },

      location: {
        x: x,
        y: y
      }
    };
  }

  return array;
};

var offers = generateOffer(OFFERS_QUANTITY);

//функция отрисовки метки
var renderPin = function (array) {
  var pinElement = similarPinTemplate.cloneNode(true);

  pinElement.setAttribute('style', `left: ${array.location.x}px; top: ${array.location.y}px`);
  pinElement.querySelector('img').setAttribute('alt', `${array.offer.title}`);
  pinElement.querySelector('img').setAttribute('src', `${array.author.avatar}`);

  return pinElement;
};

//функция отрисовки объявления
var renderOffer = function (array) {
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

// отключает поля формы поиска объявления для неактивного состояния
var disabledElements = document.querySelectorAll('form.ad-form fieldset');

for (var i = 0; i < disabledElements.length; i++) {
  disabledElements[i].setAttribute('disabled', '');
}

// отключает форму c фильтрами для неактивного состояния
var mapFilters = document.querySelector('.map__filters');

mapFilters.classList.add('map__filters--disabled');

var mainPin = document.querySelector('.map__pin--main');
var map = document.querySelector('.map');
var adForm = document.querySelector('.ad-form');
var address = document.querySelector('#address');

address.setAttribute('value', `${X_MAINPIN}, ${Y_MAINPIN}`);

// активное состояние
var changeToActiveState = function () {
  mainPin.removeEventListener('mouseup', changeToActiveState);

  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');

  for (var i = 0; i < disabledElements.length; i++) {
    disabledElements[i].removeAttribute('disabled');
  }

  mapFilters.classList.remove('map__filter--disabled');

  showPinsAndOffers();

  // показ объявления при клике на метку
  var mapPin = document.querySelectorAll('.map__pin:not(.map__pin--main)');

  for (var i = 0; i < mapPin.length; i++) {
    mapPin[i].addEventListener('click', mapPinClickHandler);
  }
};

// переводит страницу в активное состояние по клику
mainPin.addEventListener('click', changeToActiveState);

// // переводит страницу в активное состояние по нажатию на ENTER
// mainPin.addEventListener('keydown', mainPinKeydownHandler);
//
// var mainPinKeydownHandler = function(evt) {
//   mainPin.removeEventListener('keydown', mainPinKeydownHandler);
//   if (evt.keyCode === ENTER_KEYCODE) {
//     changeToActiveState();
//   }
// };

var mapPinClickHandler = function(evt) {
  var target = evt.currentTarget;
  var offer = target.nextSibling;
  var coords = offer.querySelector('.popup__text--address');

  // добавляет координаты в поле адреса
  address.setAttribute('value', coords.textContent);

  hideShownOffers();

  offer.classList.remove('hidden');
  closePopup(offer);
};

// функция закрытия объявления
var closePopup = function (popup) {
  var close = popup.querySelector('.popup__close');

  close.addEventListener('click', function() {
    popup.classList.add('hidden');
  });

  close.addEventListener('keydown', function(evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      popup.classList.add('hidden');
    }
  });
};

var hideShownOffers = function() {
  var mapCard = document.querySelectorAll('.map__card');

  // скрывает показанные ранее карточки
  for (var j = 0; j < mapCard.length; j++) {
    if (!mapCard[j].classList.contains('hidden')) {
      mapCard[j].classList.add('hidden');
    }
  }
};

var showPinsAndOffers = function () {
  // отрисовывает метки и объявления на странице
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < OFFERS_QUANTITY; j++) {
    fragment.appendChild(renderPin(offers[j]));
    fragment.appendChild(renderOffer(offers[j]));
  }

  similarPinList.appendChild(fragment);

  var filters = similarOfferList.querySelector('.map__filters-container');
  similarOfferList.insertBefore(fragment, filters);
};

// document.addEventListener('keydown', function(evt) {
//   if (evt.keyCode === ESC_KEYCODE) {
//     mapCard.classList.add('hidden');
//   }
// });

var offerTitleInput = document.querySelector('#title');

offerTitleInput.addEventListener('invalid', function(evt) {
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
var roomsNumberInput = document.querySelector('#room_number');
var guestsNumberInput = document.querySelector('#capacity');
var homeTypeInput = document.querySelector('#type');
var priceInput = document.querySelector('#price');

form.addEventListener('submit', function() {
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


homeTypeInput.addEventListener('change', function() {
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
