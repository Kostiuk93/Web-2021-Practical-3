const slider = tns({
  container: '.carousel__inner',
  items: 1,
  slideBy: 'page',
  autoplay: false,
  controls: false,
  nav: false
});

document.querySelector('.prev').addEventListener('click', function () {
  slider.goTo('prev'); 
});

document.querySelector('.next').addEventListener('click', function () {
  slider.goTo('next'); 
});

$(document).ready(function(){
    /* $('.carousel__inner').slick({
        speed: 300,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                  dots: true,
                  arrows: false
                }
            }
        ]
      }); */
      $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });

      /* $('.catalog-item__link').each(function(i) {
        $(this).on('click', function(e) {
          e.preventDefault();
          $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
          $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        });
      });

      $('.catalog-item__back').each(function(i) {
        $(this).on('click', function(e) {
          e.preventDefault();
          $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
          $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        });
      }); */

      function toggleSlide(item) {
        $(item).each(function(i) {
          $(this).on('click', function(e) {
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
          });
        });
      };

      toggleSlide('.catalog-item__link');
      toggleSlide('.catalog-item__back');

      $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn(500);
      });
      $('.button_mini').on('click', function() {
        $('.overlay, #order').fadeIn(500);
      });
      $('[data-modal=thanks]').on('click', function() {
        $('.overlay, #thanks').fadeIn(500);
      });
      $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #order, #thanks').fadeOut(500);
      });
      
      $('.button_mini').each(function (i) {
        $(this).on('click', function () {
          $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
          
          $('.button_mini').on('click', function() {
            $('.overlay, #order').fadeIn(500);
          });
        });
      });


      function validateForms (form) {
        $(form).validate({
          rules: {
            name: {
              required: true,
              minlength: 2
            },
            phone: "required",
            email: {
              required: true,
              email: true
            }
          },
          messages: {
            name: {
              required: "Пожалуйста, веедите свое имя",
              minlength: jQuery.validator.format("Введите {0} символа!")
            },
            phone: "Пожалуйста, введите свой номер телефона",
            email: {
              required: "Пожалуйста, введите свой E-mail",
              email: "Указан не верный формат электронной почты"
            }
          }
        });
      };
      validateForms('#consultation-form');
      validateForms('#consultation form');
      validateForms('#order form');

      $('input[name=phone]').mask("+7 (999) 999-99-99");

      $('form').submit(function (e) {
        e.preventDefault();
        $.ajax({
          type: "POST",
          url: "mailer/smart.php",
          data: $(this).serialize()
        }).done(function () {
          $(this).find("input").val("");
          $('#consultation, #order').fadeOut();
          $('.ovelay, #thanks').fadeIn(600);

          $('form').trigger('reset');
        });
        return false;
      });

      //Smooth scroll and page Up

      $(window).scroll(function () {
        if ($(this).scrollTop() > 1600 ) {
          $('.pageUp').fadeIn();
        } else {
          $('.pageUp').fadeOut();
        }
      });

      // Плавный скроллинг
      $("a[href=#up]").click(function () {
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
      });

      new WOW().init();

  });

