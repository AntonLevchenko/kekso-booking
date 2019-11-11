(function () {
    let commentTemplate = document.querySelector('#picture-template')
        .content
        .querySelector('.social__comment');
    let commentsContainer = document.querySelector('.social__comments');
    let galleryOverlay = document.querySelector('.gallery-overlay');
    let galleryCloser = document.querySelector('.gallery-overlay-close');
    let loadMoreBtn = document.querySelector('.btn-load-more');
    let postComments = [];
    let commentsLengths = 0;
    let commentCounter = 0;
    let LOAD_COMMENT_STEP = 5;
    let commentsLoaded = document.querySelector('.comments-loaded');

    function renderPictureComment(comment) {
        let commentElem = commentTemplate.cloneNode(true);

        commentElem.querySelector('.social__picture').src = comment.avatar;
        commentElem.querySelector('.social__text').textContent = comment.message;

        return commentElem;
    }

    function onLoadComments() {
        commentCounter += LOAD_COMMENT_STEP;

        if (commentCounter > commentsLengths) {
            loadMoreBtn.classList.add('hidden');
            commentCounter = commentsLengths;
        }

        commentsLoaded.textContent = commentCounter;

        renderPictureCommentList(postComments.splice(0, LOAD_COMMENT_STEP));
    }

    function renderPictureCommentList(comments) {
        for (let comment of comments) {
            commentsContainer.append(renderPictureComment(comment));
        }
    }

    function resetPostPreview() {
        commentsContainer.innerHTML = '';
    }

    function showPost(picture) {
        resetPostPreview();

        galleryOverlay.classList.remove('hidden');
        galleryOverlay.querySelector('.gallery-overlay-image').src = picture.url;
        galleryOverlay.querySelector('.likes-count').textContent = picture.likes;

        commentsLengths = picture.comments.length;
        galleryOverlay.querySelector('.comments-count').textContent = commentsLengths;
        galleryOverlay.querySelector('.comments-counter').textContent = commentsLengths;

        postComments = picture.comments.slice();
        onLoadComments();

        loadMoreBtn.addEventListener('click', onLoadComments);
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

        loadMoreBtn.classList.remove('hidden');
        commentCounter = 0;

        loadMoreBtn.removeEventListener('click', onLoadComments);
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
