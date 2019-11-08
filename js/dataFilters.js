(function () {
    let filtersForm = document.querySelector('.filters');
    let pictures = [];
    let filteredPictures = [];
    let filterNameToFilter = {
        'recommend': resetFilters,
        'popular': showPopular,
        'discussed': showDiscussed,
        'random': showRandom
    };
    
    function resetFilters() {
        return pictures;
    }

    function showPopular(pictures) {
        return pictures.sort((left, right) => {
            return right.likes - left.likes;
        });
    }

    function showDiscussed(pictures) {
        return pictures.sort((left, right) => {
            return right.comments.length - left.comments.length;
        });
    }

    function showRandom(pictures) {
        return pictures.sort(function(){
            return Math.random() - 0.5;
        });
    }

    function showFilters() {
        filtersForm.classList.remove('hidden');
    }

    filtersForm.addEventListener('change', function (evt) {
        if (evt.target.type !== 'radio') return;

        pictures = window.pictures.getPictures().slice();
        let filterName = evt.target.value;

        filteredPictures = filterNameToFilter[filterName](pictures);

        window.pictures.renderPictureList(filteredPictures);
    });

    window.dataFilters = {
        showFilters
    }
})();
