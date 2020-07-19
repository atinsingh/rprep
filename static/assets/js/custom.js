// SCROLL TOP TO BOTTOM
$(document).on('click', '#scrollToTop', function () {
  $('html,body').animate({
    scrollTop: 0
  }, 500);
  return false;

});
//BUTTON CONTROL
$(document).scroll(function (e) {
  var scrollPos = $(this).scrollTop();
  if (scrollPos < 100) {
    $('#scrollToTop').addClass('scroll-hide');
  } else {
    $('#scrollToTop').removeClass('scroll-hide');
  }
});
// SCROLL TOP TO BOTTOM
//NAVIGATION FIXED
// $(window).scroll(function(){
//      if($(this).scrollTop()>100){
//        $('.navigation-strip').addClass("sticky");   
//     }   
//     else{
//       $('.navigation-strip').removeClass("sticky"); 
//     }
//   })
//NAVIGATION FIXED
$(document).ready(function () {
  var owl = $('#owl-introducing-courses-slider');
  owl.owlCarousel({
    items: 4,
    loop: true,
    margin: 15,
    // autoplay: true,
    // autoplayTimeout: 2000,
    // autoplayHoverPause: true,
    nav: true,
    responsive: {
      0: {
        items: 1,
        nav: true
      },
      576: {
        items: 2,
        nav: true
      },
      768: {
        items: 3,
        nav: true
      },
      1000: {
        items: 4,
        nav: true,
      }
    }
  });
});
//INTRODUCING-COURSES-SLIDER
//CLOUD-DEVOPS-SLIDER
$(document).ready(function () {
  var owl = $('#owl-cloud-devops-slider');
  owl.owlCarousel({
    items: 4,
    loop: true,
    margin: 15,
    // autoplay: true,
    // autoplayTimeout: 2000,
    // autoplayHoverPause: true,
    nav: true,
    responsive: {
      0: {
        items: 1,
        nav: true
      },
      576: {
        items: 2,
        nav: true
      },
      768: {
        items: 3,
        nav: true
      },
      1000: {
        items: 4,
        nav: true,
      }
    }
  });
});
//CLOUD-DEVOPS-SLIDER
//POPULAR-COURSES-INCLASS-SLIDER
$(document).ready(function () {
  var owl = $('#owl-popular-courses-inclass-slider');
  owl.owlCarousel({
    items: 4,
    loop: true,
    margin: 15,
    // autoplay: true,
    // autoplayTimeout: 2000,
    // autoplayHoverPause: true,
    nav: true,
    responsive: {
      0: {
        items: 1,
        nav: true
      },
      576: {
        items: 2,
        nav: true
      },
      768: {
        items: 3,
        nav: true
      },
      1000: {
        items: 4,
        nav: true,
      }
    }
  });
});
//POPULAR-COURSES-INCLASS-SLIDER
//INTRODUCING-COURSES-INCLASS-SLIDER
$(document).ready(function () {
  var owl = $('#owl-introducing-courses-inclass-slider');
  owl.owlCarousel({
    items: 4,
    loop: true,
    margin: 15,
    // autoplay: true,
    // autoplayTimeout: 2000,
    // autoplayHoverPause: true,
    nav: true,
    responsive: {
      0: {
        items: 1,
        nav: true
      },
      576: {
        items: 2,
        nav: true
      },
      768: {
        items: 3,
        nav: true
      },
      1000: {
        items: 4,
        nav: true,
      }
    }
  });
});
//INTRODUCING-COURSES-INCLASS-SLIDER
//CLOUD-DEVOPS-INCLASS-SLIDER
$(document).ready(function () {
  var owl = $('#owl-cloud-devops-inclass-slider');
  owl.owlCarousel({
    items: 4,
    loop: true,
    margin: 15,
    // autoplay: true,
    // autoplayTimeout: 2000,
    // autoplayHoverPause: true,
    nav: true,
    responsive: {
      0: {
        items: 1,
        nav: true
      },
      576: {
        items: 2,
        nav: true
      },
      768: {
        items: 3,
        nav: true
      },
      1000: {
        items: 4,
        nav: true,
      }
    }
  });
});
//INTRODUCING-COURSES-INCLASS-SLIDER
//NEW-HOME-COURSES-SLIDER
$(document).ready(function () {
  var owl = $('#owl-new-home-courses-slider');
  owl.owlCarousel({
    items: 4,
    loop: true,
    margin: 15,
    // autoplay: true,
    // autoplayTimeout: 2000,
    // autoplayHoverPause: true,
    nav: true,
    responsive: {
      0: {
        items: 1,
        nav: true
      },
      576: {
        items: 2,
        nav: true
      },
      768: {
        items: 3,
        nav: true
      },
      992: {
        items: 4,
        nav: true,
      }
    }
  });
});
//NEW-HOME-COURSES-SLIDER
//NEW-HOME-BEST-MENTORS
$(document).ready(function () {
  var owl = $('#owl-new-home-best-mentors');
  owl.owlCarousel({
    items: 5,
    loop: true,
    margin: 15,
    // autoplay: true,
    // autoplayTimeout: 2000,
    // autoplayHoverPause: true,
    nav: true,
    responsive: {
      0: {
        items: 1,
        nav: true
      },
      576: {
        items: 3,
        nav: true
      },
      768: {
        items: 3,
        nav: true
      },
      992: {
        items: 5,
        nav: true,
      }
    }
  });
});
//NEW-HOME-BEST-MENTORS
//CORPORATE-TRAINING-MOBILE-SLIDER
$(document).ready(function () {
  var owl = $('#owl-corporate-training-mobile-slider');
  owl.owlCarousel({
    items: 1,
    loop: true,
    margin: 15,
    // autoplay: true,
    // autoplayTimeout: 2000,
    // autoplayHoverPause: true,
    nav: true,
    responsive: {
      0: {
        items: 1,
        nav: true
      },
      576: {
        items: 2,
        nav: true
      },
    }
  });
});
//CORPORATE-TRAINING-MOBILE-SLIDER



