(function () {
    let filterName = '';
    let filters = {
        'grayscale': {
            'minValue': 0,
            'maxValue': 1,
            'units': ''
        },
        'sepia': {
            'minValue': 0,
            'maxValue': 1,
            'units': ''
        },
        'invert': {
            'minValue': 0,
            'maxValue': 100,
            'units': '%'
        },
        'blur': {
            'minValue': 0,
            'maxValue': 3,
            'units': 'px'
        },
        'brightness': {
            'minValue': 1,
            'maxValue': 3,
            'units': ''
        },
    };
    let filtersName = ['chrome', 'sepia', 'marvin', 'phobos', 'heat', 'none'];
    let uploadForm = document.querySelector('.upload-form');
    let filtersList = document.querySelectorAll('[id^="upload-effect"]');
    let effectLevelSlider = document.querySelector('.upload-effect-level');
    let effectLevelPin = effectLevelSlider.querySelector('.upload-effect-level-pin');
    let effectLevelVal = effectLevelSlider.querySelector('.upload-effect-level-val');
    let effectLevelLine = effectLevelSlider.querySelector('.upload-effect-level-line');
    let uploadImagePreview = uploadForm.querySelector('.effect-image-preview');

    function setFilter(filterName, percentValue) {
        let filterSettings = filters[filterName];
        let filterValue = percentValue * (filterSettings.maxValue - filterSettings.minValue) /
            effectLevelLine.clientWidth + filterSettings.minValue;

        uploadImagePreview.style.filter = `${filterName}(${filterValue}${filterSettings.units})`;
    }

    function effectLevelChange() {
        let filterLevelPercent = parseInt( getComputedStyle(effectLevelPin)['left'] );

        switch (filterName) {
            case 'chrome': {
                setFilter('grayscale', filterLevelPercent);
                break;
            }
            case 'sepia': {
                setFilter('sepia', filterLevelPercent);
                break;
            }
            case 'marvin': {
                setFilter('invert', filterLevelPercent);
                break;
            }
            case 'phobos': {
                setFilter('blur', filterLevelPercent);
                break;
            }
            case 'heat': {
                setFilter('brightness', filterLevelPercent,);
                break;
            }
            default: {
                uploadImagePreview.style.filter = '';
            }
        }
    }

    function addFilterClass(radioBtn, filter) {
        uploadImagePreview.style.filter = '';

        let regexp = RegExp(`effect-(${filtersName.join('|')})`, 'gi');

        if ( !uploadImagePreview.className.match(regexp) ) {
            uploadImagePreview.classList.add(`effect-${filter}`);
            return;
        }

        uploadImagePreview.className = uploadImagePreview.className.replace( regexp , `effect-${filter}`);
    }

    function resetEffectLevel() {
        const DEFAULT_EFFECT_LEVEL = '100%';

        effectLevelPin.style.left = DEFAULT_EFFECT_LEVEL;
        effectLevelVal.style.width = DEFAULT_EFFECT_LEVEL;
    }

    function resetEffect() {
        uploadImagePreview.className = uploadImagePreview.className.replace
        ( /effect-(?!image-preview)\w*/ , '');
        resetEffectLevel();
    }

    function onFilterChange(evt) {
        let radioBtn = evt.target;
        filterName = radioBtn.value;

        if (filterName === 'none') {
            effectLevelSlider.classList.add('hidden');
        } else {
            effectLevelSlider.classList.remove('hidden');
        }

        resetEffectLevel();
        addFilterClass(radioBtn, filterName);
    }

    filtersList.forEach(filter => (function () {
        filter.addEventListener('change', onFilterChange);
    })());

    window.filter = {
        effectLevelChange,
        resetEffectLevel: resetEffect
    }
})();
