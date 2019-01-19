'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarContainerElement = document.querySelector('.ad-form-header__preview');
  var avatarFileChooserElement = document.querySelector('.ad-form__field input[type=file]');
  var housePhotoFileChooserElement = document.querySelector('.ad-form__upload input[type=file]');

  window.uploadFile = {
    avatarElement: document.querySelector('.ad-form-header__preview img'),
    housePhotoElement: document.querySelector('.ad-form__photo')
  };

  var uploadFile = function (chooser, el) {
    chooser.addEventListener('change', function () {
      var file = chooser.files[0];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          if (el.hasChildNodes() && !el.classList.contains('ad-form__photo')) {
            el.querySelector('img').src = reader.result;
          } else {
            var parentElement = el.parentNode;
            var newImgElement = document.createElement('img');
            var newDivElement = document.createElement('div');
            newDivElement.classList.add('ad-form__photo');
            newImgElement.src = reader.result;

            if (!el.children.length) {
              el.appendChild(newImgElement);
            } else {
              newDivElement.appendChild(newImgElement);
              parentElement.appendChild(newDivElement);
            }
          }
        });

        reader.readAsDataURL(file);
      }
    });
  };

  uploadFile(avatarFileChooserElement, avatarContainerElement);
  uploadFile(housePhotoFileChooserElement, window.uploadFile.housePhotoElement);
})();
