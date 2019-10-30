(function () {
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
    let picturesArr = [];

    function generateCommentsArr(quantity) {
        let pictureComments = [];

        for (let i = 0; i < quantity; i++) {
            pictureComments.push( comments[ window.utils.generateRandomInt(0, comments.length -1) ] );
        }

        return pictureComments;
    }

    function generatePicture(i) {
        return {
            id: window.utils.generateId(),
            url: `photos/${i + 1}.jpg`,
            likes: window.utils.generateRandomInt(15, 200),
            comments: generateCommentsArr(2),
            description: descriptions[ window.utils.generateRandomInt(0, descriptions.length -1) ],
        }
    }

    function generatePicturesArr() {
        for (let i = 0; i < 26; i++) {
            picturesArr.push(generatePicture(i));
        }
    }

    generatePicturesArr();

    window.data = {
        picturesArr
    }
})();
