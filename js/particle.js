// Thanks to CodingTrain for the initial code of plinko:
// https://github.com/CodingTrain/website/tree/master/CodingChallenges/CC_062_plinko/P5

function Particle(x, y, r, address) {
  // this.hue = random(360);
  var options = {
    restitution: 0.5,
    friction: 10,
    density: 1,
  };
  x += random(-1*window.innerWidth/4, window.innerWidth/4);
  this.body = Bodies.circle(x, y, r, options);
  this.body.label = 'particle';
  this.r = r;
  this.address = address;
  World.add(world, this.body);
}

Particle.prototype.isOffScreen = function() {
  var x = this.body.position.x;
  var y = this.body.position.y;
  return x < -50 || x > width + 50 || y > height;
};

Particle.prototype.show = function() {
  // fill(this.hue, 255, 255);
  // noStroke();
  var pos = this.body.position;
  var rot = this.body.angle
  push();
  translate(pos.x, pos.y);
  angleMode(RADIANS);
  rotate(rot);
  // ellipse(0, 0, this.r * 2);
  image(natricon_images[this.address], -64, -64, 128, 128);
  pop();
};