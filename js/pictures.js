(function () {
    let pictureCard = document.querySelector('#picture-template')
        .content
        .querySelector('.picture');
    let picturesContainer = document.querySelector('.pictures');
    let picturesList = [];

    function renderPicture(pictureObj) {
        let pictureElem = pictureCard.cloneNode(true);

        pictureElem.setAttribute('data-id', pictureObj.id);
        pictureElem.querySelector('img').src = pictureObj.url;
        pictureElem.querySelector('.picture-likes').textContent = pictureObj.likes;
        pictureElem.querySelector('.picture-comments').textContent = pictureObj.comments.length;

        return pictureElem;
    }

    function renderPictureList(responseArr) {
        picturesList = window.utils.addIdToElems(responseArr);

        for (let picture of picturesList) {
            picturesContainer.append( renderPicture(picture) );
        }
    }

    function getPictures() {
        return picturesList;
    }

    window.backend.load(renderPictureList);

    window.pictures = {
        picturesContainer,
        getPictures
    }
})();
