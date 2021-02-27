$(document).ready(function() {



    // Форматирование даты
    let formatDate = function () {
        let date = new Date();
        let dd = date.getDate();
        if (dd < 10) dd = '0' + dd;

        let mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;

        let yyyy = date.getFullYear();
        return dd + '.' + mm + '.' + yyyy;
    };

    // Вывод количества изображений и даты
    let showImagesAndDate = function () {
        let imageLength = document.getElementById('gallery-wrapper').getElementsByClassName('img').length;
        let h1 = document.createElement('h1');

        document.body.insertBefore(h1, document.getElementById('gallery-wrapper'));

        h1.innerHTML = 'В галереи всего ' + imageLength + ' изображений. <br> Cегодня ' + formatDate();
    };

    showImagesAndDate();

    // Показ изображения в полном размере
    (function () {
        $('.img').click(function() {
            let newHtml = $(this).parent().html();
            $('#wrapper').css('display','block');
            $('.close').css('display','block');
            $('#full-image').css('display','block').html(newHtml);
            $('#full-image > .delete').remove();
        });

        $('#wrapper').click(function() {
            $('#wrapper').css('display','none');
            $('.close').css('display','none');
            $('#full-image').css('display','none');
        });

        $('.close').click(function() {
            $('#wrapper').css('display','none');
            $('.close').css('display','none');
            $('#full-image').css('display','none');
        });
    })();

    // Удаление изображений из галереи
    $('.delete').click(function() {
        let item = $(this).siblings();
        item.css('visibility', 'hidden');
        $(this).css('visibility', 'hidden');

        let imageLength = document.getElementById('gallery-wrapper').getElementsByClassName('img').length;
        let image = $(this).parent();
        // document.getElementById('gallery-wrapper').getElementsByClassName('img');
        let images = [];

        images.push(image);
        let i;
        for (i = 0; i < images.length; i++) {
            let currentImage = 'image'+(i+1)+'';
            localStorage.setItem(currentImage, item);
            console.log(currentImage);
        }
    });

    // Восстановление изображений в галерею
    $('.restore').click(function() {
        $('*').css('visibility', 'visible');
    });

});