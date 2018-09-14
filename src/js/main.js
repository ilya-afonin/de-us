
// Подключение библиотек из node_modules

// import 'jquery';
//require('jquery');

$(document).ready(function () {

    //mera();

    headerScroll();
    headerMobile();
    hSlider();
    cSlider();
    formValidate();

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

function cSlider() {

    if ($('.clients-slider').length > 0) {

        var slider = $('.c-slider__scene');

        slider.each(function () {

            $(this).owlCarousel({
                items: 16,
                loop: true,
                nav: false,
                dots: true
            });
        });
    }
}

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

function formValidate() {

    if ($('#callback').length > 0) {

        var form = $('#callback');

        form.validate({
            errorElement: 'span',
            errorClass: 'input-error',

            submitHandler: function () {

                $.when(
                    $('.popup').not('#result').removeClass('popup--visible')
                ).done(function (x) {

                    $('#result').addClass('popup--visible')
                });
            }
        });

        $(form).find('.validate__EMAIL').rules('add', {

            email: true,
            required: true,

            messages: {
                required: 'Введите email',
                email: 'Некорректный email'
            }
        });

        $(form).find('.validate__NAME').rules('add', {

            required: true,

            messages: {
                required: 'Заполните поле',
            }
        });

        $(form).find('.validate__PHONE').rules('add', {

            required: true,

            messages: {
                required: 'Заполните поле',
            }
        });

        $(form).find('.validate__CHECKBOX').rules('add', {

            required: true,

            messages: {
                required: 'Подтвердите согласие на обработку данных',
            }
        });
    }
}