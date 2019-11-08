(function () {
    let commentTemplate = document.querySelector('#picture-template')
        .content
        .querySelector('.social__comment');
    let commentsContainer = document.querySelector('.social__comments');
    let galleryOverlay = document.querySelector('.gallery-overlay');
    let galleryCloser = document.querySelector('.gallery-overlay-close');

    function renderPictureComment(comment) {
        let commentElem = commentTemplate.cloneNode(true);

        commentElem.querySelector('.social__picture').src = comment.avatar;
        commentElem.querySelector('.social__text').textContent = comment.message;

        return commentElem;
    }

    function renderPictureComments(comments) {
        commentsContainer.innerHTML = '';

        for (let comment of comments) {
            commentsContainer.append(renderPictureComment(comment));
        }
    }

    function showPost(picture) {
        galleryOverlay.classList.remove('hidden');
        galleryOverlay.querySelector('.gallery-overlay-image').src = picture.url;
        galleryOverlay.querySelector('.likes-count').textContent = picture.likes;
        galleryOverlay.querySelector('.comments-count').textContent = picture.comments.length;

        renderPictureComments(picture.comments);

        document.body.classList.add('overflow-hidden');
        document.addEventListener('keydown', onEscKeyDown);
    }

    function onEscKeyDown(evt) {
        if (evt.keyCode === window.utils.keyCodes.ESC_KEY_CODE) {
            hidePost();
        }
    }

    function hidePost() {
        galleryOverlay.classList.add('hidden');

        document.body.classList.remove('overflow-hidden');
        document.removeEventListener('keydown', onEscKeyDown);
    }

    window.pictures.picturesContainer.addEventListener('click', function (evt) {
        evt.preventDefault();

        let target = evt.target.closest('.picture');
        if ( !target.classList.contains('picture') ) return;
        let id = target.dataset.id;
        let picture = window.pictures.getPictures().find(elem => elem.id === id);

        showPost(picture);
    });

    galleryCloser.addEventListener('click', function (evt) {
        evt.preventDefault();

        hidePost();
    });

    galleryOverlay.addEventListener('click', function (evt) {
        evt.preventDefault();

        let target = evt.target;
        if (target.closest('.gallery-overlay-preview')) return;

        hidePost();
    });
})();
