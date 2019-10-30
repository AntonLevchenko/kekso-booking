(function () {
    let pictureCard = document.querySelector('#picture-template')
        .content
        .querySelector('.picture');
    let picturesContainer = document.querySelector('.pictures');


    function renderPicture(pictureObj) {
        let pictureElem = pictureCard.cloneNode(true);

        pictureElem.setAttribute('data-id', pictureObj.id);
        pictureElem.querySelector('img').src = pictureObj.url;
        pictureElem.querySelector('.picture-likes').textContent = pictureObj.likes;
        pictureElem.querySelector('.picture-comments').textContent = pictureObj.comments.length;

        return pictureElem;
    }

    function renderPictureList() {
        for (let picture of window.data.picturesArr) {
            picturesContainer.append( renderPicture(picture) );
        }
    }

    renderPictureList();

    window.pictures = {
        picturesContainer
    }
})();
