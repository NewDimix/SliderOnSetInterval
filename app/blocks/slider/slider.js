function initSlider(slider, options) {
	const sliderLine = slider.querySelectorAll(".slider__content")[0];
	const slide = slider.getElementsByClassName("slider__item");
	const btnBack = slider.querySelectorAll(".slider__btn_back")[0];
	const btnForward = slider.querySelectorAll(".slider__btn_forward")[0];

	const dotsLine = document.createElement("div");
	dotsLine.classList.add("slider__dots", "dots");
	slider.appendChild(dotsLine);
	for (let i = 0; i < slide.length; i++) {
		const dotsItem = document.createElement("div");
		dotsItem.classList.add("dots__item");
		dotsLine.appendChild(dotsItem);
	}

	const dots = slider.getElementsByClassName("dots__item");

	let firstClone = slide[0].cloneNode(true);
	let lastClone = slide[slide.length - 1].cloneNode(true);

	sliderLine.appendChild(firstClone);
	sliderLine.insertBefore(lastClone, sliderLine.firstChild);

	sliderLine.style.width = slide.length * slider.offsetWidth + "px";

	window.addEventListener(
		`resize`,
		(event) => {
			sliderLine.style.width = slide.length * slider.offsetWidth + "px";
			sliderLine.style.left = -currentSlide * slide[0].offsetWidth + "px";
		},
		false
	);

	let currentSlide = 1;
	let currentDot = 0;
	dots[currentDot].classList.add("dots__item_active");

	sliderLine.style.left = -currentSlide * slide[0].offsetWidth + "px";

	let animationInterval;
	let status = "waiting";
	for (let i = 0; i < dots.length; i++) {
		dots[i].addEventListener("click", function () {
			if (status != "waiting" || currentDot == i) {
				return;
			}
			status = "animate";

			animation(i + 1, getPxValue(0.5));
			updateDots(i);
		});
	}

	btnBack.onclick = function () {
		if (status != "waiting") {
			return;
		}
		status = "animate";

		animation(currentSlide - 1, getPxValue(0.5));

		updateDots(currentDot - 1);
	};

	btnForward.onclick = function () {
		if (status != "waiting") {
			return;
		}
		status = "animate";

		animation(currentSlide + 1, getPxValue(0.5));

		updateDots(currentDot + 1);
	};

	function getPxValue(sec) {
		let pxValue = Math.round((slide[0].offsetWidth / 1000 / sec) * 10);
		return pxValue;
	}

	function animation(newSlide, px) {
		let direction;
		if (currentSlide < newSlide) {
			direction = -1;
		} else if (currentSlide > newSlide) {
			direction = 1;
		} else {
			return;
		}

		pxValue = Math.abs(Math.abs(currentSlide) - Math.abs(newSlide)) * px;

		let startLeft = -currentSlide * slide[0].offsetWidth;

		animationInterval = setInterval(function () {
			animationPlay();
		}, 10);

		function animationPlay() {
			startLeft = startLeft + pxValue * direction;

			if (direction == 1) {
				if (-newSlide * slide[0].offsetWidth <= startLeft) {
					currentSlide = newSlide;
					animationStop();
					return;
				}
			} else if (direction == -1) {
				if (-newSlide * slide[0].offsetWidth >= startLeft) {
					currentSlide = newSlide;
					animationStop();
					return;
				}
			}

			sliderLine.style.left = startLeft + "px";
		}

		function animationStop() {
			clearInterval(animationInterval);
			status = "waiting";
			checkSlide();
		}
	}

	function checkSlide() {
		if (currentSlide == slide.length - 1) {
			currentSlide = 1;
		} else if (currentSlide == 0) {
			currentSlide = slide.length - 2;
		}

		sliderLine.style.left = -currentSlide * slide[0].offsetWidth + "px";
	}

	function updateDots(newDot) {
		dots[currentDot].classList.remove("dots__item_active");

		if (newDot < 0) {
			currentDot = dots.length - 1;
		} else if (newDot > dots.length - 1) {
			currentDot = 0;
		} else {
			currentDot = newDot;
		}

		dots[currentDot].classList.add("dots__item_active");
	}
}

initSlider(document.querySelectorAll(".slider")[0]);
