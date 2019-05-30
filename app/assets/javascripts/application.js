//= require rails-ujs
//= require activestorage
//= require jquery
//= require jquery_ujs
//= require popper
//= require bootstrap
//= require jquery.easing.min.js
//= require scrollspy.min.js
//= require_self


/* Template Name: Ubold - Bootstrap 4 Landing Page Tamplat
   Author: CoderThemes
   File Description: Main JS file of the template
*/


! function ($) {
  "use strict";

  var Ubold = function () { };

  Ubold.prototype.initStickyMenu = function () {
    $(window).scroll(function () {
      var scroll = $(window).scrollTop();

      if (scroll >= 50) {
        $(".sticky").addClass("nav-sticky");
      } else {
        $(".sticky").removeClass("nav-sticky");
      }
    });
  },

    Ubold.prototype.initSmoothLink = function () {
      $('.navbar-nav a').on('click', function (event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
          scrollTop: $($anchor.attr('href')).offset().top - 50
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
      });
    },

    Ubold.prototype.initScrollspy = function () {
      $("#navbarCollapse").scrollspy({
        offset: 50
      });
    },

    Ubold.prototype.initContact = function () {

      $('#contact-form').submit(function () {

        var action = $(this).attr('action');

        $("#message").slideUp(750, function () {
          $('#message').hide();

          $('#submit')
            .before('')
            .attr('disabled', 'disabled');

          $.post(action, {
            name: $('#name').val(),
            email: $('#email').val(),
            comments: $('#comments').val(),
          },
            function (data) {
              document.getElementById('message').innerHTML = data;
              $('#message').slideDown('slow');
              $('#cform img.contact-loader').fadeOut('slow', function () {
                $(this).remove()
              });
              $('#submit').removeAttr('disabled');
              if (data.match('success') != null) $('#cform').slideUp('slow');
            }
          );

        });

        return false;

      });
    },

    Ubold.prototype.initBacktoTop = function () {
      $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
          $('.back-to-top').fadeIn();
        } else {
          $('.back-to-top').fadeOut();
        }
      });
      $('.back-to-top').click(function () {
        $("html, body").animate({ scrollTop: 0 }, 1000);
        return false;
      });
    },


    Ubold.prototype.init = function () {
      this.initStickyMenu();
      this.initSmoothLink();
      this.initScrollspy();
      this.initContact();
      this.initBacktoTop();
    },
    //init
    $.Ubold = new Ubold, $.Ubold.Constructor = Ubold
}(window.jQuery),

  //initializing
  function ($) {
    "use strict";
    $.Ubold.init();
  }(window.jQuery);


  $(function(){
  var hash = window.location.hash;
  hash && $('ul.nav a[href="' + hash + '"]').tab('show');

  $('.nav-tabs a').click(function (e) {
    $(this).tab('show');
    var scrollmem = $('body').scrollTop() || $('html').scrollTop();
    window.location.hash = this.hash;
    $('html,body').scrollTop(scrollmem);
  });
});