let windowWidth = $(window).width();

const themeDropdown = function (e) {
	if ($('[theme-action=dropdown]').attr('theme-position')) {
		$('[theme-action=dropdown]').addClass($('[theme-action=dropdown]').attr('theme-position'));
	} else {
		$('[theme-action=dropdown]').addClass('left');
	}
	
	$('[theme-action=dropdown] > a').click(function (e) {
		e.stopPropagation();
		$('[theme-action=dropdown]').removeClass('show');
		let elm = $(this).parent();
		if (elm.is('.show')) {
			elm.removeClass('show');
			if (windowWidth > 991)
				elm.closest('.table-responsive').css('overflow', 'auto');
		} else {
			elm.addClass('show');
			if (windowWidth > 991)
				elm.closest('.table-responsive').css('overflow', 'inherit');
		}
	});
	
	$(document).mouseup(function (e) {
		let elm = $('[theme-action=dropdown]');
		elm.is(e.target) || 0 !== elm.has(e.target).length || (
			elm.removeClass('show')
		)
	})
}

const closeMessege = function (e) {
	$('[theme-action=dismiss-messege]').click(function (e) {
		e.stopPropagation();
		$(this).parent().fadeOut(250, function () {
			$(this).remove();
		});
	});
}

const changeLocation = function (e) {
	$('[theme-action=location]').click(function (e) {
		e.stopPropagation();
		let elm = $(this).closest('[theme-parent=location]');
		elm.find('[theme-id=setLocation] > span').text($(this).attr('data-value'));
		elm.removeClass('show');
	});
}

function handleTouchMove(ev) {
	if (!$(ev.target).closest('.body-dashboard #header').length) {
		ev.preventDefault();
	}
}

const themeNavigation = function (e) {
	let elm = $('#navigation');
	$('[theme-action=navigation]').click(function (e) {
		e.stopPropagation();
		$(this).removeClass('no-animation');
		if (elm.is('.show')) {
			elm.removeClass('show');
			document.removeEventListener('touchmove', handleTouchMove);
			$('body').css('overflow', '');
		} else {
			elm.addClass('show');
			document.addEventListener('touchmove', handleTouchMove, {passive: false});
			$('body').css('overflow', 'hidden');
		}
	});
	
	$('[theme-action=overlay]').click(function () {
		$(this).parent().removeClass('show');
		$('body').css('overflow', '');
	})
}

const initSelect2_only = function () {
	$('[theme-action=select2-only]').each(function () {
		$(this).select2({
			dropdownParent: $(this).parent()
		});
	});
}

const viewPass = function () {
	$('[theme-action=view-pass] > a').click(function () {
		if ($(this).parent().hasClass('show-pass')) {
			$(this).parent().removeClass('show-pass');
			$(this).parent().find('input').attr('type', 'password');
			$(this).html('<i class="fas fa-eye"></i>');
		} else {
			$(this).parent().addClass('show-pass');
			$(this).parent().find('input').attr('type', 'text');
			$(this).html('<i class="fas fa-eye-slash"></i>');
		}
	});
}

const showEdit = function () {
	$('[theme-action=edit] a').click(function () {
		$(this).closest('[theme-action=edit]').toggleClass('show');
		$(this).tooltip('hide');
	});
}

function handleTouchMoveHeader(ev) {
	if (!$(ev.target).closest('#header').length) {
		ev.preventDefault();
	}
}

