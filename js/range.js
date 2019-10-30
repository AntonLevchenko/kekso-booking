(function () {
    let filterRange = document.querySelector('.upload-effect-level');
    let rangePin = filterRange.querySelector('.upload-effect-level-pin');
    let rangeLine = filterRange.querySelector('.upload-effect-level-line');
    let rangeVal = filterRange.querySelector('.upload-effect-level-val');

    rangePin.addEventListener('mousedown', function (evt) {
        evt.preventDefault();

        let shift = evt.clientX - rangePin.getBoundingClientRect().left;

        function onMouseMove(moveEvt) {
            let moveCoordsX = moveEvt.clientX - shift - rangeLine.getBoundingClientRect().left + rangePin.offsetWidth / 2;

            if (moveCoordsX < 0) {
                moveCoordsX = 0;
            }

            if (moveCoordsX > rangeLine.offsetWidth) {
                moveCoordsX = rangeLine.offsetWidth;
            }

            rangePin.style.left = moveCoordsX + 'px';
            rangeVal.style.width = moveCoordsX + 'px';

            window.filter.effectLevelChange();
        }

        function onMouseUp(upEvt) {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });
})();
