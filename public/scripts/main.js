"use strict";

var pirateJs = {};

pirateJs.init = function () {
	pirateJs.modal();
	pirateJs.stars();
};

pirateJs.stars = function () {
	var vw = window.innerWidth;
	var vh = window.innerHeight;

	var textures = document.querySelectorAll(".star");
	var main = document.querySelector(".sky");
	var frag = document.createDocumentFragment();

	var appearMin = 0.3;
	var appearMax = 0.8;

	var delayMin = 2;
	var delayMax = 6;

	var durationMin = 0.3;
	var durationMax = 5;

	var numAnimations = 50;
	var numStars = 100;

	var stars = [];
	var eases = [];

	for (var i = 0; i < numAnimations; i++) {

		var ease = new RoughEase({
			template: Linear.easeNone,
			strength: random(1, 3),
			points: random(50, 200) | 0,
			taper: "both",
			randomize: true,
			clamp: true
		});

		eases.push(ease);
	}

	// Wait for images to load
	window.addEventListener("load", onLoad);

	function onLoad() {

		for (var i = 0; i < numStars; i++) {
			stars.push(createStar());
		}

		main.appendChild(frag);
	}

	function createStar() {

		var index = random(textures.length) | 0;
		var star = textures[index].cloneNode(true);
		frag.appendChild(star);

		TweenLite.set(star, {
			rotation: 0,
			xPercent: -50,
			yPercent: -50,
			scale: 0,
			x: random(vw),
			y: random(vh)
		});

		var tl = new TimelineMax({ repeat: -1, yoyo: true });

		for (var i = 0; i < numAnimations; i++) {

			var ease1 = eases[random(numAnimations) | 0];
			var ease2 = eases[random(numAnimations) | 0];

			var alpha = random(0.7, 1);
			var scale = random(0.15, 0.4);

			var appear = "+=" + random(appearMin, appearMax);
			var delay = "+=" + random(delayMin, delayMax);
			var duration1 = random(durationMin, durationMax);
			var duration2 = random(durationMin, durationMax);

			tl.to(star, duration1, { autoAlpha: alpha, scale: scale, ease: ease1 }, delay).to(star, duration2, { autoAlpha: 0, scale: 0, ease: ease2 }, appear);
		}

		tl.progress(random(1));

		return {
			element: star,
			timeline: tl
		};
	}

	function random(min, max) {
		if (max == null) {
			max = min;min = 0;
		}
		if (min > max) {
			var tmp = min;min = max;max = tmp;
		}
		return min + (max - min) * Math.random();
	}
};

pirateJs.modal = function () {
	// launch modal
	$('.about').on('click', function (e) {
		e.preventDefault();
		var docHeight = $(document).height();
		var topDistance = $(document).scrollTop();
		$('.modal-background').css('height', docHeight);
		$('.modal-wrapper').css('top', topDistance);
		$('.modal-background').fadeIn();
	});
	// close modal  
	$('.close-modal').on('click', function () {
		$('.modal-background').fadeOut();
	});
	// modal close on esc key
	document.addEventListener('keyup', function (e) {
		if (e.keyCode == 27) {
			$('.modal-background').fadeOut();
		}
	});
};

// doc ready
$(function () {
	pirateJs.init();
});