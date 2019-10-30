(function () {
    let uploadForm = document.querySelector('.upload-form');
    let uploadScaleControls = document.querySelector('.upload-resize-controls');
    let scaleInput = uploadScaleControls.querySelector('.upload-resize-controls-value');
    let uploadImagePreview = uploadForm.querySelector('.effect-image-preview');

    function scaleImg(target) {
        const MIN_SCALE_LEVEL = 10;
        let scaleValue = parseInt(scaleInput.value) + +target.value;

        scaleValue = (scaleValue < MIN_SCALE_LEVEL) ? MIN_SCALE_LEVEL : scaleValue;

        scaleInput.value = scaleValue + '%';
        uploadImagePreview.style.transform = `scale(${scaleValue / 100})`;
    }

    function resetScale() {
        scaleInput.value = '100%';
        uploadImagePreview.style.transform = `scale(1)`;
    }

    uploadScaleControls.addEventListener('click', function (evt) {
        let target = evt.target;

        if ( !target.classList.contains('upload-resize-controls-button') ) return;

        scaleImg(target);
    });

    window.pictureScale = {
        resetScale
    }
})();
