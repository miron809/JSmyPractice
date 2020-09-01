import { Slider } from './slider/slider';
import animal from './img/animal.jpg';
import animal2 from './img/animal2.jpg';
import animal3 from './img/animal3.jpg';

import human from './img/human.jpg';
import human2 from './img/human2.jpg';
import human3 from './img/human3.jpg';

import forest from './img/forest.jpg';
import forest2 from './img/forest2.jpg';

import sea from './img/sea.jpg';


const data = {
  animal: [
    `<img src=${animal} alt="">`,
    `<img src=${animal2} alt="">`,
    `<img src=${animal3} alt="">`,
  ],
  human: [
    `<img src=${human} alt="">`,
    `<img src=${human2} alt="">`,
    `<img src=${human3} alt="">`,
  ],
  forest: [
    `<img src=${forest} alt="">`,
    `<img src=${forest2} alt="">`,
  ],
  sea: [
    `<img src=${sea} alt="">`,
  ]
}


const slider = new Slider('#slider', data, {
  delay: 1000
} )

window.slider = slider;
