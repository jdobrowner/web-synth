var Tone = require('Tone');

var EventEmitter = require('events');
var toneTrigger = new EventEmitter();
var controller = new EventEmitter();

var loadPatch;

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

  console.log(synth1);

  // var distortion = new Tone.BitCrusher( normalizeBits(controls.crusher.bits) );
  // var reverb = new Tone.Freeverb( { roomSize: normalizeMaster(controls.master.reverb) } );
  // var volume = new Tone.Volume( normalizeVolume(controls.master.volume) );
  // var delay = new Tone.FeedbackDelay( { delayTime: normalizeDelayTime(controls.delay.time),
  //                                       feedback: normalizeDelayFeedback(controls.delay.feedback),
  //                                       wet: 0
  //                                     });
  // var tremolo = new Tone.Tremolo( { frequency: normalizeTremoloFrequency(controls.tremolo.frequency),
  //                                   type: 'sine',
  //                                   depth: normalizeTremoloDepth(controls.tremolo.depth),
  //                                   spread: 0 } ).start();
  // var compressor = new Tone.Compressor(-30, 3);

  var distortion = new Tone.BitCrusher();
  var reverb = new Tone.Freeverb();
  var volume = new Tone.Volume();
  var delay = new Tone.FeedbackDelay( { wet: 0 });
  var tremolo = new Tone.Tremolo( { type: 'sine', spread: 0 } ).start();
  var compressor = new Tone.Compressor(-30, 3);

  function loadSoundPatch(controls) {
    synthArray.forEach( function(s) {
      s.oscillator.type = controls.master.shape;
      s.envelope.attack = normalizeEnvelope(controls.envelope.attack);
      s.envelope.decay = normalizeEnvelope(controls.envelope.decay);
      s.envelope.sustain = normalizeEnvelope(controls.envelope.sustain);
      s.envelope.release = normalizeEnvelope(controls.envelope.release);
    });
    volume.volume.input.value = normalizeVolume(controls.master.volume);
    reverb.roomSize.input.value = normalizeMaster(controls.master.reverb);
    distortion.bits = normalizeBits(controls.crusher.bits);
    distortion.wet.value = normalizeFilter(controls.crusher.filter);
    delay.delayTime.value = normalizeDelayTime(controls.delay.time);
    var v = normalizeDelayFeedback(controls.delay.feedback);
    delay.feedback.value = v * 0.8;
    delay.wet.value = v * 0.5;
    tremolo.depth.value = normalizeTremoloDepth(controls.tremolo.depth);
    tremolo.frequency.value = normalizeTremoloFrequency(controls.tremolo.frequency);
  }
  loadSoundPatch(controls);
  loadPatch = loadSoundPatch; // to be exported and used when a different sound patch is chosen

  synthArray.forEach( function(s) {
    s.chain(distortion, compressor, tremolo, delay, reverb, volume, Tone.Master);
  });

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
        val = normalizeVolume(value);
        updateVolume(val);
        break;
      case 'reverb':
        val = normalizeMaster(value);
        updateReverb(val);
        break;
      case 'attack':
        val = normalizeEnvelope(value);
        updateAttack(val);
        break;
      case 'decay':
        val = normalizeEnvelope(value);
        updateDecay(val);
        break;
      case 'sustain':
        val = normalizeEnvelope(value);
        updateSustain(val);
        break;
      case 'release':
        val = normalizeEnvelope(value);
        updateRelease(val);
        break;
      case 'bits':
        val = normalizeBits(value);
        updateBits(val);
        break;
      case 'filter':
        val = normalizeFilter(value);
        updateFilter(val);
        break;
      case 'delay-time':
        val = normalizeDelayTime(value);
        updateDelayTime(val);
        break;
      case 'delay-feedback':
        val = normalizeDelayFeedback(value);
        updateDelayFeedback(val);
        break;
      case 'tremolo-depth':
        val = normalizeTremoloDepth(value);
        updateTremoloDepth(val);
        break;
      case 'tremolo-frequency':
        val = normalizeTremoloFrequency(value);
        updateTremoloFrequency(val);
        break;
      default: break;
    }
  }

  function updateShape(v) {

    synthArray.forEach( function(s) { s.oscillator.type = v; }); }
  function updateVolume(v) {
    console.log( volume );
    synthArray.forEach( function(s) { volume.volume.input.value = v; }); }
  function updateReverb(v) {
    console.log('reverb = ' + v);
    console.log( reverb );
    synthArray.forEach( function(s) { reverb.roomSize.input.value = v; });
  }
  function updateAttack(v) {
    console.log( 'attack = ' + v );
    synthArray.forEach( function(s) { s.envelope.attack = v; });
  }
  function updateDecay(v) {
    console.log( 'decay = ' + v );
    synthArray.forEach( function(s) { s.envelope.decay = v; });
  }
  function updateSustain(v) {
    console.log( 'sustain = ' + v );
    synthArray.forEach( function(s) { s.envelope.sustain = v; });
  }
  function updateRelease(v) {
    console.log( 'release = ' + v );
    synthArray.forEach( function(s) { s.envelope.release = v; });
  }
  function updateBits(v) {
    console.log( 'bits = ' + v );
    console.log( distortion );
    synthArray.forEach( function(s) { distortion.bits = v; });
  }
  function updateFilter(v) {
    console.log( 'filter = ' + v );
    console.log( distortion );
    synthArray.forEach( function(s) { distortion.wet.value = v; });
  }
  function updateDelayTime(v) {
    console.log( 'delay time =' + v );
    console.log( delay );
    synthArray.forEach( function(s) { delay.delayTime.value = v; });
  }
  function updateDelayFeedback(v) {
    console.log( 'delay feedback = ' + v );
    console.log( delay );
    synthArray.forEach( function(s) {
      delay.feedback.value = v * 0.8;
      delay.wet.value = v * 0.5;
    });
  }
  function updateTremoloDepth(v) {
    console.log( 'tremolo depth = ' + v );
    console.log(tremolo);
    synthArray.forEach( function(s) { tremolo.depth.value = v; });
  }
  function updateTremoloFrequency(v) {
    console.log( 'tremolo freq = ' + v );
    console.log(tremolo);
    synthArray.forEach( function(s) { tremolo.frequency.value = v; });
  }
}

function normalizeVolume(v) { return (v) * 0.02; } // range ? logarithmic function
function normalizeMaster(v) { return v * 0.01; } // range [0, 1]
function normalizeEnvelope(v) { return v * 0.03; } // range [0, 3]
function normalizeBits(v) { return Math.ceil(v * 0.07 + 0.1); } // range [2, 12] integers
function normalizeFilter(v) { return v * 0.01; } // range [0, 1]
function normalizeDelayTime(v) { return v * 0.01; } // range [0, 1]
function normalizeDelayFeedback(v) { return v * 0.01; } // range [0, 1]
function normalizeTremoloDepth(v) { return v * 0.01; } // range [0, 1]
function normalizeTremoloFrequency(v) { return (v * 0.1) + 1; } // range [1, 11]

module.exports.init = synthInit;
module.exports.trigger = toneTrigger;
module.exports.controller = controller;
