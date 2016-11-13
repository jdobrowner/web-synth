(function() {
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
      }
    });
  })();

  function addListeners(input) {
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
})();
