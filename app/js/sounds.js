import * as controls from './controls.js';

function settings() {

  var master_MW = new MasterControls('sine', 65, 35);
  var envelope_MW = new Envelope(30, 90, 20, 50);
  var crusher_MW = new Crusher(100, 0);
  var delay_MW = new Delay(35, 80);
  var chorus_MW = new Chorus(0, 0, 0);
  var milkyWay = new ControlSettings('Milky Way', master_MW, envelope_MW, crusher_MW, delay_MW, chorus_MW);

  var master_AN = new MasterControls('square', 20, 60);
  var envelope_AN = new Envelope(3, 20, 0, 20);
  var crusher_AN = new Crusher(100, 0);
  var delay_AN = new Delay(100, 0);
  var chorus_AN = new Chorus(100, 40, 0);
  var andromeda = new ControlSettings('Andromeda', master_AN, envelope_AN, crusher_AN, delay_AN, chorus_AN);

  var master_TR = new MasterControls('triangle', 50, 50);
  var envelope_TR = new Envelope(3, 20, 100, 7);
  var crusher_TR = new Crusher(100, 0);
  var delay_TR = new Delay(40, 25);
  var chorus_TR = new Chorus(100, 100, 85);
  var triangulum = new ControlSettings('Triangulum', master_TR, envelope_TR, crusher_TR, delay_TR, chorus_TR);

  var master_CA = new MasterControls('sawtooth', 30, 35);
  var envelope_CA = new Envelope(3, 50, 100, 3);
  var crusher_CA = new Crusher(100, 0);
  var delay_CA = new Delay(100, 0);
  var chorus_CA = new Chorus(20, 90, 70);
  var centaurus = new ControlSettings('Centaurus A', master_CA, envelope_CA, crusher_CA, delay_CA, chorus_CA);

  var master_SM = new MasterControls('sine', 30, 35);
  var envelope_SM = new Envelope(3, 3, 100, 3);
  var crusher_SM = new Crusher(35, 100);
  var delay_SM = new Delay(100, 0);
  var chorus_SM = new Chorus(0, 100, 0);
  var sombrero = new ControlSettings('Sombrero', master_SM, envelope_SM, crusher_SM, delay_SM, chorus_SM);

  var master_PW = new MasterControls('sine', 70, 85);
  var envelope_PW = new Envelope(100, 20, 90, 3);
  var crusher_PW = new Crusher(100, 50);
  var delay_PW = new Delay(100, 0);
  var chorus_PW = new Chorus(15, 45, 55);
  var pinwheel = new ControlSettings('Pinwheel', master_PW, envelope_PW, crusher_PW, delay_PW, chorus_PW);

  var master_WP = new MasterControls('sine', 60, 85);
  var envelope_WP = new Envelope(100, 3, 100, 75);
  var crusher_WP = new Crusher(100, 0);
  var delay_WP = new Delay(90, 65);
  var chorus_WP = new Chorus(100, 100, 0);
  var whirlpool = new ControlSettings('Whirlpool', master_WP, envelope_WP, crusher_WP, delay_WP, chorus_WP);

  var sounds = [milkyWay, andromeda, triangulum, centaurus, sombrero, pinwheel, whirlpool];

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
