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
            if ($(window).scrollTop() > $(this).offset().top - 500) {
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
    /*try {
        var mixer = mixitup('#portfolio-shuffle');
    } catch (error) {
        console.log("error: " + error);
    }
    $("section.portfolio .prog-filter ul").on('click' , 'li' , function(){
        $(this).addClass("active").siblings().removeClass("active")
    });*/
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

    $.getJSON("json/blog.json", function(data) {
        blogJson = data;
    });

    $.getJSON("json/translation.json", function(data) {
        translations = data;
        let languageSelect = document.getElementById("language-select");
        languageSelect.addEventListener("change", function() {
            translate(languageSelect.value);
        });

        document.getElementById("language-select").style.visibility = "visible";
    });

    document.getElementById("year").innerHTML = String(new Date().getFullYear());
});

function translate(lang) {
    translateMenu(lang);
    translateBanner(lang);
    translateAbout(lang);
    translateActivities(lang);
    translateTrainers(lang);
    translateBlogs(lang);
    translateCalendar(lang);
    translateContact(lang);
}

function translateMenu(lang) {
    try {
        document.getElementById("menu-home").textContent = translations.menu.home[lang];
        document.getElementById("menu-contact").textContent = translations.menu.contact[lang];
        document.getElementById("menu-about").textContent = translations.menu.about[lang];
        document.getElementById("menu-activities").textContent = translations.menu.activities[lang];
        document.getElementById("menu-trainers").textContent = translations.menu.trainers[lang];
    } catch (error) {
        console.log("Menu translation to " + lang + ", error: " + error);
    }

    try {
        document.getElementById("menu-gallery").textContent = translations.menu.gallery[lang];
    } catch (error) {
        console.log("Menu translation to " + lang + ", error: " + error);
    }

    try {
        document.getElementById("menu-calendar").textContent = translations.menu.calendar[lang];
    } catch (error) {
        console.log("Menu translation to " + lang + ", error: " + error);
    }
}

function translateBanner(lang) {
    try {
        document.getElementById("banner-title").textContent = translations.banner.title[lang];
        document.getElementById("banner-text-1").textContent = translations.banner.text1[lang];
        document.getElementById("banner-text-2").textContent = translations.banner.text2[lang];
        document.getElementById("banner-text-3").textContent = translations.banner.text3[lang];
    } catch (error) {
        console.log("Banner translation to " + lang + ", error: " + error);
    }
}

function translateAbout(lang) {
    try {
        document.getElementById("about-title").innerHTML = translations.about.title[lang];
        document.getElementById("about-text").textContent = translations.about.text[lang];
    } catch (error) {
        console.log("About translation to " + lang + ", error: " + error);
    }
}

function translateActivities(lang) {
    try {
        document.getElementById("activity-title").innerHTML = translations.activity.title[lang];
        document.getElementById("a1-title").textContent = translations.activity.a1title[lang];
        document.getElementById("a1-description").textContent = translations.activity.a1description[lang];
        document.getElementById("a2-title").textContent = translations.activity.a2title[lang];
        document.getElementById("a2-description").textContent = translations.activity.a2description[lang];
        document.getElementById("a3-title").textContent = translations.activity.a3title[lang];
        document.getElementById("a3-description").textContent = translations.activity.a3description[lang];
        /*document.getElementById("a4-title").textContent = translations.activity.a4title[lang];
        document.getElementById("a4-description").textContent = translations.activity.a4description[lang];
        document.getElementById("a5-title").textContent = translations.activity.a5title[lang];
        document.getElementById("a5-description").textContent = translations.activity.a5description[lang];
        document.getElementById("a6-title").textContent = translations.activity.a6title[lang];
        document.getElementById("a6-description").textContent = translations.activity.a6description[lang];*/
    } catch (error) {
        console.log("Activities translation to " + lang + ", error: " + error);
    }
}

function translateTrainers(lang) {
    try {
        document.getElementById("trainers-title").innerHTML = translations.trainers.title[lang];
        document.getElementById("trainer1-profession").innerHTML = translations.trainers.trainer1.profession[lang];
        document.getElementById("trainer1-description").innerHTML = translations.trainers.trainer1.description[lang];
        document.getElementById("trainer2-profession").innerHTML = translations.trainers.trainer2.profession[lang];
        document.getElementById("trainer2-description").innerHTML = translations.trainers.trainer2.description[lang];
        document.getElementById("trainer3-profession").innerHTML = translations.trainers.trainer3.profession[lang];
        document.getElementById("trainer3-description").innerHTML = translations.trainers.trainer3.description[lang];
        document.getElementById("trainer4-profession").innerHTML = translations.trainers.trainer4.profession[lang];
        document.getElementById("trainer4-description").innerHTML = translations.trainers.trainer4.description[lang];
        document.getElementById("trainer5-profession").innerHTML = translations.trainers.trainer5.profession[lang];
        document.getElementById("trainer5-description").innerHTML = translations.trainers.trainer5.description[lang];
    } catch (error) {
        console.log("Trainers translation to " + lang + ", error: " + error);
    }
}

