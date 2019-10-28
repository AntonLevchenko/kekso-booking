const comments = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const descriptions = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
];

let pictures = [];
let pictureCard = document.querySelector('#picture-template')
                    .content
                    .querySelector('.picture');
let picturesContainer = document.querySelector('.pictures');
let commentTemplate = document.querySelector('#picture-template')
                    .content
                    .querySelector('.social__comment');
let commentsContainer = document.querySelector('.social__comments');
let galleryOverlay = document.querySelector('.gallery-overlay');
let galleryCloser = document.querySelector('.gallery-overlay-close');
let uploadInput = document.querySelector('.upload-input');
let uploadForm = document.querySelector('.upload-form');
let uploadOverlay = uploadForm.querySelector('.upload-overlay');
let uploadFormCancelBtn = uploadForm.querySelector('.upload-form-cancel');
let filtersList = uploadForm.querySelectorAll('[id^="upload-effect"]');
let uploadImagePreview = uploadForm.querySelector('.effect-image-preview');
let effectImages = uploadForm.querySelectorAll('.upload-effect-preview');
let effectLevelSlider = uploadForm.querySelector('.upload-effect-level');
let effectLevelLine = effectLevelSlider.querySelector('.upload-effect-level-line');
let effectLevelPin = effectLevelSlider.querySelector('.upload-effect-level-pin');
let uploadScaleControls = uploadForm.querySelector('.upload-resize-controls');
let scaleInput = uploadScaleControls.querySelector('.upload-resize-controls-value');
let hashtagsInput = uploadForm.querySelector('.upload-form-hashtags');
let descriptionTextarea = uploadForm.querySelector('.upload-form-description');
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

const HASHTAG_MAX_LENGTH = 20;
const HASHTAGS_MAX_LENGTH = 5;
const DESCRIPTION_MAX_LENGTH = 140;

function generateId() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,c=>(c^crypto.getRandomValues(new Uint8Array(1))[0]&15 >> c/4).toString(16));
}

function generateRandomInt(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
}

function generateCommentsArr(quantity) {
    let pictureComments = [];

    for (let i = 0; i < quantity; i++) {
        pictureComments.push( comments[ generateRandomInt(0, comments.length -1) ] );
    }

    return pictureComments;
}

function generatePicture(i) {
    return {
        id: generateId(),
        url: `photos/${i + 1}.jpg`,
        likes: generateRandomInt(15, 200),
        comments: generateCommentsArr(2),
        description: descriptions[ generateRandomInt(0, descriptions.length -1) ],
    }
}

function generatePicturesArr() {
    for (let i = 0; i < 26; i++) {
        pictures.push(generatePicture(i));
    }
}

function renderPicture(pictureObj) {
    let pictureElem = pictureCard.cloneNode(true);

    pictureElem.setAttribute('data-id', pictureObj.id);
    pictureElem.querySelector('img').src = pictureObj.url;
    pictureElem.querySelector('.picture-likes').textContent = pictureObj.likes;
    pictureElem.querySelector('.picture-comments').textContent = pictureObj.comments.length;

    return pictureElem;
}

function renderPictureList() {
    for (let picture of pictures) {
        picturesContainer.append( renderPicture(picture) );
    }
}

function renderPictureComment(comment) {
    let commentElem = commentTemplate.cloneNode(true);

    commentElem.querySelector('.social__picture').src = `img/avatar-${generateRandomInt(1, 6)}.svg`;
    commentElem.querySelector('.social__text').textContent = comment;

    return commentElem;
}

function renderPictureComments(picture) {
    commentsContainer.innerHTML = '';

    for (let comment of picture.comments) {
        commentsContainer.append(renderPictureComment(comment));
    }
}

function showPost(picture) {
    galleryOverlay.classList.remove('hidden');
    galleryOverlay.querySelector('.gallery-overlay-image').src = picture.url;
    galleryOverlay.querySelector('.likes-count').textContent = picture.likes;
    galleryOverlay.querySelector('.comments-count').textContent = picture.comments.length;

    renderPictureComments(picture);
}

function showEffectImages(bgImg) {
    effectImages.forEach(img => img.style.backgroundImage = `url(${bgImg})`);
}

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

function resetScale() {
    scaleInput.value = '100%';
    uploadImagePreview.style.transform = `scale(1)`;
}

function hideUploadOverlay() {
    uploadOverlay.classList.add('hidden');
    resetScale();
    uploadForm.reset();

    document.removeEventListener('keydown', hideUploadOverlay);
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

function addFilterClass(radioBtn, filter) {
    uploadImagePreview.style.filter = '';

    if ( !uploadImagePreview.className.match(/effect-(?!image-preview)\w*/) ) {
        uploadImagePreview.classList.add(`effect-${filter}`);
        return;
    }
    uploadImagePreview.className = uploadImagePreview.className.replace
    ( /effect-(?!image-preview)\w*/ , `effect-${filter}`);
}

function resetEffectLevel() {
    const DEFAULT_EFFECT_LEVEL = '100%';

    effectLevelPin.style.left = DEFAULT_EFFECT_LEVEL;
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

function scaleImg(target) {
    const MIN_SCALE_LEVEL = 10;
    let scaleValue = parseInt(scaleInput.value) + +target.value;

    scaleValue = (scaleValue < MIN_SCALE_LEVEL) ? MIN_SCALE_LEVEL : scaleValue;

    scaleInput.value = scaleValue + '%';
    uploadImagePreview.style.transform = `scale(${scaleValue / 100})`;
}

function setFilter(filterName, percentValue) {
    let filterSettings = filters[filterName];
    let filterValue = percentValue * (filterSettings.maxValue - filterSettings.minValue) /
        effectLevelLine.clientWidth + filterSettings.minValue;

    uploadImagePreview.style.filter = `${filterName}(${filterValue}${filterSettings.units})`;
}

function effectLevelChange() {
    let filterLevelPercent = parseInt(getComputedStyle(effectLevelPin)['left']);

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

function onEffectLevelChange(evt) {
    effectLevelChange();
}

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

generatePicturesArr();

renderPictureList();

picturesContainer.addEventListener('click', function (evt) {
    evt.preventDefault();

    let target = evt.target.closest('.picture');
    if ( !target.classList.contains('picture') ) return;
    let id = target.dataset.id;
    let picture = pictures.find(elem => elem.id === id);

    showPost(picture);
});

galleryCloser.addEventListener('click', function (evt) {
    evt.preventDefault();

    galleryOverlay.classList.add('hidden');
});

galleryOverlay.addEventListener('click', function (evt) {
    evt.preventDefault();

    let target = evt.target;

    if (target.closest('.gallery-overlay-preview')) return;
    galleryOverlay.classList.add('hidden');
});

uploadInput.addEventListener('change', onUploadInputChange);

uploadFormCancelBtn.addEventListener('click', function (evt) {
   hideUploadOverlay();
});

filtersList.forEach(filter => (function () {
    filter.addEventListener('change', onFilterChange);
})());

uploadScaleControls.addEventListener('click', function (evt) {
   let target = evt.target;

   if ( !target.classList.contains('upload-resize-controls-button') ) return;

   scaleImg(target);
});

effectLevelPin.addEventListener('mouseup', onEffectLevelChange);

hashtagsInput.addEventListener('input', onHashtagsInput);
hashtagsInput.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
        evt.stopPropagation();
    }
});

descriptionTextarea.addEventListener('input', onDescriptionInput);
descriptionTextarea.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
        evt.stopPropagation();
    }
});