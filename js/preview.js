(function () {
    const FILE_TYPES = ['gif', 'jpeg', 'jpg', 'png'];
    let uploadForm = document.querySelector('.upload-form');
    let uploadInput = uploadForm.querySelector('.upload-input');
    let imagePreview = uploadForm.querySelector('.effect-image-preview');
    let uploadFormCancelBtn = uploadForm.querySelector('.upload-form-cancel');
    let uploadOverlay = uploadForm.querySelector('.upload-overlay');
    let effectImages = uploadForm.querySelectorAll('.upload-effect-preview');

    function filterByCorrectType(file) {
        return FILE_TYPES.some(type => file.name.toLowerCase().endsWith(type));
    }

    function uploadFile(chooser, func) {
        let files = Array.from(chooser.files).filter(filterByCorrectType);

        if (!files.length) return;

        files.forEach(file => {
           let reader = new FileReader();

           reader.addEventListener('load', function (evt) {
               func(evt.target.result);
           });

           reader.readAsDataURL(file);
        });
    }

    function showUploadOverlay(src) {
        imagePreview.src = src;
        showEffectImages(src);

        uploadOverlay.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
        document.addEventListener('keydown', onEscKeyDown);
    }

    function onEscKeyDown(evt) {
        if (evt.keyCode === window.utils.keyCodes.ESC_KEY_CODE) {
            hideUploadOverlay();
        }
    }

    function showEffectImages(src) {
        effectImages.forEach(img => img.style.backgroundImage = `url(${src})`);
    }

    function hideUploadOverlay() {
        uploadOverlay.classList.add('hidden');
        window.pictureScale.resetScale();
        window.filter.resetEffectLevel();
        uploadForm.reset();

        document.body.classList.remove('overflow-hidden');

        document.removeEventListener('keydown', hideUploadOverlay);
        document.removeEventListener('keydown', onEscKeyDown);
    }

    uploadInput.addEventListener('change', function (evt) {
        uploadFile(uploadInput, showUploadOverlay);
    });
    uploadFormCancelBtn.addEventListener('click', function (evt) {
        hideUploadOverlay();
    });

    window.preview = {
        hideUploadOverlay
    };
})();
