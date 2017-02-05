# Galaxy Synth

Plug in your MIDI keyboard and play! No need for an installed application to make music.

Galaxy Synth uses [Tone.js](https://github.com/Tonejs/Tone.js/) and [Web MIDI API](https://webaudio.github.io/web-midi-api/).

![Galaxy Synth Screenshot](app/static/screenshot.png)

## Technical

The connection between ToneJS and WebMIDI is handled by two event emitters: the tone-trigger and the controller.

The tone-trigger connects the synth.js file to the midi.js file. Tone-trigger causes a ToneJS [MonoSynth](https://tonejs.github.io/docs/#MonoSynth) to sound on a keydown, by adding the chosen tone to an available MonoSynth. There are eight possible MonoSynth instances, making the app an eight-voice polyphonic synthesizer. On a keyup WebMIDI event, the tone is released (ceases to sound) and removed from it's paired MonoSynth.

The controller connects the synth.js file to the controls.js file. It is fired whenever a change is made to any slider or control button. This causes all MonoSynths to update the effect or envelope filter variables, altering the sound output.
