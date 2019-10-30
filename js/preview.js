(function () {
    let uploadForm = document.querySelector('.upload-form');
    let uploadInput = uploadForm.querySelector('.upload-input');
    let uploadFormCancelBtn = uploadForm.querySelector('.upload-form-cancel');
    let uploadOverlay = uploadForm.querySelector('.upload-overlay');
    let effectImages = uploadForm.querySelectorAll('.upload-effect-preview');

    function showUploadOverlay(files) {
        uploadOverlay.classList.remove('hidden');

        let file = files[0];
        if (!file.type.startsWith('image/')){ return }
        let uploadImage = uploadOverlay.querySelector('.effect-image-preview');
        uploadImage.file = file;

        let reader = new FileReader();
        reader.onload = (function(aImg) {
            return function(e) {
                aImg.src = e.target.result;
                showEffectImages(e.target.result);
            };
        })(uploadImage);
        reader.readAsDataURL(file);
    }

    function onUploadInputChange(evt) {
        let inputValue = evt.target.files;

        showUploadOverlay(inputValue);

        document.addEventListener('keydown', function (evt) {
            if (evt.keyCode === 27) {
                hideUploadOverlay();
            }
        })
    }

    function showEffectImages(bgImg) {
        effectImages.forEach(img => img.style.backgroundImage = `url(${bgImg})`);
    }

    function hideUploadOverlay() {
        uploadOverlay.classList.add('hidden');
        window.pictureScale.resetScale();
        window.filter.resetEffectLevel();
        uploadForm.reset();

        document.removeEventListener('keydown', hideUploadOverlay);
    }

    uploadInput.addEventListener('change', onUploadInputChange);
    uploadFormCancelBtn.addEventListener('click', function (evt) {
        hideUploadOverlay();
    });
})();