function translateBlogs(lang) {
    try {
        document.getElementById("blog-title").innerHTML = translations.blogs.title[lang];

        document.getElementById("blog1-type").innerHTML = translations.blogs.fifaSummerCup2023.type[lang];
        document.getElementById("blog1-title").innerHTML = translations.blogs.fifaSummerCup2023.title[lang];
        document.getElementById("blog1-short-description").innerHTML = translations.blogs.fifaSummerCup2023.shortDescription[lang];

        document.getElementById("blog2-type").innerHTML = translations.blogs.guitarCourse.type[lang];
        document.getElementById("blog2-title").innerHTML = translations.blogs.guitarCourse.title[lang];
        document.getElementById("blog2-short-description").innerHTML = translations.blogs.guitarCourse.shortDescription[lang];

        document.getElementById("blog3-type").innerHTML = translations.blogs.chessCourse.type[lang];
        document.getElementById("blog3-title").innerHTML = translations.blogs.chessCourse.title[lang];
        document.getElementById("blog3-short-description").innerHTML = translations.blogs.chessCourse.shortDescription[lang];

        document.getElementById("blog4-type").innerHTML = translations.blogs.acGirlsSummerCup2023.type[lang];
        document.getElementById("blog4-title").innerHTML = translations.blogs.acGirlsSummerCup2023.title[lang];
        document.getElementById("blog4-short-description").innerHTML = translations.blogs.acGirlsSummerCup2023.shortDescription[lang];

        document.getElementById("blog5-type").innerHTML = translations.blogs.origamiCourse.type[lang];
        document.getElementById("blog5-title").innerHTML = translations.blogs.origamiCourse.title[lang];
        document.getElementById("blog5-short-description").innerHTML = translations.blogs.origamiCourse.shortDescription[lang];

        document.getElementById("blog6-type").innerHTML = translations.blogs.acSummerCup2023.type[lang];
        document.getElementById("blog6-title").innerHTML = translations.blogs.acSummerCup2023.title[lang];
        document.getElementById("blog6-short-description").innerHTML = translations.blogs.acSummerCup2023.shortDescription[lang];

        document.getElementById("blog7-type").innerHTML = translations.blogs.drivingCourse.type[lang];
        document.getElementById("blog7-title").innerHTML = translations.blogs.drivingCourse.title[lang];
        document.getElementById("blog7-short-description").innerHTML = translations.blogs.drivingCourse.shortDescription[lang];

        document.getElementById("blog8-type").innerHTML = translations.blogs.gridWinterCup2023.type[lang];
        document.getElementById("blog8-title").innerHTML = translations.blogs.gridWinterCup2023.title[lang];
        document.getElementById("blog8-short-description").innerHTML = translations.blogs.gridWinterCup2023.shortDescription[lang];

        document.getElementById("blog9-type").innerHTML = translations.blogs.gridGirlsWinterCup2023.type[lang];
        document.getElementById("blog9-title").innerHTML = translations.blogs.gridGirlsWinterCup2023.title[lang];
        document.getElementById("blog9-short-description").innerHTML = translations.blogs.gridGirlsWinterCup2023.shortDescription[lang];
    } catch (error) {
        console.log("Blog translation to " + lang + ", error: " + error);
    }

    try {
        document.getElementById("blog-more-title").innerHTML = translations.blogs.moreBlogs.title[lang];
        document.getElementById("blog-more-short-description").innerHTML = translations.blogs.moreBlogs.shortDescription[lang];
    } catch (error) {
        console.log("Blog translation to " + lang + ", error: " + error);
    }
}

function translateCalendar(lang) {
    try {
        document.getElementById("calendar-title").innerHTML = translations.menu.calendar[lang];
    } catch (error) {
        console.log("Calendar translation to " + lang + ", error: " + error);
    }
}

function translateContact(lang) {
    try {
        document.getElementById("contact-title").innerHTML = translations.contact.title[lang];
        document.getElementById("name-input").placeholder = translations.contact.form.name[lang];
        document.getElementById("email-input").placeholder = translations.contact.form.email[lang];
        document.getElementById("message-ta").placeholder = translations.contact.form.message[lang];
        document.getElementById("send-btn").innerText = translations.contact.form.send[lang];
    } catch (error) {
        console.log("Contact translation to " + lang + ", error: " + error);
    }
}

function calendarLoaded() {
    /*let calendarElement = document.getElementById("iframe-calendar");
    try {
        let calendarTable = calendarElement.contentWindow.document.getElementById("tgTable");
        console.log(calendarTable);
    } catch (error) {
        console.log(error);
    }
    console.log("calendar loaded");*/
}