import * as controls from './controls.js';
// import * as Tone from './ToneCDN.js';
var Tone = require('Tone');
var EventEmitter = require('events');


var synth1 = new Tone.Synth().toMaster();
var synth2 = new Tone.Synth().toMaster();
var synth3 = new Tone.Synth().toMaster();
var synth4 = new Tone.Synth().toMaster();
var synth5 = new Tone.Synth().toMaster();
var synth6 = new Tone.Synth().toMaster();
var synth7 = new Tone.Synth().toMaster();
var synth8 = new Tone.Synth().toMaster();

var toneTrigger = new EventEmitter();

toneTrigger.on('trigger', function(note) {
  console.log('trigger ' + note);
  attachNote(note);
  findSynthToTrigger(note);
});

toneTrigger.on('release', function(note) {
  console.log('release ' + note);
  findSynthToRelease(note) ;
});

module.exports.trigger = toneTrigger;

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

function attachNote(note) {
  if (synthStack.synth1 === '') synthStack.synth1 = note;
  else if (synthStack.synth2 === '') synthStack.synth2 = note;
  else if (synthStack.synth3 === '') synthStack.synth3 = note;
  else if (synthStack.synth4 === '') synthStack.synth4 = note;
  else if (synthStack.synth5 === '') synthStack.synth5 = note;
  else if (synthStack.synth6 === '') synthStack.synth6 = note;
  else if (synthStack.synth7 === '') synthStack.synth7 = note;
  else if (synthStack.synth8 === '') synthStack.synth8 = note;

  console.log(synthStack);
}

function findSynthToTrigger(note) {
  for (var synth in synthStack) {
    if (synthStack[synth] === note) {
      triggerSynth(synth, note);
      console.log(synth);
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
