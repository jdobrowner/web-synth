var midi = require('./midi.js');
// import * as midi from 'midi';

// import * as keys from './keyboards.js';

var keys = require('./keyboards.js');
//var $ = require("jquery");
import $ from "jquery";

var keyboard = $('.keyboard');
keyboard25();

function keyboard25() {
  keyboard.children().remove();
  keyboard.append(keys.row1);
  $('.white-keys').addClass('white-25');
  $('.black-keys').addClass('black-25');
}

function keyboard49() {
  keyboard.children().remove();
  keyboard.append(keys.row2);
  keyboard.append(keys.row1);
  $('.white-keys').addClass('white-49');
  $('.black-keys').addClass('black-49');
  $('.row2').addClass('shift-down-49');
}

function keyboard73() {
  keyboard.children().remove();
  keyboard.append(keys.row3);
  keyboard.append(keys.row2);
  keyboard.append(keys.row1);
  $('.white-keys').addClass('white-73');
  $('.black-keys').addClass('black-73');
  $('.row3').addClass('shift-down-73-3');
  $('.row2').addClass('shift-down-73-2');
}

$('.keyboard-display').on('click', '.choice-box', function(e) {
  $('.keyboard-display').find('.choice-box').removeClass('clicked');
  $(this).addClass('clicked');
  let num = $(this).text();
  if (num == '25') keyboard25();
  if (num == '49') keyboard49();
  if (num == '73') keyboard73();
});

(function keyListeners() {
  var notes = ['A', 'As', 'B', 'C', 'Cs', 'D', 'Ds', 'E', 'F', 'Fs', 'G', 'Gs'];
  for (var i = 0; i < 12; i++) {
    keyListener(notes[i]);
  }
})();

function keyListener(note) {
  var key = $('.keyboard');
  keyboard.on('mousedown', '.' + note, function() {
    key = $(this);
    key.addClass(note + '-color');
    }).on('mouseup mouseout', function() { key.removeClass(note + '-color'); });
}
