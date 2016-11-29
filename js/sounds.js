import * as controls from './controls.js';

function settings() {

  var master = new MasterControls('triangle', 50, 50);
  var envelope = new Envelope(5, 50, 50, 5);
  var crusher = new Crusher(100, 0);
  var delay = new Delay(50, 0);
  var chorus = new Chorus(50, 50, 50);
  var sound = new ControlSettings('poo sound', master, envelope, crusher, delay, chorus);

  return sound;
}

function ControlSettings(name, master, envelope, crusher, delay, chorus) {
  this.name = name;
  this.master = master;
  this.envelope = envelope;
  this.crusher = crusher;
  this.delay = delay;
  this.chorus = chorus;
}

function MasterControls(shape, volume, reverb) {
  this.shape = shape;
  this.volume = volume;
  this.reverb = reverb;
}

function Envelope(attack, decay, sustain, release) {
  this.attack = attack;
  this.decay = decay;
  this.sustain = sustain;
  this.release = release;
}

function Crusher(bits, filter) {
  this.bits = bits;
  this.filter = filter;
}

function Delay(time, feedback) {
  this.time = time;
  this.feedback = feedback;
}

function Chorus(depth, frequency, delay) {
  this.depth = depth;
  this.frequency = frequency;
  this.delay = delay;
}

module.exports.settings = settings;
