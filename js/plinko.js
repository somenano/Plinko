// Thanks to CodingTrain for the initial code of plinko:
// https://github.com/CodingTrain/website/tree/master/CodingChallenges/CC_062_plinko/P5

const nano_dot_height = 42;
const nano_dot_width = nano_dot_height*2.27;

function Plinko(x, y, r) {
  var options = {
    restitution: 1,
    friction: 0,
    isStatic: true,
  };
  this.body = Bodies.circle(x, y, r, options);
  this.body.label = 'plinko';
  this.r = r;
  World.add(world, this.body);
}

Plinko.prototype.show = function() {
  noStroke();
  // fill(249, 174, 66);  // bright orange
  // fill(74, 144, 226); // soft blue
  var pos = this.body.position;
  push();
  translate(pos.x, pos.y);
  // ellipse(0, 0, this.r * 2);
  image(nano_dot, (nano_dot_width)/(-2), nano_dot_height/(-2), nano_dot_width, nano_dot_height);
  pop();
};