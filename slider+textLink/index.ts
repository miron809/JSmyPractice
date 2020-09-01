import { Slider } from './slider/slider';
import animals1 from './img/animals1.jpg';
import animals2 from './img/animals2.jpg';
import animals3 from './img/animals3.jpg';
import animals4 from './img/animals4.jpg';
import animals5 from './img/animals5.jpg';

import people1 from './img/people1.jpg';
import people2 from './img/people2.jpg';
import people3 from './img/people3.jpg';
import people4 from './img/people4.jpg';
import people5 from './img/people5.jpg';

import music1 from './img/music1.jpg';
import music2 from './img/music2.jpg';
import music3 from './img/music3.jpg';

import education1 from './img/education1.jpg';
import education2 from './img/education2.jpg';
import education3 from './img/education3.jpg';


const data = {
  animals: [
    `<img src=${animals1} alt="">`,
    `<img src=${animals2} alt="">`,
    `<img src=${animals3} alt="">`,
    `<img src=${animals4} alt="">`,
    `<img src=${animals5} alt="">`,
  ],
  people: [
    `<img src=${people1} alt="">`,
    `<img src=${people2} alt="">`,
    `<img src=${people3} alt="">`,
    `<img src=${people4} alt="">`,
    `<img src=${people5} alt="">`,
  ],
  music: [
    `<img src=${music1} alt="">`,
    `<img src=${music2} alt="">`,
    `<img src=${music3} alt="">`,
  ],
  education: [
    `<img src=${education1} alt="">`,
    `<img src=${education2} alt="">`,
    `<img src=${education3} alt="">`,
  ]
}


const slider = new Slider('#slider', data, {
  delay: 2000,
  animation: 'animate__fadeIn'
} )
