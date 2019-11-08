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

    function renderPictureList(picturesArr) {
        picturesContainer.innerHTML = '';

        for (let picture of picturesArr) {
            picturesContainer.append( renderPicture(picture) );
        }
    }

    function onLoadPictures(responseArr) {
        picturesList = window.utils.addIdToElems(responseArr);
        renderPictureList(picturesList);

        window.dataFilters.showFilters();
    }

    function getPictures() {
        return picturesList;
    }

    window.backend.load(onLoadPictures);

    window.pictures = {
        picturesContainer,
        renderPictureList,
        getPictures
    }
})();
