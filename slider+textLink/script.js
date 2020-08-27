const containersArr = document.querySelectorAll('.container');


function initSlider(container) {
    const slides = container.querySelectorAll('.slide');
    const links = container.querySelectorAll('.links li');

    console.log(slides)
    let i = 0;

    const interval = new Interval(i, slides.length, slides, links)




    container.querySelector('.links').addEventListener('click', (event) => {
        const accession = event.target.dataset.accession;
        if (accession) {
            interval.startNewInterval(accession)

        }
    })


}

class Interval {
    constructor(idx, length, slides, links) {
        this.idx = idx;
        this.length = length;
        this.slides = [...slides];
        this.links = [...links];
    }

    interval = setInterval(() => {
        if (this.idx < this.length) {
            this.slides.map(el => {
                el.classList.remove('active');
            });
            this.slides[this.idx].classList.add('active')
            const accession = this.slides[this.idx].dataset.accession;

            this.links.map(el => {
                el.classList.remove('active');
                if (el.dataset.accession === accession) {
                    el.classList.add('active');
                }
            })

        } else {
            this.idx = -1
        }
        this.idx++;
    }, 1000);

    stopInterval() {
        clearInterval(this.interval)
    }

    startNewInterval(accession) {
        this.stopInterval();

        console.log(accession)

        this.slides.find(el => el.classList.remove('active'));

        const newActiveSlide = this.slides.find( (el, i) => {
            if (el.dataset.accession === accession) {
                el.classList.add('active');
                this.idx = i;
                return el;
            }
        })

        console.log(newActiveSlide)

    }
}

containersArr.forEach(container => {
    initSlider(container)
});
