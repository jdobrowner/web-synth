import * as midi from './midi.js';
import * as keyboard from './keyboards.js';
import * as controls from './controls.js';
import $ from "jquery";

// add global event emitter here
// var Event = require('events');
// var toneTrigger = new Event();
// toneTrigger.on('play-note', function(note){ // call tone.js to play the note });
// toneTrigger.on('stop-note', function(note){ // call tone.js to release the note });

// toneTrigger.emit('play-note', note)


keyboard.build();
midi.init();
controls.init();
