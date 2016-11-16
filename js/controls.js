import * as synth from './synth.js';

import $ from "jquery";
var jqui = require('jquery-ui');
var uiSlider = require('jquery-ui/ui/widgets/slider');

export function init() {

  $( ".slider" ).each(function() {
    // read initial values from markup and remove that
    var value = parseInt($( this ).data('value'));
    $( this ).empty().slider({
      range: "min",
      animate: true,
      orientation: "vertical"
    }); });

  $( ".slider" ).slider({
      change: function( event, ui ) {
        console.log(ui.value);
      },
      create: function( event, ui ) {
        console.log('created');
      }
    });

  var controls = getControls();
  controls.forEach( function(control) { setUpSlider(control); });
}

function getControls() {
  var controls = [
    createControl('volume', 60, 45), // must subtract value by 60 so max = 0 in tone.js
    createControl('reverb', 100, 0), // must divide value by 100
    createControl('distortion', 100, 0), // must divide value by 100
    createControl('attack', 30, 3), // must divide value by 10
    createControl('decay', 30, 1), // must divide value by 10
    createControl('sustain', 30, 30), // must divide value by 10
    createControl('release', 30, 5), // must divide value by 10
    createControl('delay-time', 200, 0), // must divide value by 100
    createControl('delay-feedback', 80, 0), // must divide value by 100
    createControl('tremelo-depth', 200, 0), // must divide value by 100
    createControl('tremelo-frequency', 80, 0), // must divide value by 100
  ];
  return controls;
}

function createControl(name, max, value) {
  return {name: name, max: max, value: value};
}

function setUpSlider( control ) {
  $('#'+control.name).slider({
    max: control.max,
    value: control.value
  });
}
