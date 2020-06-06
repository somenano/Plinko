// Thanks to CodingTrain for the initial code of plinko:
// https://github.com/CodingTrain/website/tree/master/CodingChallenges/CC_062_plinko/P5

// module aliases
var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;

var engine;
var world;
var particles = [];
var plinkos = [];
var bounds = [];

var natricon_images = {};

var plinko_radius = 15;
var spacing = 105;
var compartment_boundary_height = 100;
var compartment_boundary_width = 10;
var particle_radius = 35;
var nano_dot;

p5.disableFriendlyErrors = true; // disables FES -- performance

function preload() {
  try {
    nano_dot = loadImage('images/nano_dot.png');
  }
  catch (err) {
    console.error(err);
  }
}

function setup() {
  // createCanvas(800, 700);
  createCanvas(window.innerWidth, window.innerHeight);
  colorMode(RGB);
  engine = Engine.create();
  frameRate(30);
  world = engine.world;
  world.gravity.y = 2;

  // Set plinkos
  let x = 0;
  let y = 0;
  let num_rows = Math.floor((window.innerHeight - (2*compartment_boundary_height)) / spacing) + 1;
  if (num_rows % 2 == 1) {
    // Odd number of rows, offset first
    x = spacing/2;
  }

  while (y < window.innerHeight - (2*compartment_boundary_height)) {

    while (x < window.innerWidth) {

      var p = new Plinko(x, y, plinko_radius);
      plinkos.push(p);

      x += spacing;

    }

    if (x % spacing == 0) x = spacing/2;
    else x = 0;
    y += spacing;

  }

  // Set floor
  // var b = new Boundary(width / 2, height + 50, width, 100);
  // bounds.push(b);

  // Set compartment boundaries
  x = 0;
  y = height - compartment_boundary_height / 2;
  while (x < window.innerWidth) {
    var b = new Boundary(x, y, compartment_boundary_width, compartment_boundary_height);
    bounds.push(b);
    x += spacing;
  }
}

function newParticle(address) {

  if (Object.keys(natricon_images).indexOf(address) != -1) {

    var p = new Particle(window.innerWidth/2, particle_radius*-2, particle_radius, address);
    particles.push(p);
  
  } else {

    console.log('Natricon not found in cache, loading: '+ address);
    const path = get_natricon(address, 'svg');
    loadImage(path, function(img) {
      // console.debug('successful loadImage for '+ address);
      try {
        // Check if image loaded correctly
        image(img, window.innerWidth+128, 0);
      } catch(err) {
        // console.error(err);
        console.error('svg didnt load properly, trying png');
        loadImage(get_natricon(address, 'png'), function(png) {
          natricon_images[address] = png;
          newParticle(address);
        });
        return;
      }
      natricon_images[address] = img;
      newParticle(address);
    }, function(event) {
        console.error('failed to loadImage for '+ address);
        console.error(event);
    });
  }
}

function draw() {
  background(0, 0, 52);

  Engine.update(engine, 1000 / 30);
  for (var i = 0; i < particles.length; i++) {
    particles[i].show();
    if (particles[i].isOffScreen()) {
      World.remove(world, particles[i].body);
      particles.splice(i, 1);
      i--;
    }
  }
  for (var i = 0; i < plinkos.length; i++) {
    plinkos[i].show();
  }
  for (var i = 0; i < bounds.length; i++) {
    bounds[i].show();
  }

  textSize(32);
  text('SomeNano Plinko', 10, 30);
  textSize(12);
  text('Every falling head is a real-time Nano transaction.\nFollow me: @SomeNanoTweets', 10, 50);
  text('Frame rate: '+ frameRateSample.toFixed(0), 10, height-10);
}

function drop_test_natricon() {
  // This simply drops the binance cold wallet natricon
  newParticle('nano_3x4ui45q1cw8hydmfdn4ec5ijsdqi4ryp14g4ayh71jcdkwmddrq7ca9xzn9');
}

var frameRateSample = 0;
setInterval(function() {
  frameRateSample = frameRate();
}, 1*1000);