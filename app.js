// new WOW().init();
import scripts from './threeScript.js';

$('.about__carousel').owlCarousel({
    loop: true,
    dots: true,
    lazyLoad: true,
    margin: 5,
    responsiveClass: true,
    autoplay: true,
    autoplayHoverPause: true,
    items: 1
});

$('.refer__carousel').owlCarousel({
    loop: true,
    dots: true,
    lazyLoad: true,
    margin: 35,
    responsiveClass: true,
    autoplay: true,
    autoplayHoverPause: true,
    dots: true,
    responsive: {
        0: {
            items: 2,
            nav: false,
            dots: true,
        },
        600: {
            items: 3,
            margin: 28,
            nav: false
        },
        1000: {
            items: 4,
            margin: 48,
            nav: false
        },
        1400: {
            items: 5
        }
    }
});

$('.news__carousel').owlCarousel({
    loop: true,
    dots: false,
    lazyLoad: true,
    margin: 25,
    responsiveClass: true,
    nav: true,
    autoplay: true,
    autoplayHoverPause: true,
    responsive: {
        0: {
            items: 1,
            margin: 15
        },
        600: {
            items: 2
        },
        1000: {
            items: 4
        },
        1900: {
            items: 5
        }
    }
});



$('.owl-carousel').each(function () {
    //Find each set of dots in this carousel
    $(this).find('.owl-dot').each(function (index) {
        //Add one to index so it starts from 1
        $(this).attr('aria-label', index + 1);
    });
});



$(document).ready(function () {
    $("a[href*='#']:not([href='#])").click(function () {
        let target = $(this).attr("href");
        $('html,body').stop().animate({
            scrollTop: $(target).offset().top - 10
        }, 1000);
        event.preventDefault();


        $('.header__nav').removeClass('header__nav--entered');
        $('.nav-toggle').removeClass('nav-toggle--entered');
    });

    // $('body').scrollspy({
    //     target: '.navbar'
    // })

    // $('[data-spy="scroll"]').each(function () {
    //     var $spy = $(this).scrollspy('refresh')
    // });

    $(window).bind('scroll', function () {
        var currentTop = $(window).scrollTop();
        var elems = $('.scrollspy');
        elems.each(function (index) {
            var elemTop = $(this).offset().top - 100;
            var elemBottom = elemTop + $(this).height();
            if (currentTop >= elemTop && currentTop <= elemBottom) {
                var id = $(this).attr('id');
                var navElem = $('a[href="#' + id + '"]');
                navElem.addClass('active').siblings().removeClass('active');
            }
        })
    });

    $('.header__logo').click(function () {
        $('html,body').stop().animate({
            scrollTop: 0
        }, 1000);
    })

    $('.nav-toggle').click(function () {
        $('.header__nav').toggleClass('header__nav--entered');
        $('.nav-toggle').toggleClass('nav-toggle--entered');
    })

    // $(".projects__title")
})