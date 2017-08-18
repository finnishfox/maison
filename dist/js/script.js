class Categories {
  constructor() {
    this.toggleButton = document.querySelector('.categories__toggle-button');
    this.categories = document.querySelector('.categories__wrapper');

    this.toggleCategories = this.toggleCategories.bind(this);

    this.toggleButton.addEventListener('click', this.toggleCategories);
  }

  toggleCategories() {
    this.categories.classList.toggle('categories__wrapper--open');
  }
}

new Categories();

class Filter {
  constructor() {
    this.colors = document.querySelectorAll('.filter__color');
    this.categories = document.querySelectorAll('.filter__category');

    this.setColor = this.setColor.bind(this);
    this.setCategory = this.setCategory.bind(this);

    for (let i = 0; i < this.colors.length; i++) {
      this.colors[i].addEventListener('click', e => this.setColor(e));
    }

    for (let i = 0; i < this.categories.length; i++) {
      this.categories[i].addEventListener('click', e => this.setCategory(e));
    }
  }

  setColor(e) {
    const color = e.currentTarget;
    color.classList.toggle('filter__color--active');
  }

  setCategory(e){
    const category = e.currentTarget;
    category.classList.toggle('filter__category--selected');
  }
}

new Filter();
class FilterToggle {
  constructor() {
    this.toggleButton = document.querySelector('.filter__toggle-button');
    this.filter = document.querySelector('.filter__wrapper');

    this.toggleFilter = this.toggleFilter.bind(this);

    this.toggleButton.addEventListener('click', this.toggleFilter);
  }

  toggleFilter() {
    this.filter.classList.toggle('filter__wrapper--open');
  }
}

new FilterToggle();
class Range {
  constructor() {
    this.rangeSlider = document.querySelector('.filter__range');
    this.minValue = document.querySelector('.filter__value--min');
    this.maxValue = document.querySelector('.filter__value--max');

    this.init = this.init.bind(this);
    this.updateInputs = this.updateInputs.bind(this);
    this.updateLowHandle = this.updateLowHandle.bind(this);
    this.updateHighHandle = this.updateHighHandle.bind(this);

    this.init();

    this.rangeSlider.noUiSlider.on('slide', this.updateInputs);
    this.minValue.addEventListener('input', this.updateLowHandle);
    this.maxValue.addEventListener('input', this.updateHighHandle);
  }

  init() {
    noUiSlider.create(this.rangeSlider, {
      start: [30, 190],
      connect: true,
      range: {
        'min': 0,
        'max': 200
      },
      step: 1,
      format: {
        to: function (value) {
          return value;
        },
        from: function (value) {
          return value;
        }
      }
    });
  }

  updateInputs() {
    this.minValue.value = this.rangeSlider.noUiSlider.get()[0];
    this.maxValue.value = this.rangeSlider.noUiSlider.get()[1];
  }

  updateLowHandle() {
    if(this.minValue.value<0) this.minValue.value = 0;
    this.rangeSlider.noUiSlider.set([this.minValue.value, null]);
  }
  updateHighHandle() {
    this.rangeSlider.noUiSlider.set([null, this.maxValue.value]);
  }
}

new Range();
class Item {
  constructor() {
    //make hover work on touch devices
    document.querySelector('.items').addEventListener('touchstart', () => {
    });
  }
}

new Item();


class Navigation {
  constructor() {
    this.navigation = document.querySelector('.navigation');
    this.toggleButton = document.querySelector('.navigation__toggle-button');

    this.toggleMenu = this.toggleMenu.bind(this);

    this.toggleButton.addEventListener('click', this.toggleMenu);
  }


  toggleMenu() {
    this.toggleButton.classList.toggle('navigation__toggle-button--open');
    this.navigation.classList.toggle('navigation--open');
  }
}

new Navigation();
class Pagination {
  constructor() {
    this.currentPage = 0;
    this.pagination = document.querySelector('.pagination');
    this.pages = [...this.pagination.querySelectorAll('.pagination__page')];
    this.prevButton = this.pagination.querySelector('.pagination__prev-button');
    this.nextButton = this.pagination.querySelector('.pagination__next-button');

    this.selectPage = this.selectPage.bind(this);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);

    this.pages.forEach(page => {
        page.addEventListener('click', e => {
          this.selectPage(e.currentTarget);
        });
      }
    );

    this.nextButton.addEventListener('click', this.next);
    this.prevButton.addEventListener('click', this.prev);

  }

  selectPage(page) {
    this.currentPage = this.pages.indexOf(page);

    if (page === this.pages[0]) {
      this.prevButton.classList.add('pagination__prev-button--hidden');
      this.nextButton.classList.remove('pagination__next-button--hidden');
    } else if (page === this.pages[this.pages.length - 1]) {
      this.nextButton.classList.add('pagination__next-button--hidden');
      this.prevButton.classList.remove('pagination__prev-button--hidden');
    } else {
      this.prevButton.classList.remove('pagination__prev-button--hidden');
      this.nextButton.classList.remove('pagination__next-button--hidden');
    }

    this.pages.forEach(page => {
        page.classList.remove('pagination__page--active');
      }
    );

    page.classList.add('pagination__page--active');
  }

  next() {
    this.selectPage(this.pages[this.currentPage + 1]);
  }

  prev() {
    this.selectPage(this.pages[this.currentPage - 1]);
  }

}

new Pagination();
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
