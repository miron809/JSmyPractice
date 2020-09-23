export class Carousel {
  defaultOptions = {
    itemClass: 'crsl-item',
    slidesPerView: 4,
    animation: 'fadeIn',
    autoStartDelay: 0,
    wrapperClass: 'crsl-wrapper',
    startFrom: 0,
    loop: true,
    navigation: {
      prevElId: 'crsl-button-prev',
      nextElId: 'crsl-button-next'
    }
  }


  constructor(element = '#crsl', options) {
    this.$carousel = document.querySelector(element)
    this.options = Object.assign(this.defaultOptions, options)

    this.slidesPerView      = this.options.slidesPerView
    this.animation          = this.options.animation
    this.autoStartDelay     = this.options.autoStartDelay
    this.startFrom          = this.options.startFrom
    this.loop               = this.options.loop

    this.carouselWidth      = this.$carousel.offsetWidth
    this.slideWidth         = this.carouselWidth / this.slidesPerView

    this.$wrapper           = this.$carousel.querySelector(`.${this.options.wrapperClass}`)
    this.$slides            = this.$carousel.querySelectorAll(`.${this.options.itemClass}`)
    this.$prevEl            = this.$carousel.querySelector(`#${this.options.navigation.prevElId}`)
    this.$nextEl            = this.$carousel.querySelector(`#${this.options.navigation.nextElId}`)

    this.position           = 0;
    this.wrapperWidth       = this.$slides.length * this.slideWidth - this.slideWidth * this.slidesPerView

    this.init()

    if (this.autoStartDelay > 0) {
      this.interval = null;
      this.#setInterval();
    }
  }

  init() {
    this.#setItemsPerView();

    this.$prevEl.addEventListener('click', this.#movePrev.bind(this))
    this.$nextEl.addEventListener('click', this.#moveNext.bind(this))
  }


  // Set carousel items per view
  #setItemsPerView() {
    this.$slides.forEach(slide => {
      slide.style.width = this.slideWidth + 'px';
    })
  }

  #movePrev() {
    if (this.position < 0) {
      this.position += this.slideWidth;
      this.#goToPosition()
    }

    if (this.loop) {
      if (this.position === 0) {
        this.#goToPosition(-this.wrapperWidth)
        this.addOneHiddenSlide()
      }
    }

    console.log(this.position)
  }

  #moveNext() {
    if (this.position > -(this.wrapperWidth)) {
      this.position -= this.slideWidth;
      this.#goToPosition()
    } else if (this.position < -(this.wrapperWidth)) {
      this.#goToPosition(0)
    }

    if (this.loop) {
      if (this.position === -(this.wrapperWidth)) {
        this.addOneHiddenSlide()
      }
    }


    console.log(this.position)
    console.log(-(this.wrapperWidth))
  }

  addOneHiddenSlide() {
    this.position -= this.slideWidth;
  }

  #setInterval() {
    this.loop = true

    this.interval = setInterval(() => {
      this.#moveNext()
    }, this.autoStartDelay)
  }

  #goToPosition(position = this.position) {
    this.position = position;
    this.$wrapper.style.transform = `translateX(${this.position}px)`;
  }

  #goToSlide(number = this.position) {
    this.position = this.slideWidth * number;
    this.$wrapper.style.transform = `translateX(${this.position}px)`;
  }


}
