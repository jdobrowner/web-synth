import * as midi from './midi.js';
import * as sounds from './sounds.js';
import * as keyboard from './keyboards.js';
import * as controls from './controls.js';
import * as synth from './synth.js';
import $ from "jquery";

var soundSetting = sounds.settings();

keyboard.build();
controls.init(soundSetting);
midi.init();
synth.init(soundSetting);
