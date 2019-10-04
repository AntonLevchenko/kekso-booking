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

generatePicturesArr();

renderPictureList();

picturesContainer.addEventListener('click', function (e) {
    e.preventDefault();

    let target = e.target.closest('.picture');
    if ( !target.classList.contains('picture') ) return;
    let id = target.dataset.id;
    let picture = pictures.find(elem => elem.id === id);

    showPost(picture);
});

galleryCloser.addEventListener('click', function (e) {
    e.preventDefault();

    galleryOverlay.classList.add('hidden');
});

galleryOverlay.addEventListener('click', function (e) {
    e.preventDefault();

    let target = e.target;

    if (target.closest('.gallery-overlay-preview')) return;
    galleryOverlay.classList.add('hidden');
});
