/*
Design Name: Responsive Single Page with Bootsrap and Parallax
Site URI: thegoodartisan.com
Author: aljun
Description: A Design Mojo Demo Web HTML5, CSS3, JavaScript, JQuery, Bootsrap v3, Tweenmax, fancybox, mustache isotope, Personal Project only, Practice Coding, My Mojo My Passion.
repo: "https://github.com/jun20/single-web-page-design-feb-01.git"
Date: 2017
Version: 0.0.1
*/


$(function() {

	"use strict";

	var topOffset = 70;//variable for mnavgetion menu height
	
	var slideqty = $('#home .item').length;//count/check for images in carousel

	var wheight = $(window).height();//sukod sa window/viewport height	
	//var captionBoxHeight = $('.item.active .carousel-caption').height();
	var halfHeight = (wheight/2) - 100;	
	

	var randSlide = Math.floor(Math.random()*slideqty);//random slider display ang slider random
	$('#home .item').eq(randSlide).addClass('active');//add ang .active kay gi delete man didto sa eleemnt

	//mo effect lang ni kun nag refresh sa window browser
	$('.fullheight').css('height', wheight);//ang window viewpost parehas sa height sa element na nay class na fullheight
	$('.carousel-caption').css({
		'top': halfHeight	
	});//50% top height sa carousel caption


	//ilisan ang <img> element sa carousel with a background image
	$('#home .item img').each(function() {//pangita-on ang #home .item img
		//imgSrc - kuhaon ang attr src ibutang ani na variable
		var imgSrc = $(this).attr('src');//kinning img kuhaon ang attr na src
		$(this).parent().css({//kini na <img> element butangi og css ang iyang parent na element
			'height': wheight, //gi set nako daan ang height ani na element	
			'background-image': 'url(' + imgSrc + ')'
				
			});//parent sa <img> element kay si <div class="item">

		$(this).remove();//tang-tanga ang <img> element kay para di makita ang iyang element display
	});


	//window resize maski wala pa nag refresh sa browser window
	$(window).resize(function() {
		wheight = $(window).height(); 
			
		var halfHeight = (wheight/2) - 100;

		$('.fullheight').css('height', wheight);//set to window tallness
		$('.carousel-caption').css({
			'top': halfHeight	
		});//50% top height sa carousel caption		
	});


	//active scrollspy
	$('body').scrollspy({
		target: 'header .navbar',
		offset: topOffset
	});

	//add menuDown class
	var activeLink = $(this).find('li.active a').attr('href');//variable to get href value of current active nav
	if( activeLink !== '#home') {
		$('header nav').addClass('menuDown');
	} else {
		$('header nav').removeClass('menuDown');
	}
 

	//add menuDown class if event trigger by scrollspy
	$('.navbar-fixed-top').on('activate.bs.scrollspy', function () {

		var activeLink = $(this).find('li.active a').attr('href');//variable to get href value of current active nav
		if( activeLink !== '#home') {
			$('header nav').addClass('menuDown');
		} else {
			$('header nav').removeClass('menuDown');
		}
	 
	});
	
	//smooth scroll
	 //Use smooth scrolling when clicking on navigation
	  $('.navbar a[href*=#]:not([href=#])').click(function() {
	    if (location.pathname.replace(/^\//,'') === 
	      this.pathname.replace(/^\//,'') && 
	      location.hostname === this.hostname) {
	      var target = $(this.hash);
	      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	      if (target.length) {
	        $('html,body').animate({
	          scrollTop: target.offset().top-topOffset+2
	        }, 500);
	        return false;
	      } //target.length
	    } //click function
	  }); //smooth scrolling

	//with random slider
	for (var i=0; i < slideqty; i++) {
		var insertText = '<li data-target="#home" data-slide-to="' + i + '"';
		if(i === randSlide) {//kun parehas and i sa randSlide e add ang class="active"
			insertText += ' class="active" ';
			
		}
		insertText += '></li>';
		$('#home ol').append(insertText);
	  }  


	//slider
	$('#home').carousel({
		interval: '5000',
		pause: false
	});


	//client testimonials in Object to use mustache
	 $.getJSON('extra/client.json', function(data) {
        var box = $('#clientBoxTpl').html();
        var html = Mustache.to_html(box, data);


        //ibutang ang data adto sa div
        $('#clientSays').html(html);


         $('#clientCarousel').carousel({
          interval: 4000,
          pause: "false"
        });

	    $('#playButton').click(function () {
	        $('#clientCarousel').carousel('cycle');
	    });
	    $('#pauseButton').click(function () {
	        $('#clientCarousel').carousel('pause');
	    });


    });//getJSON
	

  //tween animation here
  var controller = new ScrollMagic({
      globalSceneOptions: {
        triggerHook: "onLeave"
      }
  });//controller

  //learn more at greensock.com/tweenmax
  //initialize
  var aboutOrigin = {
    bottom: -700,
    opacity: 0,
    scale: 0
  }

  var aboutDest = {
    repeat: 1,
    yoyo: true,
    botoom: 0,
    opacity: 1,
    scale: 1,
    ease: Back.easeOut
  }

  var aboutTween = TweenMax.staggerFromTo(
            "#about .right-wrapper",
            1,
            aboutOrigin,
            aboutDest
        );

  var pin = new ScrollScene({
            triggerElement: '#about',
            offset: -200,
            duration: 800
        }).setTween(aboutTween)
          .addTo(controller);


   //testimonials animation 
   var testimonialstween = TweenMax.staggerFromTo('#testimonials .clientBox',
        1, { 
              opacity: 1,
              scale: 0
           },
           { 
              delay: 1,
              ocacity: 1,
              scale: 1,
              ease: Back.easeOut
            });
   //trigger the anmation
   var scene = new ScrollScene({
            triggerElement: '#testimonials',
             offset: -topOffset,
          }).setTween(testimonialstween)
            .addTo(controller);
   
});
