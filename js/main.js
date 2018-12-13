'use strict';

var OFFERS_QUANTITY = 8;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

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

//Функция перемешивания массива
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

//Функция генерации случайных данных
var getRandomValue = function (array) {
  var randomValue = Math.floor(Math.random() * array.length);
  return randomValue;
};

//Функция создания массива из 8 объектов
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
        // перемешиваю массив и вынимаю случайное число из его копии
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

document.querySelector('.map').classList.remove('map--faded');

var renderPin = function (array) {
  var pinElement = similarPinTemplate.cloneNode(true);

  pinElement.setAttribute('style', `left: ${array.location.x}px; top: ${array.location.y}px`);
  pinElement.querySelector('img').setAttribute('alt', `${array.offer.title}`);
  pinElement.querySelector('img').setAttribute('src', `${array.author.avatar}`);

  return pinElement;
};

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

    // ищу и наполняю все созданные элементы
    var images = popupPhotos.querySelectorAll('img');
    images[i].setAttribute('src', `${array.offer.photos[i]}`);
  }

  return offerElement;
};

var fragment = document.createDocumentFragment();
for (var j = 0; j < OFFERS_QUANTITY; j++) {
  fragment.appendChild(renderPin(offers[j]));
  fragment.appendChild(renderOffer(offers[j]));
}

similarPinList.appendChild(fragment);

var filters = similarOfferList.querySelector('.map__filters-container');
similarOfferList.insertBefore(fragment, filters);
