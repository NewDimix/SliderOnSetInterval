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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzbGlkZXIvc2xpZGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGluaXRTbGlkZXIoc2xpZGVyLCBvcHRpb25zKSB7XHJcblx0Y29uc3Qgc2xpZGVyTGluZSA9IHNsaWRlci5xdWVyeVNlbGVjdG9yQWxsKFwiLnNsaWRlcl9fY29udGVudFwiKVswXTtcclxuXHRjb25zdCBzbGlkZSA9IHNsaWRlci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwic2xpZGVyX19pdGVtXCIpO1xyXG5cdGNvbnN0IGJ0bkJhY2sgPSBzbGlkZXIucXVlcnlTZWxlY3RvckFsbChcIi5zbGlkZXJfX2J0bl9iYWNrXCIpWzBdO1xyXG5cdGNvbnN0IGJ0bkZvcndhcmQgPSBzbGlkZXIucXVlcnlTZWxlY3RvckFsbChcIi5zbGlkZXJfX2J0bl9mb3J3YXJkXCIpWzBdO1xyXG5cclxuXHRjb25zdCBkb3RzTGluZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcblx0ZG90c0xpbmUuY2xhc3NMaXN0LmFkZChcInNsaWRlcl9fZG90c1wiLCBcImRvdHNcIik7XHJcblx0c2xpZGVyLmFwcGVuZENoaWxkKGRvdHNMaW5lKTtcclxuXHRmb3IgKGxldCBpID0gMDsgaSA8IHNsaWRlLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRjb25zdCBkb3RzSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcblx0XHRkb3RzSXRlbS5jbGFzc0xpc3QuYWRkKFwiZG90c19faXRlbVwiKTtcclxuXHRcdGRvdHNMaW5lLmFwcGVuZENoaWxkKGRvdHNJdGVtKTtcclxuXHR9XHJcblxyXG5cdGNvbnN0IGRvdHMgPSBzbGlkZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImRvdHNfX2l0ZW1cIik7XHJcblxyXG5cdGxldCBmaXJzdENsb25lID0gc2xpZGVbMF0uY2xvbmVOb2RlKHRydWUpO1xyXG5cdGxldCBsYXN0Q2xvbmUgPSBzbGlkZVtzbGlkZS5sZW5ndGggLSAxXS5jbG9uZU5vZGUodHJ1ZSk7XHJcblxyXG5cdHNsaWRlckxpbmUuYXBwZW5kQ2hpbGQoZmlyc3RDbG9uZSk7XHJcblx0c2xpZGVyTGluZS5pbnNlcnRCZWZvcmUobGFzdENsb25lLCBzbGlkZXJMaW5lLmZpcnN0Q2hpbGQpO1xyXG5cclxuXHRzbGlkZXJMaW5lLnN0eWxlLndpZHRoID0gc2xpZGUubGVuZ3RoICogc2xpZGVyLm9mZnNldFdpZHRoICsgXCJweFwiO1xyXG5cclxuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcclxuXHRcdGByZXNpemVgLFxyXG5cdFx0KGV2ZW50KSA9PiB7XHJcblx0XHRcdHNsaWRlckxpbmUuc3R5bGUud2lkdGggPSBzbGlkZS5sZW5ndGggKiBzbGlkZXIub2Zmc2V0V2lkdGggKyBcInB4XCI7XHJcblx0XHRcdHNsaWRlckxpbmUuc3R5bGUubGVmdCA9IC1jdXJyZW50U2xpZGUgKiBzbGlkZVswXS5vZmZzZXRXaWR0aCArIFwicHhcIjtcclxuXHRcdH0sXHJcblx0XHRmYWxzZVxyXG5cdCk7XHJcblxyXG5cdGxldCBjdXJyZW50U2xpZGUgPSAxO1xyXG5cdGxldCBjdXJyZW50RG90ID0gMDtcclxuXHRkb3RzW2N1cnJlbnREb3RdLmNsYXNzTGlzdC5hZGQoXCJkb3RzX19pdGVtX2FjdGl2ZVwiKTtcclxuXHJcblx0c2xpZGVyTGluZS5zdHlsZS5sZWZ0ID0gLWN1cnJlbnRTbGlkZSAqIHNsaWRlWzBdLm9mZnNldFdpZHRoICsgXCJweFwiO1xyXG5cclxuXHRsZXQgYW5pbWF0aW9uSW50ZXJ2YWw7XHJcblx0bGV0IHN0YXR1cyA9IFwid2FpdGluZ1wiO1xyXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgZG90cy5sZW5ndGg7IGkrKykge1xyXG5cdFx0ZG90c1tpXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAoc3RhdHVzICE9IFwid2FpdGluZ1wiIHx8IGN1cnJlbnREb3QgPT0gaSkge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0XHRzdGF0dXMgPSBcImFuaW1hdGVcIjtcclxuXHJcblx0XHRcdGFuaW1hdGlvbihpICsgMSwgZ2V0UHhWYWx1ZSgwLjUpKTtcclxuXHRcdFx0dXBkYXRlRG90cyhpKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0YnRuQmFjay5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKHN0YXR1cyAhPSBcIndhaXRpbmdcIikge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHRzdGF0dXMgPSBcImFuaW1hdGVcIjtcclxuXHJcblx0XHRhbmltYXRpb24oY3VycmVudFNsaWRlIC0gMSwgZ2V0UHhWYWx1ZSgwLjUpKTtcclxuXHJcblx0XHR1cGRhdGVEb3RzKGN1cnJlbnREb3QgLSAxKTtcclxuXHR9O1xyXG5cclxuXHRidG5Gb3J3YXJkLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAoc3RhdHVzICE9IFwid2FpdGluZ1wiKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdHN0YXR1cyA9IFwiYW5pbWF0ZVwiO1xyXG5cclxuXHRcdGFuaW1hdGlvbihjdXJyZW50U2xpZGUgKyAxLCBnZXRQeFZhbHVlKDAuNSkpO1xyXG5cclxuXHRcdHVwZGF0ZURvdHMoY3VycmVudERvdCArIDEpO1xyXG5cdH07XHJcblxyXG5cdGZ1bmN0aW9uIGdldFB4VmFsdWUoc2VjKSB7XHJcblx0XHRsZXQgcHhWYWx1ZSA9IE1hdGgucm91bmQoKHNsaWRlWzBdLm9mZnNldFdpZHRoIC8gMTAwMCAvIHNlYykgKiAxMCk7XHJcblx0XHRyZXR1cm4gcHhWYWx1ZTtcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGFuaW1hdGlvbihuZXdTbGlkZSwgcHgpIHtcclxuXHRcdGxldCBkaXJlY3Rpb247XHJcblx0XHRpZiAoY3VycmVudFNsaWRlIDwgbmV3U2xpZGUpIHtcclxuXHRcdFx0ZGlyZWN0aW9uID0gLTE7XHJcblx0XHR9IGVsc2UgaWYgKGN1cnJlbnRTbGlkZSA+IG5ld1NsaWRlKSB7XHJcblx0XHRcdGRpcmVjdGlvbiA9IDE7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0cHhWYWx1ZSA9IE1hdGguYWJzKE1hdGguYWJzKGN1cnJlbnRTbGlkZSkgLSBNYXRoLmFicyhuZXdTbGlkZSkpICogcHg7XHJcblxyXG5cdFx0bGV0IHN0YXJ0TGVmdCA9IC1jdXJyZW50U2xpZGUgKiBzbGlkZVswXS5vZmZzZXRXaWR0aDtcclxuXHJcblx0XHRhbmltYXRpb25JbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0YW5pbWF0aW9uUGxheSgpO1xyXG5cdFx0fSwgMTApO1xyXG5cclxuXHRcdGZ1bmN0aW9uIGFuaW1hdGlvblBsYXkoKSB7XHJcblx0XHRcdHN0YXJ0TGVmdCA9IHN0YXJ0TGVmdCArIHB4VmFsdWUgKiBkaXJlY3Rpb247XHJcblxyXG5cdFx0XHRpZiAoZGlyZWN0aW9uID09IDEpIHtcclxuXHRcdFx0XHRpZiAoLW5ld1NsaWRlICogc2xpZGVbMF0ub2Zmc2V0V2lkdGggPD0gc3RhcnRMZWZ0KSB7XHJcblx0XHRcdFx0XHRjdXJyZW50U2xpZGUgPSBuZXdTbGlkZTtcclxuXHRcdFx0XHRcdGFuaW1hdGlvblN0b3AoKTtcclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSBpZiAoZGlyZWN0aW9uID09IC0xKSB7XHJcblx0XHRcdFx0aWYgKC1uZXdTbGlkZSAqIHNsaWRlWzBdLm9mZnNldFdpZHRoID49IHN0YXJ0TGVmdCkge1xyXG5cdFx0XHRcdFx0Y3VycmVudFNsaWRlID0gbmV3U2xpZGU7XHJcblx0XHRcdFx0XHRhbmltYXRpb25TdG9wKCk7XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRzbGlkZXJMaW5lLnN0eWxlLmxlZnQgPSBzdGFydExlZnQgKyBcInB4XCI7XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gYW5pbWF0aW9uU3RvcCgpIHtcclxuXHRcdFx0Y2xlYXJJbnRlcnZhbChhbmltYXRpb25JbnRlcnZhbCk7XHJcblx0XHRcdHN0YXR1cyA9IFwid2FpdGluZ1wiO1xyXG5cdFx0XHRjaGVja1NsaWRlKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBjaGVja1NsaWRlKCkge1xyXG5cdFx0aWYgKGN1cnJlbnRTbGlkZSA9PSBzbGlkZS5sZW5ndGggLSAxKSB7XHJcblx0XHRcdGN1cnJlbnRTbGlkZSA9IDE7XHJcblx0XHR9IGVsc2UgaWYgKGN1cnJlbnRTbGlkZSA9PSAwKSB7XHJcblx0XHRcdGN1cnJlbnRTbGlkZSA9IHNsaWRlLmxlbmd0aCAtIDI7XHJcblx0XHR9XHJcblxyXG5cdFx0c2xpZGVyTGluZS5zdHlsZS5sZWZ0ID0gLWN1cnJlbnRTbGlkZSAqIHNsaWRlWzBdLm9mZnNldFdpZHRoICsgXCJweFwiO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gdXBkYXRlRG90cyhuZXdEb3QpIHtcclxuXHRcdGRvdHNbY3VycmVudERvdF0uY2xhc3NMaXN0LnJlbW92ZShcImRvdHNfX2l0ZW1fYWN0aXZlXCIpO1xyXG5cclxuXHRcdGlmIChuZXdEb3QgPCAwKSB7XHJcblx0XHRcdGN1cnJlbnREb3QgPSBkb3RzLmxlbmd0aCAtIDE7XHJcblx0XHR9IGVsc2UgaWYgKG5ld0RvdCA+IGRvdHMubGVuZ3RoIC0gMSkge1xyXG5cdFx0XHRjdXJyZW50RG90ID0gMDtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGN1cnJlbnREb3QgPSBuZXdEb3Q7XHJcblx0XHR9XHJcblxyXG5cdFx0ZG90c1tjdXJyZW50RG90XS5jbGFzc0xpc3QuYWRkKFwiZG90c19faXRlbV9hY3RpdmVcIik7XHJcblx0fVxyXG59XHJcblxyXG5pbml0U2xpZGVyKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2xpZGVyXCIpWzBdKTtcclxuIl0sImZpbGUiOiJzbGlkZXIvc2xpZGVyLmpzIn0=
