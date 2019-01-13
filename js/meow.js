'use strict';

(function () {
  var FILTER_HOUSING_PRICE = {
    low: 10000,
    high: 50000
  };
  var elementsMapFiltersFrom = document.querySelector('.map__filters');

  var compareType = function (dataType, filtersType) {
    return filtersType === 'any' || filtersType === dataType.toString();
  };

  var compareFeatures = function (dataFeatures, featuresCheckbox) {
    // создает массив features, если чекбокс выбран
    var listFeaturesValues = [];
    featuresCheckbox.forEach(function (feature) {
      listFeaturesValues.push(feature.value);
    });

    var isCheckedDataFeatures = function (feature) {
      return dataFeatures.indexOf(feature) > -1;
    };
    return listFeaturesValues.every(isCheckedDataFeatures);
  };

  var returnStringValueByPrice = function (offerPrice) {
    if (offerPrice < FILTER_HOUSING_PRICE.low) {
      return 'low';
    } else if (offerPrice >= FILTER_HOUSING_PRICE.high) {
      return 'high';
    }
    return 'middle';
  };

  window.onChangeFilter = function (listObjects, limitObjects) {
    window.pin.removePins();
    window.utils.closePopup();

    var valueHousingType = elementsMapFiltersFrom.querySelector('#housing-type').value;
    var valueHousingPrice = elementsMapFiltersFrom.querySelector('#housing-price').value;
    var valueHousingRooms = elementsMapFiltersFrom.querySelector('#housing-rooms').value;
    var valueHousingGuests = elementsMapFiltersFrom.querySelector('#housing-guests').value;
    var elementsCheckboxFeatures = elementsMapFiltersFrom.querySelector('#housing-features').
        querySelectorAll('input[type=checkbox]:checked');

    var filteredSimilarAds = listObjects.filter(function (it) {
      return compareType(it.offer.type, valueHousingType) &&
        compareType(returnStringValueByPrice(it.offer.price), valueHousingPrice) &&
        compareType(it.offer.rooms, valueHousingRooms) &&
        compareType(it.offer.guests, valueHousingGuests) &&
        compareFeatures(it.offer.features, elementsCheckboxFeatures);
    });
    limitObjects = window.utils.trimData(filteredSimilarAds, window.constants.other.COUNT_RENDER_PINS);
    window.pin.renderPins(limitObjects);
  };
})();
