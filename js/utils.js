(function () {
    function generateRandomInt(min, max) {
        return Math.floor(min + Math.random() * (max + 1 - min));
    }

    function generateId() {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,c=>(c^crypto.getRandomValues(new Uint8Array(1))[0]&15 >> c/4).toString(16));
    }

    window.utils = {
        generateRandomInt,
        generateId
    }
})();
