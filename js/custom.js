/*! A fix for the iOS orientationchange zoom bug. Script by @scottjehl, rebound by @wilto.MIT / GPLv2 License.*/(function(a){function m(){d.setAttribute("content",g),h=!0}function n(){d.setAttribute("content",f),h=!1}function o(b){l=b.accelerationIncludingGravity,i=Math.abs(l.x),j=Math.abs(l.y),k=Math.abs(l.z),(!a.orientation||a.orientation===180)&&(i>7||(k>6&&j<8||k<8&&j>6)&&i>5)?h&&n():h||m()}var b=navigator.userAgent;if(!(/iPhone|iPad|iPod/.test(navigator.platform)&&/OS [1-5]_[0-9_]* like Mac OS X/i.test(b)&&b.indexOf("AppleWebKit")>-1))return;var c=a.document;if(!c.querySelector)return;var d=c.querySelector("meta[name=viewport]"),e=d&&d.getAttribute("content"),f=e+",maximum-scale=1",g=e+",maximum-scale=10",h=!0,i,j,k,l;if(!d)return;a.addEventListener("orientationchange",m,!1),a.addEventListener("devicemotion",o,!1)})(this);

$(function() {
  
    // Main slider
			$(window).load(function() {
				$('.main_slider > ul').bxSlider({
					auto: true,
					pause: 4500,
					mode: 'fade'
	  			});
  			});
		    // Main slider height
					$(window).on('load resize', function () {
						var height = $(window).height();
						$('.main_slider, .main_slider .bx-wrapper, .main_slider .bx-viewport, .main_slider ul, .main_slider li, .main_slider li:before').height(height);
					});


	// Top menu navigation scroll
			$(window).on('load resize', function () {
				if( $(window).width() > 768)
				{
					$('.header nav li a').bind('click', function(event) {
						var $trigger = $(this);
						var headerHeight = $('.header nav').outerHeight();
						$('html, body').stop().animate({
							scrollTop : $($trigger.attr('href')).offset().top - headerHeight + "px"
						}, 1100, 'easeInOutCubic');
						event.preventDefault();
					});
					$(".header nav").show();
				} else {
					$('.header nav li a').bind('click', function(event) {
						var $trigger = $(this);
						$('html, body').stop().animate({
							scrollTop : $($trigger.attr('href')).offset().top
						}, 1100, 'easeInOutCubic');
						event.preventDefault();
						$('.menu_trigger').toggleClass('close');
						$('.header nav').fadeOut();
					});
					$(".header nav").hide();
				};
			});
			// show active state
					var section = $('section'), links = $('.header nav li a');
					$(window).scroll(function() {
						var currentPosition = $(this).scrollTop();
						links.removeClass('current');
						section.each(function() {
					        var top = $(this).offset().top - 15,
					            bottom = top + $(this).height();
					        if (currentPosition >= top && currentPosition <= bottom) {
					        	$('a[href="#' + this.id + '"]').addClass('current');
					    	}
						}); 
					});
			// make small on scroll
					$(window).on('scroll load', function () {
						var mainSliderHeight = $('.main_slider').outerHeight();
						if ($(this).scrollTop() >= mainSliderHeight) {
							$('.header').addClass('header_fixed');
						} else {
							$('.header').removeClass('header_fixed');
						}
					});


    // Button slide to section
			$('.button_slide').bind('click', function(event) {
				var $trigger = $(this);
				var headerHeight = $('.header nav').outerHeight();
				$('html, body').stop().animate({
					scrollTop : $($trigger.attr('href')).offset().top - headerHeight + "px"
				}, 1100, 'easeInOutCubic');
				event.preventDefault();
			});


    // Responsive menu trigger
			$(".menu_trigger").on('click', function(){
				$(this).toggleClass('close');
				$(this).parent().find('nav').fadeToggle();
			});

			
    // Show/hide input value
			$('input[type="text"], input[type="password"], input[type="email"]').each(function(){
				var valtxt = $(this).attr('value');
				$(this).focus(function() { if ($(this).val() == valtxt) {$(this).val('');} });
				$(this).blur(function() { if ($(this).val() == '') {$(this).val(valtxt);} });
			});


    // Contact map
			$(window).on('load resize', function () {
				// coordinates
				var latlng = new google.maps.LatLng(40.6555602, -73.9347019);
				// map options
				var mapOptions = {
					zoom: 14,
					center: latlng,
					mapTypeId: google.maps.MapTypeId.ROADMAP,
					disableDefaultUI: true,
					scrollwheel: false
				};
				var map = new google.maps.Map(document.getElementById('contact_map'), mapOptions);
				// pin image
				var image = 'images/icons/pin.png';
				// pin text 
				var contentString = '<div id="map-tooltip"><h5>We are here</h5></div>';
				var marker = new google.maps.Marker({
					position: latlng,
					map: map,
					title: 'We are here',
					icon: image
				});
				var infowindow = new google.maps.InfoWindow({
					content: contentString
				});
				google.maps.event.addListener(marker, 'click', function() {
					infowindow.open(map,marker);
			});
			});


    // Contact form
			$('#contact_form').validate({
				rules: {
					name: {required: true},
					email: {required: true, email: true},
					message: {required: true}
				},
				messages: {
					name: {required: "Enter your name please"},
					email: {required: "Enter your email please"},
					message: {required: "Enter your message please"}
				},
				submitHandler: function(form) {
					$(form).ajaxSubmit({
						type:"POST", data: $(form).serialize(), url:"contact.php", success: function() {
							$('#contact_form :input').attr('disabled', 'disabled');
							$('#contact_form').fadeTo( 400, 0.15, function() {
								$(this).find(':input').attr('disabled', 'disabled');
								$('#success').fadeIn();
							});
						},
						error: function() {
							$('#contact_form').fadeTo( 400, 0.15, function() {
								$('#error').fadeIn();
							});
						}
					});
				}
			});


    // Footer year
			var currentYear = (new Date).getFullYear();
			$(".footer span").text( (new Date).getFullYear() );


}); 