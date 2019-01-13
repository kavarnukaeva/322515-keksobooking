'use strict';

(function () {
  window.mapFilters = document.querySelector('.map__filters');

  // селекты
  var compareValues = function (dataValue, filterValue) {
    if (typeof parseInt(dataValue, 10) === 'number') {
      if (parseInt(dataValue, 10) >= window.Constants.FILTER_HOUSING_PRICE.low &&
          parseInt(dataValue, 10) <= window.Constants.FILTER_HOUSING_PRICE.high) {
        return 'middle';
      } else if (parseInt(dataValue, 10) < window.Constants.FILTER_HOUSING_PRICE.low) {
        return 'low';
      }

      return 'high';
    }

    return filterValue === 'any' || filterValue === dataValue.toString();
  };

  // чекбоксы
  var compareFeatures = function (dataFeatures, featuresCheckbox) {
    var arrayFeaturesChosen = [];

    featuresCheckbox.forEach(function (feature) {
      arrayFeaturesChosen.push(feature.value);
    });

    var isChosenDataFeatures = function (feature) {
      return dataFeatures.indexOf(feature) > -1;
    };

    return arrayFeaturesChosen.every(isChosenDataFeatures);
  };

  window.filterPins = function (data) {
    // очищает контейнер
    removeAll();

    var housingTypeValue = window.mapFilters.querySelector('#housing-type').value;
    var housingPriceValue = window.mapFilters.querySelector('#housing-price').value;
    var housingRoomsValue = window.mapFilters.querySelector('#housing-rooms').value;
    var housingGuestsValue = window.mapFilters.querySelector('#housing-guests').value;
    var chosenFeatures = window.mapFilters.querySelectorAll('input:checked');

    var filteredPins = data.filter(function (it) {
      return compareValues(it.offer.type, housingTypeValue) &&
        compareValues(it.offer.price, housingPriceValue) &&
        compareValues(it.offer.rooms, housingRoomsValue) &&
        compareValues(it.offer.guests, housingGuestsValue) &&
        compareFeatures(it.offer.features, chosenFeatures);
    });

    window.successHandler(filteredPins);
  };

  // функция удаления всех меток и объявлений
  var removeAll = function () {
    var allpins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    var alloffers = document.querySelectorAll('.map__card');

    window.utils.removeElements(allpins);
    window.utils.removeElements(alloffers);
  };
})();
