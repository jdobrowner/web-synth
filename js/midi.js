var  WebMidi = require('webmidi');

var input;

(function loadMidiDevice() {
  WebMidi.enable(function (err) {
    if (err) {
      console.log("WebMidi could not be enabled.", err);
    } else {
      console.log("WebMidi enabled!");
      console.log(WebMidi.inputs);
      addListeners();
    }
  });
})();

function addListeners() {
  input = WebMidi.inputs[0];
  console.log(input);
  input.addListener('noteon', "all",
      function (e) {
        console.log("Received 'noteon' message (" + e.note.name + e.note.octave + ").");
      }
    );
    input.addListener('controlchange', "all",
      function (e) {
        console.log("Received 'controlchange' message.", e);
      }
    );
}
