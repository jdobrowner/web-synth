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
