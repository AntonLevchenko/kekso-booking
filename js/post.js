(function () {
    let commentTemplate = document.querySelector('#picture-template')
        .content
        .querySelector('.social__comment');
    let commentsContainer = document.querySelector('.social__comments');
    let galleryOverlay = document.querySelector('.gallery-overlay');
    let galleryCloser = document.querySelector('.gallery-overlay-close');

    function renderPictureComment(comment) {
        let commentElem = commentTemplate.cloneNode(true);

        commentElem.querySelector('.social__picture').src = `img/avatar-${window.utils.generateRandomInt(1, 6)}.svg`;
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

    window.pictures.picturesContainer.addEventListener('click', function (evt) {
        evt.preventDefault();

        let target = evt.target.closest('.picture');
        if ( !target.classList.contains('picture') ) return;
        let id = target.dataset.id;
        let picture = window.data.picturesArr.find(elem => elem.id === id);

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
})();
