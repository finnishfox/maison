class Slider {
  constructor() {
    this.container = document.querySelector('.slider');
    this.buttonNext = this.container.querySelector('.slider__button--next');
    this.buttonPrev = this.container.querySelector('.slider__button--prev');
    this.slider = this.container.querySelector('.slider__wrapper');
    this.slidesNumber = this.slider.querySelectorAll('.slider__slide').length;
    this.slideNumberText = this.container.querySelector('.slider__number');
    this.circlesWrapper = this.container.querySelector('.slider__circles');
    this.circles=null;
    this.currentSlideIndex = 1;
    this.width = this.slider.clientWidth;
    this.maxTranslate = (this.slidesNumber) * (-this.width);
    this.blocked = false;
    this.hammer = new Hammer(this.container);

    this.init = this.init.bind(this);
    this.translate = this.translate.bind(this);
    this.copyFirstAndLastSlides = this.copyFirstAndLastSlides.bind(this);
    this.getX = this.getX.bind(this);
    this.translateBack = this.translateBack.bind(this);
    this.translateToInitial = this.translateToInitial.bind(this);
    this.translateToLast = this.translateToLast.bind(this);
    this.durationOn = this.durationOn.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.getNextSlide = this.getNextSlide.bind(this);
    this.getPrevSlide = this.getPrevSlide.bind(this);
    this.transitionEnded = this.transitionEnded.bind(this);
    this.setSlideNumberText = this.setSlideNumberText.bind(this);
    this.createCircles = this.createCircles.bind(this);

    this.init();
    this.initialX = this.getX(this.slider);

    this.buttonNext.addEventListener('click', this.getNextSlide);
    this.buttonPrev.addEventListener('click', this.getPrevSlide);
    this.slider.addEventListener('webkitTransitionEnd', this.transitionEnded);
    this.slider.addEventListener('transitionend', this.transitionEnded);
    this.hammer.on("swipeleft", this.getNextSlide);
    this.hammer.on("swiperight", this.getPrevSlide);
  }

  translate(x) {
    this.slider.style.transform = `translateX(${x - this.width}px)`;
  }

  init(){
    this.copyFirstAndLastSlides();
    this.createCircles();
    this.container.querySelector('.slider__circle').classList.add('slider__circle--active');
    this.setSlideNumberText();
  }

  copyFirstAndLastSlides() {
    this.translate(0);
    const firstSlideCopy = this.slider.firstElementChild.cloneNode(true);
    const lastSlideCopy = this.slider.lastElementChild.cloneNode(true);
    this.slider.appendChild(firstSlideCopy);
    this.slider.insertBefore(lastSlideCopy, this.slider.firstElementChild);
    setTimeout(this.durationOn, 50);
  }

  createCircles() {
    for (let i = 0; i < this.slidesNumber; i++) {
      let circle = document.createElement('div');
      circle.className = 'slider__circle';
      this.circlesWrapper.appendChild(circle);
    }
    this.circles = this.container.querySelectorAll('.slider__circle');
  }

  setSlideNumberText() {
    if (this.currentSlideIndex < 1) {
      this.currentSlideIndex = this.slidesNumber;
    } else if (this.currentSlideIndex > this.slidesNumber) {
      this.currentSlideIndex = 1;
    }
    this.slideNumberText.innerText = this.currentSlideIndex + ' of ' + this.slidesNumber;
  }


  getX(element) {
    const x = parseInt(window.getComputedStyle(element).transform.split(',')[4].trim(), 10);
    return x - (x % this.width);
  }

  translateBack(x) {
    this.slider.style.transform = `translateX(${x + this.width}px)`;
  }

  translateToInitial() {
    this.slider.classList.add('slider__wrapper--no-delay');
    this.slider.style.transform = 'translateX(-100%)';
    setTimeout(this.durationOn, 50);
  }

  translateToLast() {
    this.slider.classList.add('slider__wrapper--no-delay');
    this.slider.style.transform = `translateX(${this.maxTranslate}px)`;
    setTimeout(this.durationOn, 50);
  }

  durationOn() {
    this.enableButton();
    this.slider.classList.remove('slider__wrapper--no-delay');
  }

  disableButton() {
    this.blocked = true;
  }

  enableButton() {
    this.blocked = false;
  }

  getNextSlide() {
    if (this.blocked) return;
    this.circles[this.currentSlideIndex-1].classList.toggle('slider__circle--active');
    this.currentSlideIndex++;
    this.setSlideNumberText();
    this.circles[this.currentSlideIndex-1].classList.toggle('slider__circle--active');
    this.disableButton();
    const xPosition = this.getX(this.slider);
    if (xPosition === this.maxTranslate) {
      this.translate(xPosition);
      setTimeout(this.translateToInitial, 500);
    } else {
      this.translate(xPosition);
    }
  }


  getPrevSlide() {
    if (this.blocked) return;
    this.circles[this.currentSlideIndex-1].classList.toggle('slider__circle--active');
    this.currentSlideIndex--;
    this.setSlideNumberText();
    this.circles[this.currentSlideIndex-1].classList.toggle('slider__circle--active');
    this.disableButton();
    const xPosition = this.getX(this.slider);
    if (xPosition === this.initialX) {
      this.translateBack(xPosition);
      setTimeout(this.translateToLast, 500);
    } else {
      this.translateBack(xPosition);
    }
  }

  transitionEnded() {
    this.enableButton();
  }
}

new Slider();
