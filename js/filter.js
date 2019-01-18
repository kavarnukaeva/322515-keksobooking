'use strict';

(function () {
  // функция удаления всех меток и объявлений
  var removeAll = function () {
    var allPinsElements = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    var allOffersElements = document.querySelectorAll('.map__card');

    window.utils.removeElements(allPinsElements);
    window.utils.removeElements(allOffersElements);
  };

  var compareValues = function (dataValue, filterValue) {
    return filterValue === window.Constants.ANY_VALUE || filterValue === dataValue.toString();
  };

  var compareFeaturesElements = function (dataFeatures, featuresCheckboxElements) {
    var chosenFeaturesElements = [];

    featuresCheckboxElements.forEach(function (feature) {
      chosenFeaturesElements.push(feature.value);
    });

    var isChosenDataFeatures = function (feature) {
      return dataFeatures.indexOf(feature) > -1;
    };

    return chosenFeaturesElements.every(isChosenDataFeatures);
  };

  var getPriceValue = function (offerPrice) {
    if (offerPrice < window.Constants.FILTER_HOUSING_PRICE_TYPE.low) {
      return window.Constants.FILTER_HOUSING_PRICE.low;
    } else if (offerPrice >= window.Constants.FILTER_HOUSING_PRICE_TYPE.high) {
      return window.Constants.FILTER_HOUSING_PRICE.high;
    }
    return window.Constants.FILTER_HOUSING_PRICE.middle;
  };

  window.filter = {
    mapFiltersElements: document.querySelector('.map__filters'),
    filterData: function (data, cropDataToRender) {
      // очищает контейнер
      removeAll();

      var housingTypeValue = window.filter.mapFiltersElements.querySelector('#housing-type').value;
      var housingPriceValue = window.filter.mapFiltersElements.querySelector('#housing-price').value;
      var housingRoomsValue = window.filter.mapFiltersElements.querySelector('#housing-rooms').value;
      var housingGuestsValue = window.filter.mapFiltersElements.querySelector('#housing-guests').value;
      var checkedFeaturesElements = window.filter.mapFiltersElements.querySelectorAll('input:checked');

      var filteredData = data.filter(function (it) {
        return compareValues(it.offer.type, housingTypeValue) &&
          compareValues(getPriceValue(it.offer.price), housingPriceValue) &&
          compareValues(it.offer.rooms, housingRoomsValue) &&
          compareValues(it.offer.guests, housingGuestsValue) &&
          compareFeaturesElements(it.offer.features, checkedFeaturesElements);
      });

      // если длина данных больше необходимого
      if (filteredData.length > window.Constants.PINS_TO_RENDER_QUANTITY) {
        cropDataToRender = window.utils.cropData(filteredData, window.Constants.PINS_TO_RENDER_QUANTITY);
      }

      window.map.renderPins(filteredData, cropDataToRender);
    }
  };
})();
