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

    this.carouselWidth      = null
    this.slideWidth         = null
    this.wrapperWidth       = null

    this.$wrapper           = this.$carousel.querySelector(`.${this.options.wrapperClass}`)
    this.$slides            = this.$carousel.querySelectorAll(`.${this.options.itemClass}`)
    this.$prevEl            = this.$carousel.querySelector(`#${this.options.navigation.prevElId}`)
    this.$nextEl            = this.$carousel.querySelector(`#${this.options.navigation.nextElId}`)

    this.position           = 0;
    this.currentSlide       = 0;

    this.init()

    if (this.autoStartDelay > 0) {
      this.interval = null;
      this.#setInterval();
    }

    if (this.startFrom > 0) {
      this.currentSlide = this.startFrom
      this.#goToSlide(this.startFrom)
    }
  }

  init() {
    this.#getCarouselWidth()
    this.#setItemsPerView()

    this.$prevEl.addEventListener('click', this.#movePrev.bind(this))
    this.$nextEl.addEventListener('click', this.#moveNext.bind(this))

    window.addEventListener('resize', () => {
      this.#getCarouselWidth()
      this.#setItemsPerView()
      this.#goToSlide(this.currentSlide)
    })
  }

  #getCarouselWidth() {
    this.carouselWidth      = this.$carousel.offsetWidth
    this.slideWidth         = +(this.carouselWidth / this.slidesPerView).toFixed(0)
    this.wrapperWidth       = +(this.$slides.length * this.slideWidth - this.slideWidth * this.slidesPerView).toFixed(0)
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
      this.currentSlide -= 1
      this.#goToPosition()
    } else if (this.loop) {
      this.#goToPosition(-this.wrapperWidth)
      this.currentSlide = this.$slides.length - this.slidesPerView
    }
  }

  #moveNext() {
    console.log('Position', this.position)
    console.log('Wrapper', this.wrapperWidth)

    if (this.position > -(this.wrapperWidth)) {
      this.position -= this.slideWidth;
      this.currentSlide += 1
      this.#goToPosition()
    } else if (this.loop) {
      this.#goToPosition(0)
      this.currentSlide = 0
    }
  }

  #setInterval() {
    this.loop = true

    this.interval = setInterval(() => {
      this.#moveNext()
    }, this.autoStartDelay)
  }

  #goToPosition(position = this.position) {
    this.position = position;
    this.#moveWrapper()
  }

  #goToSlide(number = this.position) {
    if (number > this.$slides.length - this.slidesPerView) {
      this.position = -this.wrapperWidth
      this.currentSlide = this.$slides.length - this.slidesPerView
    } else {
      this.position = -this.slideWidth * number;
    }
    this.#moveWrapper()
  }

  #moveWrapper() {
    this.$wrapper.style.transform = `translateX(${this.position}px)`;

    // console.log(this.currentSlide)
  }


}
