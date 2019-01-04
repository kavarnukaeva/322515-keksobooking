'use strict';

//создание данных

(function () {
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
  window.photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

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
  window.generateOffer = function (quantity) {
    var array = [];

    for (var i = 0; i < quantity; i++) {
      var x = Math.floor(Math.random() * (1200 - 1) + 1) - (window.constants.PIN_WIDTH / 2);
      var y = Math.floor(Math.random() * (630 - 130) + 130) - window.constants.PIN_HEIGHT;
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
})();
