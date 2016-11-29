import * as controls from './controls.js';

function settings() {

  var master_MW = new MasterControls('sine', 90, 80);
  var envelope_MW = new Envelope(5, 50, 50, 5);
  var crusher_MW = new Crusher(100, 0);
  var delay_MW = new Delay(50, 0);
  var chorus_MW = new Chorus(50, 50, 50);
  var milkyWay = new ControlSettings('Milky Way', master_MW, envelope_MW, crusher_MW, delay_MW, chorus_MW);

  var master_AN = new MasterControls('square', 50, 30);
  var envelope_AN = new Envelope(5, 50, 50, 5);
  var crusher_AN = new Crusher(100, 0);
  var delay_AN = new Delay(30, 60);
  var chorus_AN = new Chorus(50, 50, 50);
  var andromeda = new ControlSettings('Andromeda', master_AN, envelope_AN, crusher_AN, delay_AN, chorus_AN);

  var master_TR = new MasterControls('triangle', 75, 50);
  var envelope_TR = new Envelope(5, 50, 50, 5);
  var crusher_TR = new Crusher(100, 0);
  var delay_TR = new Delay(30, 60);
  var chorus_TR = new Chorus(50, 50, 50);
  var triangulum = new ControlSettings('Triangulum', master_TR, envelope_TR, crusher_TR, delay_TR, chorus_TR);

  var master_CA = new MasterControls('sawtooth', 60, 10);
  var envelope_CA = new Envelope(5, 50, 50, 5);
  var crusher_CA = new Crusher(100, 0);
  var delay_CA = new Delay(30, 60);
  var chorus_CA = new Chorus(50, 50, 50);
  var centaurus = new ControlSettings('Centaurus A', master_CA, envelope_CA, crusher_CA, delay_CA, chorus_CA);

  var sounds = [milkyWay, andromeda, triangulum, centaurus];

  return sounds;
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