//HOME COUNTERS
(function ($) {
  $.fn.countTo = function (options) {
    options = options || {};

    return $(this).each(function () {
      // set options for current element
      var settings = $.extend({}, $.fn.countTo.defaults, {
        from: $(this).data('from'),
        to: $(this).data('to'),
        speed: $(this).data('speed'),
        refreshInterval: $(this).data('refresh-interval'),
        decimals: $(this).data('decimals')
      }, options);

      // how many times to update the value, and how much to increment the value on each update
      var loops = Math.ceil(settings.speed / settings.refreshInterval),
        increment = (settings.to - settings.from) / loops;

      // references & variables that will change with each update
      var self = this,
        $self = $(this),
        loopCount = 0,
        value = settings.from,
        data = $self.data('countTo') || {};

      $self.data('countTo', data);

      // if an existing interval can be found, clear it first
      if (data.interval) {
        clearInterval(data.interval);
      }
      data.interval = setInterval(updateTimer, settings.refreshInterval);

      // initialize the element with the starting value
      render(value);

      function updateTimer() {
        value += increment;
        loopCount++;

        render(value);

        if (typeof (settings.onUpdate) == 'function') {
          settings.onUpdate.call(self, value);
        }

        if (loopCount >= loops) {
          // remove the interval
          $self.removeData('countTo');
          clearInterval(data.interval);
          value = settings.to;

          if (typeof (settings.onComplete) == 'function') {
            settings.onComplete.call(self, value);
          }
        }
      }

      function render(value) {
        var formattedValue = settings.formatter.call(self, value, settings);
        $self.html(formattedValue);
      }
    });
  };

  $.fn.countTo.defaults = {
    from: 0, // the number the element should start at
    to: 0, // the number the element should end at
    speed: 1000, // how long it should take to count between the target numbers
    refreshInterval: 100, // how often the element should be updated
    decimals: 0, // the number of decimal places to show
    formatter: formatter, // handler for formatting the value before rendering
    onUpdate: null, // callback method for every time the element is updated
    onComplete: null // callback method for when the element finishes updating
  };

  function formatter(value, settings) {
    return value.toFixed(settings.decimals);
  }
}(jQuery));

jQuery(function ($) {
  // custom formatting example
  $('.count-number').data('countToOptions', {
    formatter: function (value, options) {
      return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
    }
  });

  // start all the timers
  $(document).ready(function () {
    $('.timer').each(count).isOnScreen();
  });


  function count(options) {
    var $this = $(this);
    options = $.extend({}, options || {}, $this.data('countToOptions') || {});
    $this.countTo(options);
  }
});


// check if element visible in viewport
$.fn.isOnScreen = function () {
  var win = $(window);
  var viewport = {
    top: win.scrollTop(),
    left: win.scrollLeft()
  };
  viewport.right = viewport.left + win.width();
  viewport.bottom = viewport.top + win.height();

  var bounds = this.offset();
  bounds.right = bounds.left + this.outerWidth();
  bounds.bottom = bounds.top + this.outerHeight();

  return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));

};

//COURSE-CURRICULUM-ACCORDION//
$(document).ready(function () {
  // Add minus icon for collapse element which is open by default
  $(".collapse.show").each(function () {
    $(this).prev(".card-header").find(".fa").addClass("fa-minus").removeClass("fa-plus");
  });

  // Toggle plus minus icon on show hide of collapse element
  $(".collapse").on('show.bs.collapse', function () {
    $(this).prev(".card-header").find(".fa").removeClass("fa-plus").addClass("fa-minus");
  }).on('hide.bs.collapse', function () {
    $(this).prev(".card-header").find(".fa").removeClass("fa-minus").addClass("fa-plus");
  });
});
