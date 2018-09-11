
// Подключение библиотек из node_modules

// import 'jquery';
require('jquery');

$(document).ready(function () {

    //mera();

    headerScroll();
    headerMobile();

    /*mask();

    callbackFormValidate();

    popupFormValidate();

    questionsFormValidate();

    youtube();

    gallery();

    popup();

    fancy();

    nSlider();

    showMoreText();

    dsSlider();

    wSlider();

    scrollbar();

    tabs();

    faqItems();

    wowJs();



    fSlider();*/

});



function headerMobile() {

    if ($('.header').length > 0 ) {

        $('body').on('click', '.header__burger', function() {

            $('.header').toggleClass('header--mob');

            if ( (!($('.header').hasClass('header--custom'))) && (!($('.header').hasClass('header--fill'))) ) {

                $('.header').toggleClass('header--custom');
            }
        });
    }
}

function headerScroll() {

    $(window).on('scroll', function () {

        var scrolled = $(window).scrollTop();

        if (scrolled > 100) {

            $('.header').addClass('header--custom');

        } else {

            $('.header').removeClass('header--custom');
        }
    });
}