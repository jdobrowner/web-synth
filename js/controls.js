import * as synth from './synth.js';
import $ from "jquery";
var jqui = require('jquery-ui');
var uiSlider = require('jquery-ui/ui/widgets/slider');

function init(sound) {

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
        var controlID = $(this).attr('id');
        synth.controller.emit('change', controlID, ui.value);
      },
      create: function( event, ui ) {
        console.log('created');
      }
    });

  var controls = getControls(sound);
  controls.forEach( function(control) { setUpSlider(control); });

  shapeControlListeners();
}

function getControls(settings) {

  getShapes(settings.master.shape, settings.tremelo.shape);

  var controls = [
    createControl('volume', 100, settings.master.volume),
    createControl('reverb', 100, settings.master.reverb),
    createControl('distortion', 100, settings.master.distortion),
    createControl('attack', 100, settings.envelope.attack),
    createControl('decay', 100, settings.envelope.decay),
    createControl('sustain', 100, settings.envelope.sustain),
    createControl('release', 100, settings.envelope.release),
    createControl('delay-time', 100, settings.delay.time),
    createControl('delay-feedback', 100, settings.delay.feedback),
    createControl('tremelo-depth', 100, settings.tremelo.depth),
    createControl('tremelo-frequency', 100, settings.tremelo.frequency)
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

function shapeControlListeners() {

  $('#circle').click( function(e) {
    $(this).addClass('clicked');
    $('#triangle').removeClass('clicked');
    $('#square').removeClass('clicked');
    synth.controller.emit('change', 'shape', 'sine');
  });
  $('#triangle').click( function(e) {
    $(this).addClass('clicked');
    $('#circle').removeClass('clicked');
    $('#square').removeClass('clicked');
    synth.controller.emit('change', 'shape', 'triangle');
  });
  $('#square').click( function(e) {
    $(this).addClass('clicked');
    $('#triangle').removeClass('clicked');
    $('#circle').removeClass('clicked');
    synth.controller.emit('change', 'shape', 'square');
  });
  $('#tremelo-circle').click( function(e) {
    $(this).addClass('clicked');
    $('#tremelo-triangle').removeClass('clicked');
    $('#tremelo-square').removeClass('clicked');
    synth.controller.emit('change', 'tremelo-shape', 'sine');
  });
  $('#tremelo-triangle').click( function(e) {
    $(this).addClass('clicked');
    $('#tremelo-circle').removeClass('clicked');
    $('#tremelo-square').removeClass('clicked');
    synth.controller.emit('change', 'tremelo-shape', 'triangle');
  });
  $('#tremelo-square').click( function(e) {
    $(this).addClass('clicked');
    $('#tremelo-triangle').removeClass('clicked');
    $('#tremelo-circle').removeClass('clicked');
    synth.controller.emit('change', 'tremelo-shape', 'square');
  });
}

function getShapes(synthShape, tremeloShape) {
  if (synthShape === 'sine') $('#circle').addClass('clicked');
  else if (synthShape === 'triangle') $('#triangle').addClass('clicked');
  else if (synthShape === 'square') $('#square').addClass('clicked');

  if (tremeloShape === 'sine') $('#tremelo-circle').addClass('clicked');
  else if (tremeloShape === 'triangle') $('#tremelo-triangle').addClass('clicked');
  else if (tremeloShape === 'square') $('#tremelo-square').addClass('clicked');
}

module.exports.init = init;
