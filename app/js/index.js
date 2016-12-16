import * as midi from './midi.js';
import * as sounds from './sounds.js';
import * as keyboard from './keyboards.js';
import * as controls from './controls.js';
import * as synth from './synth.js';
import $ from "jquery";

var soundSetting = sounds.settings();
var ssLength = soundSetting.length;
var ssNum = Math.floor( Math.random() * ssLength );

keyboard.build();
controls.init(soundSetting[ssNum]);
$('.load-name-box').html(soundSetting[ssNum].name);
midi.init();
synth.init(soundSetting[ssNum]);


//-------- load different sound patch when load buttons are clicked -----------

$('#load-right').click( function() {
  unclickShapes();
  ssNum = circulateNum(ssNum + 1);
  changeSound(ssNum);
});
$('#load-left').click( function() {
  unclickShapes();
  ssNum = circulateNum(ssNum - 1);
  changeSound(ssNum);
});

function changeSound(galaxy) {
  var galaxySound = soundSetting[galaxy];
  controls.init(galaxySound);
  $('.load-name-box').html(galaxySound.name);
}

function circulateNum(n) {
  if (n === ssLength) n = 0;
  else if (n < 0) n = ssLength - 1;
  return n;
}

function unclickShapes() {
  $('#circle').removeClass('clicked');
  $('#triangle').removeClass('clicked');
  $('#sawtooth').removeClass('clicked');
  $('#square').removeClass('clicked');
}
