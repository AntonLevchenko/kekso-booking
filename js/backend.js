(function () {
    let URL = 'https://js.dump.academy/kekstagram';

    function createXHR(url, method, onLoad, onError) {
        let xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.timeout = 5000;

        xhr.addEventListener('load', function (evt) {
            if (xhr.status === 200) {
                onLoad(xhr.response);
            } else {
                onError('Errors: ' + xhr.status + xhr.statusText);
            }
        });

        xhr.addEventListener('error', function (evt) {
            onError(xhr.status + xhr.statusText);
        });

        xhr.addEventListener('timeout', function (evt) {
           onError('Time is left');
        });

        xhr.open(method, url);

        return xhr;
    }

    function load(onLoad, onError) {
        createXHR(`${URL}/data`, 'GET', onLoad, onError).send();
    }

    function save(data, onLoad, onError) {
        createXHR(URL, 'POST', onLoad, onError).send(data);
    }

    window.backend = {
        load,
        save
    };
})();
