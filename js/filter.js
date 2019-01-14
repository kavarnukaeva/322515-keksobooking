'use strict';

(function () {
  window.mapFilters = document.querySelector('.map__filters');

  // функция удаления всех меток и объявлений
  var removeAll = function () {
    var allpins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    var alloffers = document.querySelectorAll('.map__card');

    window.utils.removeElements(allpins);
    window.utils.removeElements(alloffers);
  };

  var compareValues = function (dataValue, filterValue) {
    return filterValue === 'any' || filterValue === dataValue.toString();
  };

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

  var getPriceValue = function (offerPrice) {
    if (offerPrice < window.Constants.FILTER_HOUSING_PRICE.low) {
      return 'low';
    } else if (offerPrice >= window.Constants.FILTER_HOUSING_PRICE.high) {
      return 'high';
    }
    return 'middle';
  };

  window.filterData = function (data, cropDataToRender) {
    // очищает контейнер
    removeAll();

    var housingTypeValue = window.mapFilters.querySelector('#housing-type').value;
    var housingPriceValue = window.mapFilters.querySelector('#housing-price').value;
    var housingRoomsValue = window.mapFilters.querySelector('#housing-rooms').value;
    var housingGuestsValue = window.mapFilters.querySelector('#housing-guests').value;
    var chosenFeatures = window.mapFilters.querySelectorAll('input:checked');

    var filteredData = data.filter(function (it) {
      return compareValues(it.offer.type, housingTypeValue) &&
        compareValues(getPriceValue(it.offer.price), housingPriceValue) &&
        compareValues(it.offer.rooms, housingRoomsValue) &&
        compareValues(it.offer.guests, housingGuestsValue) &&
        compareFeatures(it.offer.features, chosenFeatures);
    });

    // если длина данных больше необходимого
    if (filteredData.length > window.Constants.PINS_TO_RENDER_QUANTITY) {
      cropDataToRender = window.utils.cropData(filteredData, window.Constants.PINS_TO_RENDER_QUANTITY);
    }

    window.renderPins(filteredData, cropDataToRender);
  };
})();
