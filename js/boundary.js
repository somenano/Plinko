// Thanks to CodingTrain for the initial code of plinko:
// https://github.com/CodingTrain/website/tree/master/CodingChallenges/CC_062_plinko/P5

function Boundary(x, y, w, h) {
  var options = {
    isStatic: true
  };
  this.body = Bodies.rectangle(x, y, w, h, options);
  this.w = w;
  this.h = h;
  World.add(world, this.body);
}

Boundary.prototype.show = function() {
  fill(249, 174, 66);   // bright orange
  stroke(249, 174, 66); // bright orange
  // fill(74, 144, 226);   // soft blue
  // stroke(74, 144, 226); // soft blue
  var pos = this.body.position;
  push();
  translate(pos.x, pos.y);
  rectMode(CENTER);
  rect(0, 0, this.w, this.h);
  pop();
};