
// Подключение библиотек из node_modules

// import 'jquery';
require('jquery');

$(document).ready(function () {

    //mera();

    headerScroll();
    headerMobile();
    hSlider();
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

function hSlider() {

    if ($('.h-slider').length > 0) {

        var slider = $('.h-slider__scene');

        slider.each(function () {

            var navigation = $(this).parents('.s-section').find('.s-section__nav');

            var owl = $(this);

            owl.owlCarousel({
                items: 1,
                loop: true,
                animateIn: 'fadeIn',
                animateOut: 'fadeOut',
                nav: true,
                dots: false,
                navContainer: navigation,
                navText: '',
                navElement: 'a',
                navContainerClass: 's-arrows',
                navClass: ['s-arrows__arrow s-arrows__arrow--prev', 's-arrows__arrow s-arrows__arrow--next'],
                responsive : {
                    0 : {
                        mouseDrag: true,
                    },
                    1024 : {
                        mouseDrag: false,
                    }
                }
            });

            $('body').on('click', '.a-slider__bg', function () {

                owl.trigger('next.owl.carousel');
            });
        });
    }
}

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