const carousel = document.getElementById('carousel');
const itemsWrapper = document.getElementById('carousel-items');
const prevBtn = document.getElementById('prev-button');
const nextBtn = document.getElementById('next-button');
const items = document.querySelectorAll('#carousel .carousel-item');

let itemsPerView = 3;
let position = 0;

let carouselWidth = carousel.offsetWidth;
let itemWidth = carouselWidth / itemsPerView;

// Set carousel items per view
function setItemsPerView() {
    items.forEach(item => {
        item.style.width = itemWidth + 'px';
    })
}


// Event listeners
prevBtn.addEventListener('click', () => {
    if (position < 0) {
        position += itemWidth;
        itemsWrapper.style.transform = `translateX(${position}px)`;
    }
});
nextBtn.addEventListener('click', () => {
    if (position > -(items.length * itemWidth - itemWidth * itemsPerView) ) {
        position -= itemWidth;
        itemsWrapper.style.transform = `translateX(${position}px)`;
    }
});


setItemsPerView();
