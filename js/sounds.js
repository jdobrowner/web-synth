import * as controls from './controls.js';

function settings() {

  var master = new MasterControls('sine', 45, 20, 0);
  var envelope = new Envelope(30, 10, 80, 25);
  var delay = new Delay(0, 0);
  var tremelo = new Tremelo('square', 0, 0);
  var sound = new ControlSettings('poo sound', master, envelope, delay, tremelo);

  return sound;
}

function ControlSettings(name, master, envelope, delay, tremelo) {
  this.name = name;
  this.master = master;
  this.envelope = envelope;
  this.delay = delay;
  this.tremelo = tremelo;
}

function MasterControls(shape, volume, reverb, distortion) {
  this.shape = shape;
  this.volume = volume;
  this.reverb = reverb;
  this.distortion = distortion;
}

function Envelope(attack, decay, sustain, release) {
  this.attack = attack;
  this.decay = decay;
  this.sustain = sustain;
  this.release = release;
}

function Delay(time, feedback) {
  this.time = time;
  this.feedback = feedback;
}

function Tremelo(shape, depth, frequency) {
  this.shape = shape;
  this.depth = depth;
  this.frequency = frequency;
}

module.exports.settings = settings;
