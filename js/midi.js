import $ from "jquery";

function midiInit() {

  var  WebMidi = require('webmidi');
  var input;

  (function loadMidiDevice() {
    WebMidi.enable(function (err) {
      if (err) {
        console.log("WebMidi could not be enabled.", err);
      }
      else {
        console.log("WebMidi enabled!");
        input = WebMidi.inputs[0];
        if (typeof input !== 'undefined') addListeners(input);
        else $('.keyboard-input-name').text('No Input Device Found');
      }
    });
  })();
  // module.exports.loadDevice = loadMidiDevice;
}

function addListeners(input) {
  console.log(input);
  console.log(input._midiInput.name);
  $('.keyboard-input-name').text(input._midiInput.name);

  input.addListener('noteon', "all", function (e) {
        var note = matchingKeyID(e.note.name, e.note.octave);
        var $key = $('.' + note.id);
        $key.addClass(note.letter + '-color');
      }
    );
  input.addListener('noteoff', "all", function (e) {
        var note = matchingKeyID(e.note.name, e.note.octave);
        var $key = $('.' + note.id);
        $key.removeClass(note.letter + '-color');
      }
    );
  // input.addListener('controlchange', "all", function (e) {
  //     console.log("Received 'controlchange' message.", e);
  //   }
  // );
}

//--------- match key on midi keyboard to the on screen keyboard keys ---------

function matchingKeyID(pitch, octave) {
  var baseNumber = getBaseNumberFromLetter(pitch);
  var id = baseNumber + 12 * (octave + 4);
  var letter = getLetterFromBaseNumber(baseNumber);
  return { id: id, letter: letter };
}

function getBaseNumberFromLetter(pitch) {
  switch(pitch) {
    case 'C': return 1;
    case 'C#': return 2;
    case 'D': return 3;
    case 'D#': return 4;
    case 'E': return 5;
    case 'F': return 6;
    case 'F#': return 7;
    case 'G': return 8;
    case 'G#': return 9;
    case 'A': return 10;
    case 'A#': return 11;
    case 'B': return 12;
    default: return;
  }
}

function getLetterFromBaseNumber(n) {
  switch(n) {
    case 1: return 'C';
    case 2: return 'Cs';
    case 3: return 'D';
    case 4: return 'Ds';
    case 5: return 'E';
    case 6: return 'F';
    case 7: return 'Fs';
    case 8: return 'G';
    case 9: return 'Gs';
    case 10: return 'A';
    case 11: return 'As';
    case 12: return 'B';
    default: return;
  }
}



module.exports.init = midiInit;
