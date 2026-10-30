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

  // Typed Text Animation
  if ($(".typed").length) {
    $(".typed").each(function () {
      var typed = new Typed(".typed", {
        stringsElement: ".typed-strings",
        loop: true,
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 1500,
      });
    });
  }

  // Tooltips
  $("[data-toggle='tooltip']").tooltip({ container: "body" });

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

  // Language Toggle Button (AR / EN) - Handles Local (Live Server) & GitHub Pages
  $(function () {
    var langBtn = $("#lang-toggle-btn");
    var langText = langBtn.find(".lang-text");
    var path = window.location.pathname;

    // Set saved language based on current path
    if (path.indexOf("/ar/") !== -1) {
      localStorage.setItem("portfolio_lang", "ar");
    } else if (path.indexOf("/en/") !== -1) {
      localStorage.setItem("portfolio_lang", "en");
    }

    langBtn.on("click", function () {
      var currentLang = langText.text().trim();
      var host = window.location.hostname;
      var path = window.location.pathname;

      if (currentLang === "AR") {
        localStorage.setItem("portfolio_lang", "ar");
        if (host === "localhost" || host === "127.0.0.1") {
          if (path.indexOf("/en/") !== -1) {
            window.location.href = path.replace("/en/", "/ar/");
          } else if (path.indexOf("/ar/") === -1) {
            window.location.href = "ar/";
          } else {
            window.location.href = "../ar/";
          }
        } else {
          if (path.indexOf("/en/") !== -1) {
            window.location.href = path.replace("/en/", "/ar/");
          } else if (path.indexOf("/portfolio/") !== -1 && path.indexOf("/ar/") === -1) {
            window.location.href = "https://selimdawa.github.io/portfolio/ar/";
          } else {
            window.location.href = "../ar/";
          }
        }
      } else if (currentLang === "EN") {
        localStorage.setItem("portfolio_lang", "en");
        if (host === "localhost" || host === "127.0.0.1") {
          if (path.indexOf("/ar/") !== -1) {
            window.location.href = path.replace("/ar/", "/en/");
          } else if (path.indexOf("/en/") === -1) {
            window.location.href = "en/";
          } else {
            window.location.href = "../en/";
          }
        } else {
          if (path.indexOf("/ar/") !== -1) {
            window.location.href = path.replace("/ar/", "/en/");
          } else if (path.indexOf("/portfolio/") !== -1 && path.indexOf("/en/") === -1) {
            window.location.href = "https://selimdawa.github.io/portfolio/en/";
          } else {
            window.location.href = "../en/";
          }
        }
      }
    });
  });

  // Dark / Light Theme Toggle (Single Icon Button)
  $(function () {
    var savedTheme = localStorage.getItem("portfolio_theme");
    var themeBtn = $("#theme-toggle-btn");
    var themeIcon = themeBtn.find(".mode-icon");

    function applyTheme(isLight) {
      var imgPrefix = (window.location.pathname.indexOf("/ar/") !== -1 || window.location.pathname.indexOf("/en/") !== -1) ? "../" : "";
      if (isLight) {
        $("html, body").addClass("light-mode");
        themeIcon.removeClass("fa-moon").addClass("fa-sun");
        $(".phone-mockup.mockup-1 img").attr("src", imgPrefix + "images/hero/light_1.jpg");
        $(".phone-mockup.mockup-2 img").attr("src", imgPrefix + "images/hero/light_2.jpg");
        $(".phone-mockup.mockup-3 img").attr("src", imgPrefix + "images/hero/light_3.jpg");
      } else {
        $("html, body").removeClass("light-mode");
        themeIcon.removeClass("fa-sun").addClass("fa-moon");
        $(".phone-mockup.mockup-1 img").attr("src", imgPrefix + "images/hero/night_1.jpg");
        $(".phone-mockup.mockup-2 img").attr("src", imgPrefix + "images/hero/night_2.jpg");
        $(".phone-mockup.mockup-3 img").attr("src", imgPrefix + "images/hero/night_3.jpg");
      }
      if (typeof window.updateActiveThemeColor === "function") {
        window.updateActiveThemeColor();
      }
      if (typeof window.updateLibImages === "function") {
        window.updateLibImages();
      }
    }

    if (savedTheme === "light") {
      applyTheme(true);
    } else {
      applyTheme(false);
    }

    themeBtn.on("click", function () {
      var isLight = !$("body").hasClass("light-mode");
      applyTheme(isLight);
      localStorage.setItem("portfolio_theme", isLight ? "light" : "dark");
    });
  });

  // Color Picker Popup & MC S1-S10 Kotlin Theme Switcher
  $(function () {
    var palettePopup = $("#color-palette-popup");
    var colorPickerBtn = $("#color-picker-btn");

    // MC S1-S10 Kotlin Theme Color Palette Map
    var mcThemes = {
      "S1": { day: "#3C415E", night: "#999999" },
      "S2": { day: "#1976D2", night: "#1976D2" },
      "S3": { day: "#F57C00", night: "#FF9800" },
      "S4": { day: "#C51162", night: "#C51162" },
      "S5": { day: "#8D6E63", night: "#A1887F" },
      "S6": { day: "#1B5E20", night: "#4CAF50" },
      "S7": { day: "#607D8B", night: "#78909C" },
      "S8": { day: "#3F51B5", night: "#7986CB" },
      "S9": { day: "#006666", night: "#009688" },
      "S10": { day: "#800080", night: "#9C27B0" }
    };

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
      return "rgba(0, 150, 136, " + alpha + ")";
    }

    function applyAccentColor(selectedColor) {
      if (!selectedColor) return;
      var rgbaGlow = hexToRgba(selectedColor, 0.5);
      var rgbaHoverGlow = hexToRgba(selectedColor, 0.8);
      var rgbaLightGlow = hexToRgba(selectedColor, 0.15);

      document.documentElement.style.setProperty("--primary-color", selectedColor);
      document.documentElement.style.setProperty("--primary-glow", rgbaGlow);
      document.documentElement.style.setProperty("--primary-glow-hover", rgbaHoverGlow);
      document.documentElement.style.setProperty("--primary-glow-light", rgbaLightGlow);

      colorPickerBtn.css("background-color", selectedColor);
    }

    function updateActiveThemeColor() {
      var currentThemeID = localStorage.getItem("portfolio_theme_id") || "S1";
      var isLight = $("body").hasClass("light-mode");
      var themeData = mcThemes[currentThemeID] || mcThemes["S1"];
      var activeColor = isLight ? themeData.day : themeData.night;

      applyAccentColor(activeColor);

      // Dynamically update background colors of all 10 palette circles for Day / Night mode
      $(".color-option").each(function () {
        var themeID = $(this).attr("data-theme");
        if (themeID && mcThemes[themeID]) {
          var circleColor = isLight ? mcThemes[themeID].day : mcThemes[themeID].night;
          $(this).css("background-color", circleColor);
        }
      });

      $(".color-option").removeClass("active");
      $('.color-option[data-theme="' + currentThemeID + '"]').addClass("active");
    }

    window.updateActiveThemeColor = updateActiveThemeColor;

    // Apply Saved Theme Color or Default S1
    updateActiveThemeColor();

    // Color Option Selected (S1 - S10)
    $(".color-option").on("click", function () {
      var selectedThemeID = $(this).attr("data-theme") || "S1";

      localStorage.setItem("portfolio_theme_id", selectedThemeID);
      updateActiveThemeColor();

      palettePopup.removeClass("show");
    });
  });
})(jQuery);