const callMenuMobile = function () {
	let windowWidth = $(window).width();
	if (windowWidth < 992) {
		$("#header .header-bottom .header-bottom_bar > ul > .sub-menu > .header-bottom_bar__child").each(function (index) {
			$(this).prev().attr({
				"href": "#collapseNavigation" + index,
				"data-toggle": "collapse"
			});
			$(this).wrap(`<div class="collapse" data-parent="#collapseNavigation" id="collapseNavigation${index}"></div>`);
		})
	}
}
$(function () {
	themeDropdown();
	closeMessege();
	changeLocation();
	themeNavigation();
	initSelect2_only();
	viewPass();
	showEdit();
	
	$('[data-toggle="tooltip"]').tooltip();
	
	if ($('#canvas-js').length > 0) {
		particlesJS("canvas-js", {
			"particles": {
				"number": {
					"value": 40,
					"density": {
						"enable": false,
						"value_area": 100
					}
				},
				"color": {
					"value": "#fff"
				},
				"shape": {
					"type": "circle",
					"stroke": {
						"width": 0,
						"color": "#000000"
					},
					"polygon": {
						"nb_sides": 5
					},
					"image": {
						"src": "img/github.svg",
						"width": 100,
						"height": 100
					}
				},
				"opacity": {
					"value": 0.5,
					"random": true,
					"anim": {
						"enable": false,
						"speed": 1,
						"opacity_min": 0.1,
						"sync": false
					}
				},
				"size": {
					"value": 5,
					"random": true,
					"anim": {
						"enable": false,
						"speed": 40,
						"size_min": 0.1,
						"sync": false
					}
				},
				"line_linked": {
					"enable": false,
					"distance": 500,
					"color": "#ffffff",
					"opacity": 0.4,
					"width": 2
				},
				"move": {
					"enable": true,
					"speed": 1.5,
					"direction": "bottom",
					"random": false,
					"straight": false,
					"out_mode": "out",
					"bounce": false,
					"attract": {
						"enable": false,
						"rotateX": 600,
						"rotateY": 1200
					}
				}
			},
			"interactivity": {
				"detect_on": "canvas",
				"events": {
					"onhover": {
						"enable": false,
						"mode": "bubble"
					},
					"onclick": {
						"enable": false,
						"mode": "repulse"
					},
					"resize": true
				},
				"modes": {
					"grab": {
						"distance": 400,
						"line_linked": {
							"opacity": 0.5
						}
					},
					"bubble": {
						"distance": 400,
						"size": 4,
						"duration": 0.3,
						"opacity": 1,
						"speed": 3
					},
					"repulse": {
						"distance": 200,
						"duration": 0.4
					},
					"push": {
						"particles_nb": 4
					},
					"remove": {
						"particles_nb": 2
					}
				}
			},
			"retina_detect": true
		});
	}
	
	if (windowWidth >= 992) {
		$('.hover-description').hover(function () {
			let id = $(this).attr('data-id');
			$(this).closest('.header-bottom_bar__child').find('ul.bar-child_description li').removeClass('active');
			$('#' + id).addClass('active');
		});
	}
	
	callMenuMobile();
	$('.callNavigation, .closeNavigation').click(function () {
		if ($('#header').hasClass('active')) {
			document.removeEventListener('touchmove', handleTouchMoveHeader);
			$('body').css('overflow', '');
			$('#header').removeClass('active');
		} else {
			document.addEventListener('touchmove', handleTouchMoveHeader, {passive: false});
			$('body').css('overflow', 'hidden');
			$('#header').addClass('active');
		}
	});
	
	$(document).on("mouseup", function (e) {
		var o = $(".header.active .header-bottom_bar");
		o.is(e.target) || 0 !== o.has(e.target).length || (
			$(".header.active").removeClass('active'),
				document.removeEventListener('touchmove', handleTouchMoveHeader),
				$('body').css('overflow', ''))
	});
	
	$('.toggleLanguage').click(function () {
		if ($('#language-popup').hasClass('show')) {
			document.removeEventListener('touchmove', handleTouchMoveHeader);
			$('body').css('overflow', '');
			$('#language-popup').removeClass('show');
		} else {
			document.addEventListener('touchmove', handleTouchMoveHeader, {passive: false});
			$('body').css('overflow', 'hidden');
			$('#language-popup').addClass('show');
		}
	});
	
	$('.callDropdownUser').click(function () {
		let _id = $(this).attr('data-id');
		$('#' + _id).addClass('active');
	});
	
	$(document).on("mouseup", function (e) {
		var o = $(".dropdown-user.active");
		o.is(e.target) || 0 !== o.has(e.target).length || (
			$(".dropdown-user.active").removeClass('active'))
	});
	
	const slideDomain = new Swiper('#slide-domain', {
		loop: true,
		speed: 1000,
		spaceBetween: 30,
		autoplay: {
			delay: 8000,
			disableOnInteraction: false,
		},
		breakpoints: {
			320: {
				slidesPerView: 1,
				slidesPerGroup: 1,
			},
			600: {
				slidesPerView: 2,
				slidesPerGroup: 2,
			},
			991: {
				slidesPerView: 3,
				slidesPerGroup: 3,
			}
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
	});
	
	const slideService = new Swiper('#slide-service', {
		loop: true,
		speed: 1000,
		spaceBetween: 15,
		autoplay: {
			delay: 8000,
			disableOnInteraction: false,
		},
		breakpoints: {
			320: {
				slidesPerView: 1.1,
			},
			768: {
				slidesPerView: 2.1,
			},
			991: {
				slidesPerView: 3.1,
			},
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
	});
	
	$('.toggle-dropdown').click(function (e) {
		$(this).parent().toggleClass('active');
	});
	
	$(document).on("mouseup", function (e) {
		var o = $(".price-dropdown.active");
		o.is(e.target) || 0 !== o.has(e.target).length || (
			$(".price-dropdown.active").removeClass('active'))
	});
	
	$('.callPriceEN').click(function (e) {
		if ($(this).hasClass("active") && $('.price-dropdown__en').is(':visible')) {
			return true;
		} else {
			$(this).closest('ul').find('li a').removeClass("active");
			$(this).addClass("active");
			$('.price-dropdown__vi').hide();
			$('.price-dropdown__en').show();
		}
	});
	
	$('.callPriceVI').click(function (e) {
		if ($(this).hasClass("active") && $('.price-dropdown__vi').is(':visible')) {
			return true;
		} else {
			$(this).closest('ul').find('li a').removeClass("active");
			$(this).addClass("active");
			$('.price-dropdown__en').hide();
			$('.price-dropdown__vi').show();
		}
	});
	
	$('#callModalPrice, .modalPrice-close').click(function () {
		if ($('#modalPrice').hasClass('active')) {
			$('#modalPrice').removeClass('active');
			setTimeout(function () {
				$('body').css("overflow", '');
			}, 100)
		} else {
			$('#modalPrice').addClass('active');
			setTimeout(function () {
				$('body').css("overflow", 'hidden');
			}, 100);
		}
	});
	
	$('.scrollPage').click(function (e) {
		e.stopPropagation();
		$('body').animate({
			'scrollTop': $('.' + $(this).attr('data-class')).offset().top
		}, 500)
	});
	
	if ($('#slideHosting').length > 0) {
		const slideHosting = new Swiper('#slideHosting', {
			speed: 1000,
			spaceBetween: 20,
			slidesPerView: 1.3,
			centeredSlides: true,
			loop: false,
			on: {
				init: function (e) {
					$(e.slides[e.activeIndex + 1]).addClass('zoomSlide');
				},
			}
		}).slideNext(2);
	}
});