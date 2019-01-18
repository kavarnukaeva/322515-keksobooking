'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarContainerElement = document.querySelector('.ad-form-header__preview');
  var avatarFileChooser = document.querySelector('.ad-form__field input[type=file]');
  var housePhotoFileChooser = document.querySelector('.ad-form__upload input[type=file]');

  window.uploadFile = {
    avatar: document.querySelector('.ad-form-header__preview img'),
    housePhoto: document.querySelector('.ad-form__photo')
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
          if (el.hasChildNodes()) {
            el.querySelector('img').src = reader.result;
          } else {
            var newImg = document.createElement('img');
            newImg.src = reader.result;
            el.appendChild(newImg);
          }
        });

        reader.readAsDataURL(file);
      }
    });
  };

  uploadFile(avatarFileChooser, avatarContainerElement);
  uploadFile(housePhotoFileChooser, window.uploadFile.housePhoto);
})();
