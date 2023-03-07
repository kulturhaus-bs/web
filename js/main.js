let translations;

$(document).ready(function () {
    // Scrolling Animations
    if ($(window).width() < 991) {
        $("body *").removeClass("wow");
    }
    var wow = new WOW();
    wow.init();
    // ---------------

    // Preloader
    $(".preloader .loader").delay(750).fadeOut(0);
    $(".preloader .load-splitter").addClass("loading-end-split");
    $(".preloader").delay(1500).fadeOut(0);
    // ---------------

    // Heading animation
    $(".main-heading").each(function(){
        $(this).appear(function() {
            $(this).children("h2").removeClass("main-head-animation")
        });
    });
    // ---------------

    // Function on scrolling
    $(window).scroll(function(){
        // Activating header links on scrolling
        $("section").each(function(){
            if ($(window).scrollTop() > $(this).offset().top - 1) {
                var sectionID = $(this).attr('id');
                $("nav li a[data-scroll='" + sectionID +"']")
                .addClass('active').parent()
                .siblings().find('a').removeClass('active');
            }
        });
        // ---
        // Header animation 
        if ($(this).scrollTop() > 200) {
            $("header").removeClass("header-sliding");
        } else {
            $("header").addClass("header-sliding");
        }
        // ---
    });
    if ($(window).width() < 992) {
        $(".menu-toggle-btn").addClass("collapsed")
    }
    // ---------------

    // Functions on resizing
    if ($(window).width() < 992) {
        $("header nav .ul-cont").on('click' , 'li a' ,function(){
            $(this).parents(".ul-cont").removeClass("show");
            $(".menu-toggle-btn").addClass("collapsed");
        });
    }

    $(window).resize(function () { 
        if ($(window).width() < 992) {
            $("header nav .ul-cont").on('click' , 'li a' ,function(){
                $(this).parents(".ul-cont").removeClass("show");
                $(".menu-toggle-btn").addClass("collapsed");
            });
            if (!$(this).next(".ul-cont").hasClass("show")) {
                $(".menu-toggle-btn").addClass("collapsed")
            } else {
                $(".menu-toggle-btn").addClass("collapsed")
            }
        }
    });
    // ---------------

    // Home Text change
    $('#home-text-changer').animatedHeadline({
        animationType: 'clip'
    });
    // ---------------


    // Work Counter
    $(".odometer").each(function(){
        $(this).appear(function() {
            var countNumber = $(this).attr("data-count");
            $(this).html(countNumber);
        });
    });
    // ---------------

    // Portfolio section
    // shuffiling images
    var mixer = mixitup('#portfolio-shuffle');
    $("section.portfolio .prog-filter ul").on('click' , 'li' , function(){
        $(this).addClass("active").siblings().removeClass("active")
    });
    // ---------------

    // Skills Progress
    $(".skills .skill-field .skill-piece").each(function(){
        $(this).appear(function() {
            var liquid_load = $(this).children(".skill-loader").find("span.loader-liquid");
            var circle_load = $(this).children(".skill-loader").find("span.loader-value");
            liquid_load.css({
                width: liquid_load.data("progress")
            });
            circle_load.css({
                left: circle_load.text()
            })
        });
    });
    // ---------------

    // Counter
    $('.odometer').appear(function() {
        var odo = $(".odometer");
        odo.each(function() {
            var countNumber = $(this).attr("data-count");
            $(this).html(countNumber);
        });
    });
    // ---------------

    // Review Slider
    var review_image = new Swiper('.review-swiper-image', {
        effect: 'cards',
        loop: "true",
        grabCursor: true,
    });
    var review_text = new Swiper('.review-swiper-text', {
        spaceBetween: 30,
        allowTouchMove: false,
        loop: "true",
        effect: 'fade',
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
    });
    review_image.controller.control = review_text;
    review_text.controller.control = review_image;
    // ---------------

    // Contact Form Validation & Activation
    $("form.contact-form").submit(function (e) { 
        e.preventDefault(e);
        $.ajax({
        type: 'POST',
        url: $(this).attr('action'),
        data: $(this).serialize()
        })
        .done(function(response) {
            // Make sure that the formMessages div has the 'success' class.
            $('.contact-message').fadeIn();
            $('.contact-message').text(response);
            $("form").find("input:not(input[type='submit'])").val('');
            $("form").find("textarea").val('');
            $('.contact-message').delay(3000).fadeOut()
        })
        .fail(function(data) {
            // Set the message text.
            if (data.responseText !== '') {
                $('.contact-message').fadeIn();
                $('.contact-message').text(data.responseText);
                $("form").find("input:not(input[type='submit'])").val('');
                $("form").find("textarea").val('');
                $('.contact-message').delay(3000).fadeOut()
            } else {
                $('.contact-message').fadeIn();
                $('.contact-message').text('Oops! An error occured and your message could not be sent.');
                $("form").find("input:not(input[type='submit'])").val('');
                $("form").find("textarea").val('');
                $('.contact-message').delay(3000).fadeOut()
            }
        });
    });
    // ---------------
    
    // Fancy cursor
    var is_mobile = 'No';
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        is_mobile = 'Yes';
    }
    if (is_mobile == "No") {
        $(window).on('mousemove', function(e) {  
            $(".fancy-cursor-dot").css({
                'transform': "translate(" + e.clientX + "px," + e.clientY + "px)"
            });
            function delaying_cursor_circle() {     
                $(".fancy-cursor-circle").css({
                    'transform': "translate(" + e.clientX + "px," + e.clientY + "px)"
                });
            }
            setTimeout(delaying_cursor_circle, 25)
        });
        // Add hover class
        $('a, button, .cursor-pointer-hover').on('mouseenter', function() {
            $(".fancy-cursor-dot").css({
                width: "60px",
                height: "60px",
                marginTop: "-30px",
                marginLeft: "-30px",
                opacity: "0.5",
            });
            $(".fancy-cursor-circle").hide();
        });
        // Remove hover class
        $('a, button, .cursor-pointer-hover').on('mouseleave', function() {
            $(".fancy-cursor-dot").css({
                width: "5px",
                height: "5px",
                marginTop: "-2.5px",
                marginLeft: "-2.5px",
                opacity: "1"
            });
            $(".fancy-cursor-circle").show();
        });
        // ---------------
    } else {
        $(".fancy-cursor-dot").remove()
        $(".fancy-cursor-circle").remove()
    }

    $.getJSON("json/translation.json", function(data) {
        translations = data;
        let languageSelect = document.getElementById("language-select");
        languageSelect.addEventListener("change", function() {
            translate(languageSelect.value);
        });

        document.getElementById("language-select").style.visibility = "visible";
    });
});

