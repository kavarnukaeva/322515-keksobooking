'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');

  var filterPins = {
    'housing-type': function (array, value, initialArray) {
      // показать изначальные метки
      if (value === 'any') {
        return initialArray.filter(function (elem) {
          return elem;
        });
      }

      return array.filter(function (elem) {
        return elem.offer.type === value;
      });
    },

    'housing-price': function (array, value, initialArray) {
      // показать изначальные метки
      if (value === 'any') {
        return initialArray.filter(function (item) {
          return item;
        });
      }

      return array.filter(function (elem) {
        if (value === 'middle') {
          return elem.offer.price >= 10000 && elem.offer.price <= 50000;
        } else if (value === 'low') {
          return elem.offer.price < 10000;
        }

        return elem.offer.price >= 50000;
      });
    },

    'housing-rooms': function (array, value, initialArray) {
      if (value === 'any') {
        return initialArray.filter(function (elem) {
          return elem;
        });
      }

      return array.filter(function (elem) {
        return elem.offer.rooms === parseInt(value, 10);
      });
    },

    'housing-guests': function (array, value, initialArray) {
      if (value === 'any') {
        return initialArray.filter(function (elem) {
          return elem;
        });
      }

      return array.filter(function (elem) {
        return elem.offer.guests === parseInt(value, 10);
      });
    },

    'housing-features': function (array, value) {
      return array.filter(function (elem) {
        return value.every(function (val) {
          return elem.offer.features.indexOf(val) !== -1;
        });
      });
    }
  };

  // функция удаления всех меток и объявлений
  var removeAll = function () {
    var allpins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    var alloffers = document.querySelectorAll('.map__card');

    allpins.forEach(function (elem) {
      elem.remove();
    });

    alloffers.forEach(function (elem) {
      elem.remove();
    });
  };

  // массив предоставляемых услуг
  var features = [];

  mapFilters.addEventListener('change', function (evt) {
    // проверяет, что клик прозошёл на фильтре
    if (evt.target.tagName === 'SELECT' || evt.target.tagName === 'INPUT') {
      // удаляет всё перед фильтрацией
      removeAll();

      // при выборе и отмене услуги
      if (evt.target.tagName === 'INPUT' && evt.target.checked) {
        features.push(evt.target.value);
      } else {
        var feature = evt.target.value;
        var featureIndex = features.indexOf(feature);
        features.splice(featureIndex, 1);
      }

      window.successHandler = function (data, baseData) {
        // фильтрует
        var arrayFiltered = evt.target.tagName === 'INPUT' ?
          filterPins[evt.target.parentNode.id](data, features) :
          filterPins[evt.target.id](data, evt.target.value, baseData);

        // отрисовывает метки и объявления на странице
        var fragment = document.createDocumentFragment();

        arrayFiltered.forEach(function (item) {
          // проверяет наличие ключа offer
          if (item.offer) {
            fragment.appendChild(window.renderPin(item));
            fragment.appendChild(window.renderOffer(item));
          }
        });

        window.similarPinList.appendChild(fragment);

        window.filters = window.similarOfferList.querySelector('.map__filters-container');
        window.similarOfferList.insertBefore(fragment, window.filters);

        // показ объявления при клике на метку
        window.mapPin = document.querySelectorAll('.map__pin:not(.map__pin--main)');

        [].forEach.call(window.mapPin, function (item) {
          item.addEventListener('click', window.mapPinClickHandler);
        });
      };

      window.successHandler(window.transferedData, window.initialData);
    }
  });
})();
