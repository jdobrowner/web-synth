var Tone;
var EventEmitter = require('events');
var toneTrigger = new EventEmitter();
var controller = new EventEmitter();

function synthInit(controls) {
  try {
    console.log('in try');
    Tone = require('Tone');
    synthSetup(controls);
  }
  catch(e) {
    console.log('in catch');
    $('.shitty-browser').text('Your browser does not support the Web Audio API. Use a recent version of Google Chrome.');
  }
}



var loadPatch;

function synthSetup(controls) {

  var synth1 = new Tone.Synth();
  var synth2 = new Tone.Synth();
  var synth3 = new Tone.Synth();
  var synth4 = new Tone.Synth();
  var synth5 = new Tone.Synth();
  var synth6 = new Tone.Synth();
  var synth7 = new Tone.Synth();
  var synth8 = new Tone.Synth();
  var synthArray = [synth1, synth2, synth3, synth4, synth5, synth6, synth7, synth8];

  var distortion = new Tone.BitCrusher();
  var reverb = new Tone.Freeverb();
  var volume = new Tone.Volume();
  var delay = new Tone.FeedbackDelay( { wet: 0 });
  var chorus = new Tone.Chorus();
  var compressor = new Tone.Compressor(-30, 3);

  function loadSoundPatch(controls) {
    synthArray.forEach( function(s) {
      s.oscillator.type = controls.master.shape;
      s.envelope.attack = normalizeEnvelope(controls.envelope.attack);
      s.envelope.decay = normalizeEnvelope(controls.envelope.decay);
      s.envelope.sustain = normalizeSustain(controls.envelope.sustain);
      s.envelope.release = normalizeEnvelope(controls.envelope.release);
    });
    volume.volume.input.value = normalizeVolume(controls.master.volume);
    reverb.roomSize.input.value = normalizeReverb(controls.master.reverb);
    distortion.bits = normalizeBits(controls.crusher.bits);
    distortion.wet.value = normalizeFilter(controls.crusher.filter);
    delay.delayTime.value = normalizeDelayTime(controls.delay.time);
    var v = normalizeDelayFeedback(controls.delay.feedback);
    delay.feedback.value = v * 0.8;
    delay.wet.value = v * 0.5;
    chorus.depth = normalizeChorusDepth(controls.chorus.depth);
    chorus.frequency.value = normalizeChorusFrequency(controls.chorus.frequency);
    chorus.delayTime = normalizeDelayTime(controls.chorus.delay);
  }
  loadSoundPatch(controls);
  loadPatch = loadSoundPatch; // to be exported and used when a different sound patch is chosen

  synthArray.forEach( function(s) {
    s.chain(chorus, distortion, compressor, delay, reverb, volume, Tone.Master);
  });

  console.log(synth1);

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
    var val;
    switch (controlID) {
      case 'shape':
        updateShape(value);
        break;
      case 'volume':
        console.log( 'volume', value );
        val = normalizeVolume(value);
        updateVolume(val);
        break;
      case 'reverb':
        console.log( 'reverb', value );
        val = normalizeReverb(value);
        updateReverb(val);
        break;
      case 'attack':
        console.log( 'attack', value );
        val = normalizeEnvelope(value);
        updateAttack(val);
        break;
      case 'decay':
        console.log( 'decay', value );
        val = normalizeEnvelope(value);
        updateDecay(val);
        break;
      case 'sustain':
        console.log( 'sustain', value );
        val = normalizeSustain(value);
        updateSustain(val);
        break;
      case 'release':
        console.log( 'release', value );
        val = normalizeEnvelope(value);
        updateRelease(val);
        break;
      case 'bits':
        console.log( 'bits', value );
        val = normalizeBits(value);
        updateBits(val);
        break;
      case 'filter':
        console.log( 'filter', value );
        val = normalizeFilter(value);
        updateFilter(val);
        break;
      case 'delay-time':
        console.log( 'delay time', value );
        val = normalizeDelayTime(value);
        updateDelayTime(val);
        break;
      case 'delay-feedback':
        console.log( 'delay feedback', value );
        val = normalizeDelayFeedback(value);
        updateDelayFeedback(val);
        break;
      case 'chorus-depth':
        console.log( 'chorus depth', value );
        val = normalizeChorusDepth(value);
        updateChorusDepth(val);
        break;
      case 'chorus-frequency':
        console.log( 'chorus frequency', value );
        val = normalizeChorusFrequency(value);
        updateChorusFrequency(val);
        break;
      case 'chorus-delay':
        console.log( 'chorus delay', value );
        val = normalizeDelayTime(value);
        updateChorusDelay(val);
        break;
      default: break;
    }
  }

  function updateShape(v) {
    synthArray.forEach( function(s) { s.oscillator.type = v; }); }
  function updateVolume(v) {
    synthArray.forEach( function(s) { volume.volume.input.value = v; }); }
  function updateReverb(v) {
    synthArray.forEach( function(s) { reverb.roomSize.input.value = v; });
  }
  function updateAttack(v) {
    synthArray.forEach( function(s) { s.envelope.attack = v; });
  }
  function updateDecay(v) {
    synthArray.forEach( function(s) { s.envelope.decay = v; });
  }
  function updateSustain(v) {
    synthArray.forEach( function(s) { s.envelope.sustain = v; });
  }
  function updateRelease(v) {
    synthArray.forEach( function(s) { s.envelope.release = v; });
  }
  function updateBits(v) {
    synthArray.forEach( function(s) { distortion.bits = v; });
  }
  function updateFilter(v) {
    synthArray.forEach( function(s) { distortion.wet.value = v; });
  }
  function updateDelayTime(v) {
    synthArray.forEach( function(s) { delay.delayTime.value = v; });
  }
  function updateDelayFeedback(v) {
    synthArray.forEach( function(s) {
      delay.feedback.value = v * 0.8;
      delay.wet.value = v * 0.5;
    });
  }
  function updateChorusDepth(v) {
    synthArray.forEach( function(s) { chorus.depth = v; });
  }
  function updateChorusFrequency(v) {
    synthArray.forEach( function(s) { chorus.frequency.value = v; });
  }
  function updateChorusDelay(v) {
    synthArray.forEach( function(s) { chorus.delayTime = v; });
  }
}

function normalizeVolume(v) { return (v) * 0.0035; } // range [0, 0.35]
function normalizeReverb(v) { return (v) * 0.009; } //  range [0, 0.9]
function normalizeEnvelope(v) { return v * 0.04 + 0.01; } // range [0.01, 4.01]
function normalizeSustain(v) { return v * 0.01; } // range [0, 1]
function normalizeBits(v) { return Math.ceil(v * 0.07 + 0.1); } // range [2, 12] integers
function normalizeFilter(v) { return v * 0.01; } // range [0, 1]
function normalizeDelayTime(v) { return v * 0.009; } // range [0, 1]
function normalizeDelayFeedback(v) { return v * 0.01; } // range [0, 1]
function normalizeChorusDepth(v) { return v * 0.01; } // range [0, 1]
function normalizeChorusFrequency(v) { return (v * 0.07) + 1; } // range [1, 8]

module.exports.init = synthInit;
module.exports.trigger = toneTrigger;
module.exports.controller = controller;