function translate(lang) {
    try {
      document.getElementById("menu-home").textContent = translations.menu.home[lang];
      document.getElementById("menu-about").textContent = translations.menu.about[lang];
      document.getElementById("menu-activities").textContent = translations.menu.activities[lang];
      document.getElementById("menu-gallery").textContent = translations.menu.gallery[lang];
      document.getElementById("menu-trainers").textContent = translations.menu.trainers[lang];
      document.getElementById("menu-contact").textContent = translations.menu.contact[lang];

      document.getElementById("banner-title").textContent = translations.banner.title[lang];
      document.getElementById("banner-text-1").textContent = translations.banner.text1[lang];
      document.getElementById("banner-text-2").textContent = translations.banner.text2[lang];
      document.getElementById("banner-text-3").textContent = translations.banner.text3[lang];

      document.getElementById("about-title").innerHTML = translations.about.title[lang];
      document.getElementById("about-text").textContent = translations.about.text[lang];

      document.getElementById("activity-title").innerHTML = translations.activity.title[lang];
      document.getElementById("a1-title").textContent = translations.activity.a1title[lang];
      document.getElementById("a1-description").textContent = translations.activity.a1description[lang];
      document.getElementById("a2-title").textContent = translations.activity.a2title[lang];
      document.getElementById("a2-description").textContent = translations.activity.a2description[lang];
      document.getElementById("a3-title").textContent = translations.activity.a3title[lang];
      document.getElementById("a3-description").textContent = translations.activity.a3description[lang];
      document.getElementById("a4-title").textContent = translations.activity.a4title[lang];
      document.getElementById("a4-description").textContent = translations.activity.a4description[lang];
      document.getElementById("a5-title").textContent = translations.activity.a5title[lang];
      document.getElementById("a5-description").textContent = translations.activity.a5description[lang];
      document.getElementById("a6-title").textContent = translations.activity.a6title[lang];
      document.getElementById("a6-description").textContent = translations.activity.a6description[lang];

      document.getElementById("gallery-title").innerHTML = translations.gallery.title[lang];
      document.getElementById("gallery-all").textContent = translations.gallery.all[lang];
      document.getElementById("gallery-education").textContent = translations.gallery.education[lang];
      document.getElementById("gallery-activity").textContent = translations.gallery.activity[lang];
      document.getElementById("gallery-entertainment").textContent = translations.gallery.entertainment[lang];
      document.getElementById("gallery-title1").innerHTML  = translations.gallery.education[lang];
      document.getElementById("gallery-description1").innerHTML  = translations.gallery.images.description1[lang];
      document.getElementById("gallery-title2").innerHTML  = translations.gallery.activity[lang];
      document.getElementById("gallery-description2").innerHTML  = translations.gallery.images.description2[lang];
      document.getElementById("gallery-title3").innerHTML  = translations.gallery.education[lang];
      document.getElementById("gallery-description3").innerHTML  = translations.gallery.images.description3[lang];
      document.getElementById("gallery-title4").innerHTML  = translations.gallery.entertainment[lang];
      document.getElementById("gallery-description4").innerHTML  = translations.gallery.images.description4[lang];
      document.getElementById("gallery-title5").innerHTML  = translations.gallery.activity[lang];
      document.getElementById("gallery-description5").innerHTML  = translations.gallery.images.description5[lang];
      document.getElementById("gallery-title6").innerHTML  = translations.gallery.entertainment[lang];
      document.getElementById("gallery-description6").innerHTML  = translations.gallery.images.description6[lang];

      document.getElementById("trainers-title").innerHTML = translations.trainers.title[lang];
      document.getElementById("trainer1-profession").innerHTML = translations.trainers.profession1[lang];

      document.getElementById("contact-title").innerHTML = translations.contact.title[lang];
      document.getElementById("name-input").placeholder = translations.contact.form.name[lang];
      document.getElementById("email-input").placeholder = translations.contact.form.email[lang];
      document.getElementById("message-ta").placeholder = translations.contact.form.message[lang];
      document.getElementById("send-btn").innerText = translations.contact.form.send[lang];
    } catch (error) {
      console.error("translate(" + lang + "): " + error);
    }

}