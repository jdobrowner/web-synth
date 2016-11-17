import * as synth from './synth.js';
import $ from "jquery";

//--------------------- set up the html for the keyboard ----------------------

function keyboardHTML() {

  const CLASS = '<div class="', ID = '" id="', END = '"></div>', CLOSE = '</div>';
  const KEYS = '<div class="keys', BLACK = '<div class="black-keys">', WHITE = '<div class="white-keys">';

  var whiteKeyNums = [1,3,5,6,8,10,12,13,15,17,18,20,22,24,25];
  var blackKeyNums = [2,4,7,9,11,14,16,19,21,23];

  var whiteKeys25 = whiteKeyNums.map( n => CLASS + getLetter(n) + n + ID + n + END ).join('');
  var blackKeys25 = blackKeyNums.map( n => CLASS + getLetter(n) + spacing(n) + n +  ID + n + END ).join('');
  var whiteKeys49 = whiteKeyNums.map( n => CLASS + getLetter(n) + (n+24) + ID + (n+24) +  END ).join('');
  var blackKeys49 = blackKeyNums.map( n => CLASS + getLetter(n) + spacing(n) + (n+24) + ID + (n+24) +  END ).join('');
  var whiteKeys73 = whiteKeyNums.map( n => CLASS + getLetter(n) + (n+48) + ID + (n+48) +  END ).join('');
  var blackKeys73 = blackKeyNums.map( n => CLASS + getLetter(n) + spacing(n) + (n+48) + ID + (n+48) +  END ).join('');

  var row1 = KEYS + ' row1">' + BLACK + blackKeys25 + CLOSE + WHITE + whiteKeys25 + CLOSE + CLOSE;
  var row2 = KEYS + ' row2">' + BLACK + blackKeys49 + CLOSE + WHITE + whiteKeys49 + CLOSE + CLOSE;
  var row3 = KEYS + ' row3">' + BLACK + blackKeys73 + CLOSE + WHITE + whiteKeys73 + CLOSE + CLOSE;

  return { row1: row1, row2: row2, row3: row3 };
}

function getLetter(n) {
  var m = n % 12;
  switch(m) {
    case 1: return 'C ';
    case 2: return 'Cs ';
    case 3: return 'D ';
    case 4: return 'Ds ';
    case 5: return 'E ';
    case 6: return 'F ';
    case 7: return 'Fs ';
    case 8: return 'G ';
    case 9: return 'Gs ';
    case 10: return 'A ';
    case 11: return 'As ';
    case 0: return 'B ';
    default: return;
  }
}

function getTone(n) {
  var m = n % 12;
  var octave = Math.floor(n/12);
  var letter;

  switch(m) {
    case 1: return 'C' + octave;
    case 2: return 'C#' + octave;
    case 3: return 'D' + octave;
    case 4: return 'D#' + octave;
    case 5: return 'E' + octave;
    case 6: return 'F' + octave;
    case 7: return 'F#' + octave;
    case 8: return 'G' + octave;
    case 9: return 'G#' + octave;
    case 10: return 'A' + octave;
    case 11: return 'A#' + octave;
    case 0: return 'B' + (octave - 1);
    default: return;
  }
}

function spacing(n) {
  var spacer;
  var m = n % 12;
  if ((m === 4) || (m === 9) || (m === 11)) spacer = ' half-step-margin ';
  else if ((m === 2) || (m === 7)) spacer = ' whole-step-margin ';
  if (n === 2) spacer = ' shift-left ';
  return spacer;
}

//------------------------- Keyboards set up -------------------------------

function buildKeyboard() {
  var keyboard = $('.keyboard');
  var keys = keyboardHTML();

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
    var tone;
    var hasBeenReleased = true;
    keyboard.on('mousedown', '.' + note, function() {
      key = $(this);
      key.addClass(note + '-color');

      var keyId = $(this).attr('id');
      tone = getTone(parseInt(keyId));
      synth.trigger.emit('trigger', tone);
      hasBeenReleased = false;

    }).on('mouseup', function() {
      if ((!hasBeenReleased) && (tone !== 'undefined')) {
        key.removeClass(note + '-color');
        synth.trigger.emit('release', tone);
        hasBeenReleased = true;
      }
    });


  }

  keyboard49();
  $('.js-kb49').addClass('clicked');
}

module.exports.build = buildKeyboard;
