(function ($) {
  "use strict";

  // Preloader Loading with safety fallback
  function handlePreloader() {
    var preloader = $(".animsition-preloader");
    if (preloader.length && preloader.is(":visible")) {
      preloader.fadeOut(400);
    }
  }

  $(window).on("load", function () {
    handlePreloader();
  });

  // Safety fallback: Hide preloader after 800ms max if window.load is delayed
  setTimeout(handlePreloader, 800);

  // Header Sticky
  $(window).on("scroll", function () {
    var stickytop = $("#header.sticky-top .bg-transparent");
    var stickytopslide = $("#header.sticky-top-slide");

    if ($(this).scrollTop() > 1) {
      stickytop.addClass("sticky-on-top");
      stickytop
        .find(".logo img")
        .attr("src", stickytop.find(".logo img").data("sticky-logo"));
    } else {
      stickytop.removeClass("sticky-on-top");
      stickytop
        .find(".logo img")
        .attr("src", stickytop.find(".logo img").data("default-logo"));
    }

    if ($(this).scrollTop() > 200) {
      stickytopslide.find(".primary-menu").addClass("sticky-on");
      stickytopslide
        .find(".logo img")
        .attr("src", stickytopslide.find(".logo img").data("sticky-logo"));
    } else {
      stickytopslide.find(".primary-menu").removeClass("sticky-on");
      stickytopslide
        .find(".logo img")
        .attr("src", stickytopslide.find(".logo img").data("default-logo"));
    }
  });

  // Smooth Scroll
  if ($("body").hasClass("side-header")) {
    $(".smooth-scroll").on("click", function () {
      event.preventDefault();
      var sectionTo = $(this).attr("href");
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: $(sectionTo).offset().top,
          },
          1500,
          "easeInOutExpo"
        );
    });
  } else {
    $(".smooth-scroll").on("click", function () {
      event.preventDefault();
      var sectionTo = $(this).attr("href");
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: $(sectionTo).offset().top - 50,
          },
          1500,
          "easeInOutExpo"
        );
    });
  }

  // sections background image from data background
  var pageSection = $(".bg-img, section");
  pageSection.each(function (indx) {
    if ($(this).attr("data-background")) {
      $(this).css(
        "background-image",
        "url(" + $(this).data("background") + ")"
      );
    }
  });

  // Mobile Menu
  $(".navbar-toggler").on("click", function () {
    $(this).toggleClass("show");
  });
  $(".navbar-nav a").on("click", function () {
    $(".navbar-collapse, .navbar-toggler").removeClass("show");
  });

  // Overlay Menu & Side Open Menu
  $(".navbar-side-open .collapse, .navbar-overlay .collapse").on(
    "show.bs.collapse hide.bs.collapse",
    function (e) {
      e.preventDefault();
    }
  ),
    $(
      '.navbar-side-open [data-toggle="collapse"], .navbar-overlay [data-toggle="collapse"]'
    ).on("click", function (e) {
      e.preventDefault();
      $($(this).data("target")).toggleClass("show");
    });

  // Owl Carousel
  $(".owl-carousel").each(function (index) {
    var a = $(this);
    $(this).owlCarousel({
      autoplay: a.data("autoplay"),
      center: a.data("center"),
      autoplayTimeout: a.data("autoplaytimeout"),
      autoplayHoverPause: a.data("autoplayhoverpause"),
      loop: a.data("loop"),
      speed: a.data("speed"),
      nav: a.data("nav"),
      dots: a.data("dots"),
      autoHeight: a.data("autoheight"),
      autoWidth: a.data("autowidth"),
      margin: a.data("margin"),
      stagePadding: a.data("stagepadding"),
      slideBy: a.data("slideby"),
      lazyLoad: a.data("lazyload"),
      navText: [
        '<i class="fa fa-chevron-left"></i>',
        '<i class="fa fa-chevron-right"></i>',
      ],
      animateOut: a.data("animateout"),
      animateIn: a.data("animatein"),
      video: a.data("video"),
      items: a.data("items"),
      responsive: {
        0: { items: a.data("items-xs") },
        576: { items: a.data("items-sm") },
        768: { items: a.data("items-md") },
        992: { items: a.data("items-lg") },
      },
    });
  });

  // Text Rotator Animation
  $(".text-rotator").each(function () {
    $(this).Morphext({
      speed: 3000, // Overrides default 2000
    });
  });

  // Typed Text Animation
  $(".typed").each(function () {
    var typed = new Typed(".typed", {
      stringsElement: ".typed-strings",
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 1500,
    });
  });

  // WOW Animation
  $(".wow").each(function () {
    if ($(window).width() > 767) {
      var wow = new WOW({
        boxClass: "wow",
        animateClass: "animated",
        offset: 0,
        mobile: false,
        live: true,
      });
      new WOW().init();
    }
  });

  // Tooltips
  $("[data-toggle='tooltip']").tooltip({ container: "body" });

  // Popup Youtube Video, Popup Viemo Video, Popup Gmaps
  $(".popup-youtube, .popup-vimeo, .popup-gmaps").each(function () {
    $(this).magnificPopup({
      type: "iframe",
      mainClass: "mfp-fade",
    });
  });

  // Portfolio Filter
  function initPortfolioIsotope() {
    $(".utf-portfolio-filter-item").each(function () {
      var e = $(this);
      var $grid = e.isotope({
        itemSelector: ".col-12",
        layoutMode: "fitRows",
      });

      // Recalculate Isotope layout when images load
      e.find("img").each(function () {
        if (this.complete) {
          $grid.isotope("layout");
        } else {
          $(this).on("load", function () {
            $grid.isotope("layout");
          });
        }
      });

      // Safety delays to ensure proper container height calculation
      [100, 300, 600, 1200, 2500].forEach(function (delay) {
        setTimeout(function () {
          $grid.isotope("layout");
        }, delay);
      });

      // Filter click
      $(".utf-portfolio-filter-menu")
        .find("a")
        .off("click")
        .on("click", function () {
          var filterValue = $(this).attr("data-filter");
          $(".utf-portfolio-filter-menu").find("a").removeClass("active");
          $(this).addClass("active");
          $grid.isotope({
            filter: filterValue,
          });
          setTimeout(function () {
            $grid.isotope("layout");
          }, 100);
          return false;
        });
    });
  }

  $(document).ready(initPortfolioIsotope);
  $(window).on("load resize", initPortfolioIsotope);

  // Parallax Background
  $(".parallax").each(function () {
    $(this).parallaxie({
      speed: 0.5,
    });
  });

  // Counter
  $(".counter").each(function () {
    $(this).appear(function () {
      $(this).countTo({
        speed: 1800,
      });
    });
  });

  // Scroll Back to Top
  $(function () {
    $(window).on("scroll", function () {
      if ($(this).scrollTop() > 400) {
        $("#back-to-top").fadeIn();
      } else {
        $("#back-to-top").fadeOut();
      }
    });
  });

  $("#back-to-top").on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
  });

  // Dark / Light Theme Toggle (Single Icon Button)
  $(function () {
    var savedTheme = localStorage.getItem("portfolio_theme");
    var themeBtn = $("#theme-toggle-btn");
    var themeIcon = themeBtn.find(".mode-icon");

    function applyTheme(isLight) {
      if (isLight) {
        $("body").addClass("light-mode");
        themeIcon.removeClass("fa-moon").addClass("fa-sun");
        $(".phone-mockup.mockup-1 img").attr("src", "images/screenshots/light_1.jpg");
        $(".phone-mockup.mockup-2 img").attr("src", "images/screenshots/light_2.jpg");
        $(".phone-mockup.mockup-3 img").attr("src", "images/screenshots/light_3.jpg");
      } else {
        $("body").removeClass("light-mode");
        themeIcon.removeClass("fa-sun").addClass("fa-moon");
        $(".phone-mockup.mockup-1 img").attr("src", "images/screenshots/night_1.jpg");
        $(".phone-mockup.mockup-2 img").attr("src", "images/screenshots/night_2.jpg");
        $(".phone-mockup.mockup-3 img").attr("src", "images/screenshots/night_3.jpg");
      }
    }

    if (savedTheme === "light") {
      applyTheme(true);
    } else {
      applyTheme(false);
    }

    themeBtn.on("click", function () {
      var isLight = $("body").toggleClass("light-mode").hasClass("light-mode");
      applyTheme(isLight);
      localStorage.setItem("portfolio_theme", isLight ? "light" : "dark");
    });
  });

  // Color Picker Popup & Palette Switcher
  $(function () {
    var palettePopup = $("#color-palette-popup");
    var colorPickerBtn = $("#color-picker-btn");
    var colorSwitcherLink = $("#color-switcher");

    // Toggle Palette Popup on Circle Click
    colorPickerBtn.on("click", function (e) {
      e.stopPropagation();
      palettePopup.toggleClass("show");
    });

    // Close Popup when clicking anywhere outside
    $(document).on("click", function (e) {
      if (!$(e.target).closest(".theme-controls-wrapper").length) {
        palettePopup.removeClass("show");
      }
    });

    function hexToRgba(hex, alpha) {
      var c;
      if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split("");
        if (c.length === 3) {
          c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = "0x" + c.join("");
        return "rgba(" + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") + "," + alpha + ")";
      }
      return "rgba(32, 201, 151, " + alpha + ")";
    }

    function applyAccentColor(selectedColor) {
      if (!selectedColor) return;
      var rgbaGlow = hexToRgba(selectedColor, 0.5);
      var rgbaHoverGlow = hexToRgba(selectedColor, 0.8);

      document.documentElement.style.setProperty("--primary-color", selectedColor);
      document.documentElement.style.setProperty("--primary-glow", rgbaGlow);

      colorPickerBtn.css("background-color", selectedColor);

      $("head").find("#dynamic-accent-style").remove();
      $("head").append(
        '<style id="dynamic-accent-style">' +
        '.primary-menu ul.navbar-nav > li:hover > a.nav-link, ' +
        '.primary-menu ul.navbar-nav > li > a.nav-link.active, ' +
        'body.light-mode .primary-menu ul.navbar-nav > li:hover > a.nav-link, ' +
        'body.light-mode .primary-menu ul.navbar-nav > li > a.nav-link.active { ' +
          'color: ' + selectedColor + ' !important; ' +
        '} ' +
        '.brand-text-second { ' +
          'color: ' + selectedColor + ' !important; ' +
        '} ' +
        '.primary-menu ul.navbar-nav > li > a.nav-link::after { ' +
          'background-color: ' + selectedColor + ' !important; ' +
        '} ' +
        '.color-circle-btn { ' +
          'box-shadow: 0 0 8px ' + rgbaGlow + ' !important; ' +
        '} ' +
        '.color-circle-btn:hover { ' +
          'box-shadow: 0 0 14px ' + rgbaHoverGlow + ' !important; ' +
        '} ' +
        '.light_svg svg { ' +
          'fill: ' + selectedColor + ' !important; ' +
        '} ' +
        '.about-image-card .offset-green-frame { ' +
          'background-color: ' + selectedColor + ' !important; ' +
        '} ' +
        '.about-signature { ' +
          'color: ' + selectedColor + ' !important; ' +
        '} ' +
        '.resume-badge .accent-text { ' +
          'color: ' + selectedColor + ' !important; ' +
        '} ' +
        '.portfolio-subheading .green-bar { ' +
          'background-color: ' + selectedColor + ' !important; ' +
        '} ' +
        '.portfolio-section .accent-text { ' +
          'color: ' + selectedColor + ' !important; ' +
        '} ' +
        '.contact-subheading .green-bar { ' +
          'background-color: ' + selectedColor + ' !important; ' +
        '} ' +
        '.contact-section .accent-text { ' +
          'color: ' + selectedColor + ' !important; ' +
        '} ' +
        '#contact h3.card-title:after { ' +
          'background-color: ' + selectedColor + ' !important; ' +
        '} ' +
        '.project-icon-box { ' +
          'background: ' + rgbaGlow + ' !important; ' +
          'border-color: ' + selectedColor + ' !important; ' +
          'color: ' + selectedColor + ' !important; ' +
        '} ' +
        '</style>'
      );
    }

    // Apply Saved Theme Color
    var savedColorStyle = localStorage.getItem("portfolio_color_style");
    var savedColorHex = localStorage.getItem("portfolio_color_hex");

    if (savedColorStyle && colorSwitcherLink.length) {
      colorSwitcherLink.attr("href", savedColorStyle);
    }
    if (savedColorHex) {
      applyAccentColor(savedColorHex);
      $(".color-option").removeClass("active");
      $('.color-option[data-color="' + savedColorHex + '"]').addClass("active");
    }

    // Color Option Selected
    $(".color-option").on("click", function () {
      var selectedStyle = $(this).attr("data-style");
      var selectedColor = $(this).attr("data-color");

      if (colorSwitcherLink.length && selectedStyle) {
        colorSwitcherLink.attr("href", selectedStyle);
        localStorage.setItem("portfolio_color_style", selectedStyle);
      }

      if (selectedColor) {
        applyAccentColor(selectedColor);
        localStorage.setItem("portfolio_color_hex", selectedColor);
      }

      $(".color-option").removeClass("active");
      $(this).addClass("active");
      palettePopup.removeClass("show");
    });
  });
})(jQuery);