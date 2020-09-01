const getHtmlTemplate = (data) => {
  const links = Object.keys(data).map((item, index) => {
    return `<li class="${index === 0 ? 'active' : ''}" data-accession="${item}">${item}</li>`
  })

  const content = Object.entries(data).map(([key, value], indx) => {
    const sliderItems = []
    value.forEach((slide, index) => {
      sliderItems.push(`
          <div class="slider__item ${indx === 0 && index === 0 ? 'active' : ''}" data-accession="${key}">
              ${slide}
          </div>
      `)
    })
    return sliderItems.join('');
  })

  return `
     <div class="slider__container">
        <ul class="slider__links">
            ${links.join('')}
        </ul>

        <div class="slider__slides">
            ${content.join('')}
        </div>
    </div>
  `
}

export class Slider {
  linksArr;
  itemsArr;
  interval;

  constructor(private $el, private data, private options) {
    this.render();
    this.initVars();
    this.start();
    this.clickToLinks();
  }

  private render() {
    this.$el = document.querySelector(this.$el);
    this.$el.innerHTML = getHtmlTemplate(this.data);
  }

  private initVars() {
    this.linksArr = this.$el.querySelectorAll('.slider__links li');
    this.itemsArr = this.$el.querySelectorAll('.slider__item');
  }

  private removeActive() {
    this.itemsArr.forEach(item => item.classList.remove('active'))
    this.linksArr.forEach(item => item.classList.remove('active'))
  }

  private addActive(i) {
    const dataAccession = this.itemsArr[i].dataset.accession;

    this.itemsArr[i].classList.add('active');
    this.linksArr.forEach(link => {
      if (link.dataset.accession === dataAccession) {
        link.classList.add('active');
      }
    })
  }

  private clickToLinks() {
    this.linksArr.forEach(link => {
      link.addEventListener('click', (event) => {
        this.clearInterval();

        let indexes = [];
        this.itemsArr.forEach((item, index) => {
          if (item.dataset.accession === event.target.dataset.accession) {
           indexes.push(index);
          }
        });

        this.start(indexes[0])
      })
    })
  }

  private clearInterval() {
    clearInterval(this.interval);
  }

  start(i= 0) {
    let indx = i;

    this.interval = setInterval( () => {
      if (indx < this.itemsArr.length) {
        this.removeActive();
        this.addActive(indx);
      } else {
        this.clearInterval();
        this.start();
      }
      indx++;
    }, this.options.delay)

  }

  stop() {
    this.clearInterval();
  }

  destroy() {
    this.$el.innerHTML = '';
  }


}
