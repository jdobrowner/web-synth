var Tone = require('Tone');

var EventEmitter = require('events');
var toneTrigger = new EventEmitter();
var controller = new EventEmitter();

function synthInit(controls) {

  console.log(controls);

  var sourceOptions = {
    oscillator: { type: controls.master.shape },
    envelope: {
      attack: normalizeEnvelope(controls.envelope.attack),
      decay: normalizeEnvelope(controls.envelope.decay),
      sustain: normalizeEnvelope(controls.envelope.sustain),
      release: normalizeEnvelope(controls.envelope.release)
    }
  };

  var synth1 = new Tone.Synth(sourceOptions);
  var synth2 = new Tone.Synth(sourceOptions);
  var synth3 = new Tone.Synth(sourceOptions);
  var synth4 = new Tone.Synth(sourceOptions);
  var synth5 = new Tone.Synth(sourceOptions);
  var synth6 = new Tone.Synth(sourceOptions);
  var synth7 = new Tone.Synth(sourceOptions);
  var synth8 = new Tone.Synth(sourceOptions);
  var synthArray = [synth1, synth2, synth3, synth4, synth5, synth6, synth7, synth8];

  var distortion = new Tone.Distortion();
  var reverb = new Tone.Freeverb();
  var volume = new Tone.Volume();
  var delay = new Tone.FeedbackDelay();
  var tremolo = new Tone.Tremolo();


  synth1.chain(reverb, volume, Tone.Master);

  var synthStack = {
    synth1: '',
    synth2: '',
    synth3: '',
    synth4: '',
    synth5: '',
    synth6: '',
    synth7: '',
    synth8: ''
  };

  toneTrigger.on('trigger', function(note) {
    attachNote(note);
    findSynthToTrigger(note);
  });

  toneTrigger.on('release', function(note) {
    findSynthToRelease(note) ;
  });

  function attachNote(note) {
    if (synthStack.synth1 === '') synthStack.synth1 = note;
    else if (synthStack.synth2 === '') synthStack.synth2 = note;
    else if (synthStack.synth3 === '') synthStack.synth3 = note;
    else if (synthStack.synth4 === '') synthStack.synth4 = note;
    else if (synthStack.synth5 === '') synthStack.synth5 = note;
    else if (synthStack.synth6 === '') synthStack.synth6 = note;
    else if (synthStack.synth7 === '') synthStack.synth7 = note;
    else if (synthStack.synth8 === '') synthStack.synth8 = note;
  }

  function findSynthToTrigger(note) {
    for (var synth in synthStack) {
      if (synthStack[synth] === note) {
        triggerSynth(synth, note);
        break;
      }
    }
  }

  function findSynthToRelease(note) {
    for (var synth in synthStack) {
      if (synthStack[synth] === note) {
        releaseSynth(synth);
        synthStack[synth] = '';
        break;
      }
    }
  }

  function triggerSynth(synth, note) {
    switch (synth) {
      case 'synth1':
        synth1.triggerAttack(note);
        break;
      case 'synth2':
        synth2.triggerAttack(note);
        break;
      case 'synth3':
        synth3.triggerAttack(note);
        break;
      case 'synth4':
        synth4.triggerAttack(note);
        break;
      case 'synth5':
        synth5.triggerAttack(note);
        break;
      case 'synth6':
        synth6.triggerAttack(note);
        break;
      case 'synth7':
        synth7.triggerAttack(note);
        break;
      case 'synth8':
        synth8.triggerAttack(note);
        break;
      default: break;
    }
  }

  function releaseSynth(synth) {
    switch (synth) {
      case 'synth1':
        synth1.triggerRelease();
        break;
      case 'synth2':
        synth2.triggerRelease();
        break;
      case 'synth3':
        synth3.triggerRelease();
        break;
      case 'synth4':
        synth4.triggerRelease();
        break;
      case 'synth5':
        synth5.triggerRelease();
        break;
      case 'synth6':
        synth6.triggerRelease();
        break;
      case 'synth7':
        synth7.triggerRelease();
        break;
      case 'synth8':
        synth8.triggerRelease();
        break;
      default: break;
    }
  }

  controller.on('change', function(controlID, value) {
    updateSynthSound(controlID, value);
  });

  function updateSynthSound(controlID, value) {
    switch (controlID) {
      case 'shape':
        updateShape(value);
        break;
      case 'volume':
        var val = normalizeVolume(value);
        updateVolume(val);
        break;
      case 'reverb':
        var val = normalizeMaster(value);
        updateReverb(val);
        break;
      case 'distortion':
        var val = normalizeMaster(value);
        updateDistortion(val);
        break;
      case 'attack':
        var val = normalizeEnvelope(value);
        updateAttack(val);
        break;
      case 'decay':
        var val = normalizeEnvelope(value);
        updateDecay(val);
        break;
      case 'sustain':
        var val = normalizeEnvelope(value);
        updateSustain(val);
        break;
      case 'release':
        var val = normalizeEnvelope(value);
        updateRelease(val);
        break;
      case 'delay-time':
        var val = normalizeDelayTime(value);
        updateDelayTime(val);
        break;
      case 'delay-feedback':
        var val = normalizeDelayFeedback(value);
        updateDelayFeedback(val);
        break;
      case 'tremelo-shape':
        updateTremeloShape(value);
        break;
      case 'tremelo-depth':
        var val = normalizeTremeloDepth(value);
        updateTremeloDepth(val);
        break;
      case 'tremelo-frequency':
        var val = normalizeTremeloFrequency(value);
        updateTremeloFrequency(val);
        break;
      default: break;
    }
  }

  function updateShape(v) { synthArray.forEach( function(s) { s.oscillator.type = v; }); }
  function updateVolume(v) { synthArray.forEach( function(s) { volume.volume.input.value = v; }); }
  function updateReverb(v) { synthArray.forEach( function(s) {
    console.log(reverb);
    reverb.roomSize.input.value = v; 

  }); }
  function updateDistortion(v) { console.log( 'distortion = ' + v ); }
  function updateAttack(v) { synthArray.forEach( function(s) { s.envelope.attack = v; }); }
  function updateDecay(v) { synthArray.forEach( function(s) { s.envelope.decay = v; }); }
  function updateSustain(v) { synthArray.forEach( function(s) { s.envelope.sustain = v; }); }
  function updateRelease(v) { synthArray.forEach( function(s) { s.envelope.release = v; }); }
  function updateDelayTime(v) { console.log( 'delay time =' + v ); }
  function updateDelayFeedback(v) { console.log( 'delay feedback = ' + v ); }
  function updateTremeloShape(v) { console.log( 'tremelo shape = ' + v ); }
  function updateTremeloDepth(v) { console.log( 'tremelo depth = ' + v ); }
  function updateTremeloFrequency(v) { console.log( 'tremelo freq = ' + v ); }

  function applyToAllSynths() {

  }
}

function normalizeVolume(v) { return (v) * 0.02; } // range ? logarithmic function
function normalizeMaster(v) { return v * 0.01; } // range [0, 1]
function normalizeEnvelope(v) { return v * 0.03; } // range [0, 3]
function normalizeDelayTime(v) { return v * 0.02; } // range [0, 2]
function normalizeDelayFeedback(v) { return v * 0.008; } // range [0, 0.8]
function normalizeTremeloDepth(v) { return v * 0.02; } // range [0, 2]
function normalizeTremeloFrequency(v) { return (v * 0.1) + 1; } // range [1, 11]

module.exports.init = synthInit;
module.exports.trigger = toneTrigger;
module.exports.controller = controller;
