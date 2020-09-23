//source code https://codepen.io/trhino/pen/JFmiK

/**
 * Generates random particles using canvas
 *
 * @class Particles
 * @constructor
 */
class Particles {

  constructor() {
    //particle colors
    this.colors = [
      '255, 255, 255',
      '255, 99, 71',
      '19, 19, 19'
    ]
    //adds gradient to particles on true
    this.blurry = true;
    //adds white border
    this.border = false;
    //particle radius min/max
    this.minRadius = 10;
    this.maxRadius = 35;
    //particle opacity min/max
    this.minOpacity = .005;
    this.maxOpacity = .5;
    //particle speed min/max
    this.minSpeed = .05;
    this.maxSpeed = 5;
    //frames per second
    this.fps = 60;
    //number of particles
    this.numParticles = 75;
    //required canvas variables
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
  }


  /**
   * Initializes everything
   * @method init
   */
  init(){
    this.render();
    this.createCircle();
  }

  /**
   * generates random number between min and max values
   * @param  {number} min value
   * @param  {number} max malue
   * @return {number} random number between min and max
   * @method #rand
   */
  static rand(min, max){
    return Math.random() * (max - min) + min;
  }

  /**
   * Sets canvas size and updates values on resize
   * @method render
   */
  render(){
    this.canvas.height = this.canvas.clientHeight;
    this.canvas.width = this.canvas.clientWidth;

    window.addEventListener('resize', this.render)
  }

  /**
   * Randomly creates particle attributes
   * @method createCircle
   */
  createCircle(){
    const particle = [];

    for (let i = 0; i < this.numParticles; i++) {
      const color = this.colors[~~(Particles.rand(0, this.colors.length))];

      particle[i] = {
        radius    : Particles.rand(this.minRadius, this.maxRadius),
        xPos      : Particles.rand(0, canvas.width),
        yPos      : Particles.rand(0, canvas.height),
        xVelocity : Particles.rand(this.minSpeed, this.maxSpeed),
        yVelocity : Particles.rand(this.minSpeed, this.maxSpeed),
        color     : 'rgba(' + color + ',' + Particles.rand(this.minOpacity, this.maxOpacity) + ')'
      }

      //once values are determined, draw particle on canvas
      this.draw(particle, i);
    }
    //...and once drawn, animate the particle
    this.animate(particle);
  }

  /**
   * Draws particles on canvas
   * @param  {array} Particle array from createCircle method
   * @param  {number} i value from createCircle method
   * @method draw
   */
  draw(particle, i){
    if (this.blurry === true ) {
      //creates gradient if blurry === true
      var grd = this.ctx.createRadialGradient(particle[i].xPos, particle[i].yPos, particle[i].radius, particle[i].xPos, particle[i].yPos, particle[i].radius/1.25);

      grd.addColorStop(1.000, particle[i].color);
      grd.addColorStop(0.000, 'rgba(34, 34, 34, 0)');
      this.ctx.fillStyle = grd;
    } else {
      //otherwise sets to solid color w/ opacity value
      this.ctx.fillStyle = particle[i].color;
    }

    if (this.border === true) {
      this.ctx.strokeStyle = '#fff';
      this.ctx.stroke();
    }

    this.ctx.beginPath();
    this.ctx.arc(particle[i].xPos, particle[i].yPos, particle[i].radius, 0, 2 * Math.PI, false);
    this.ctx.fill();
  }

  /**
   * Animates particles
   * @param  {array} particle value from createCircle & draw methods
   * @method animate
   */
  animate(particle){
    setInterval(() => {
      //clears canvas
      this.clearCanvas();
      //then redraws particles in new positions based on velocity
      for (var i = 0; i < this.numParticles; i++) {
        particle[i].xPos += particle[i].xVelocity;
        particle[i].yPos -= particle[i].yVelocity;

        //if particle goes off screen call reset method to place it offscreen to the left/bottom
        if (particle[i].xPos > this.canvas.width + particle[i].radius || particle[i].yPos > this.canvas.height + particle[i].radius) {
          this.resetParticle(particle, i);
        } else {
          this.draw(particle, i);
        }
      }
    }, 1000/this.fps);
  }

  /**
   * Resets position of particle when it goes off screen
   * @param  {array} particle value from createCircle & draw methods
   * @param  {number} i value from createCircle method
   * @method resetParticle
   */
  resetParticle(particle, i){
    const random = Particles.rand(0, 1);

    if (random > .5) {
      // 50% chance particle comes from left side of window...
      particle[i].xPos = -particle[i].radius;
      particle[i].yPos = Particles.rand(0, this.canvas.height);
    } else {
      //... or bottom of window
      particle[i].xPos = Particles.rand(0, this.canvas.width);
      particle[i].yPos = this.canvas.height + particle[i].radius;
    }
    //redraw particle with new values
    this.draw(particle, i);
  }

  /**
   * Clears canvas between animation frames
   * @method clearCanvas
   */
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }



}


// go go go!
const particle = new Particles().init();
