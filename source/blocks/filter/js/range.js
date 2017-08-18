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