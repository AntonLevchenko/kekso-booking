(function () {
    const HASHTAG_MAX_LENGTH = 20;
    const HASHTAGS_MAX_LENGTH = 5;
    const DESCRIPTION_MAX_LENGTH = 140;

    let uploadForm = document.querySelector('.upload-form');
    let hashtagsInput = uploadForm.querySelector('.upload-form-hashtags');
    let descriptionTextarea = uploadForm.querySelector('.upload-form-description');

    function checkRepeatHashtag(hashtags) {

        for (let hashtag of hashtags) {
            if (hashtags.indexOf(hashtag) !== hashtags.lastIndexOf(hashtag)) {
                return true;
            }
        }

        return false;
    }

    function hashtagsValidation(hashtags) {
        if (hashtags == '') {
            hashtagsInput.setCustomValidity('');
            return;
        }

        if ( checkRepeatHashtag(hashtags) ) {
            hashtagsInput.setCustomValidity('Нельзя повторять хєштеги');
            return;
        }

        if (hashtags.length > HASHTAGS_MAX_LENGTH) {
            hashtagsInput.setCustomValidity(`Можно добавить только ${HASHTAGS_MAX_LENGTH} хэштегов`);
            return;
        }

        for (let hashtag of hashtags) {
            if (hashtag.charAt(0) !== '#') {
                hashtagsInput.setCustomValidity('Хэштег должен начинаться с символа #');
            } else if (hashtag.length === 1) {
                hashtagsInput.setCustomValidity('Хэштег должен содержать не только символ #');
            } else if (hashtag.length > HASHTAG_MAX_LENGTH) {
                hashtagsInput.setCustomValidity(`Хэштег должен быть меньше ${HASHTAG_MAX_LENGTH} символов`);
            } else {
                hashtagsInput.setCustomValidity('');
            }
        }
    }

    function onHashtagsInput(evt) {
        let hashtags = evt.target.value.split(' ');

        hashtagsValidation(hashtags);
    }

    function onDescriptionInput(evt) {
        let descriptionText = evt.target.value;

        if (descriptionText.length > DESCRIPTION_MAX_LENGTH) {
            descriptionTextarea.setCustomValidity(`Максимально допустимое число символов в комментарии 
        ${DESCRIPTION_MAX_LENGTH}`);
        } else {
            descriptionTextarea.setCustomValidity('');
        }
    }

    function showError(errorMessage) {
        let notification = document.createElement('div');
        notification.classList.add('notification');
        notification.textContent = errorMessage;
        document.body.append(notification);

        setTimeout(() => {
            notification.remove();
        }, 5000);
    }

    function onSubmitForm(evt) {
        evt.preventDefault();

        window.backend.save(new FormData(uploadForm), window.preview.hideUploadOverlay, showError);
    }

    hashtagsInput.addEventListener('input', onHashtagsInput);
    hashtagsInput.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.utils.keyCodes.ESC_KEY_CODE) {
            evt.stopPropagation();
        }
    });

    descriptionTextarea.addEventListener('input', onDescriptionInput);
    descriptionTextarea.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.utils.keyCodes.ESC_KEY_CODE) {
            evt.stopPropagation();
        }
    });

    uploadForm.addEventListener('submit', onSubmitForm);
})();
