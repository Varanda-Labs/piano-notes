/***************************************************************
 *
 *           This code is part the Piano Notes WebApp
 *
 * Copyrights 2026 - Varanda Labs Inc.
 *
 * License: GPL-v3
 *   https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 *
 ***************************************************************

 Credits: Audio sample files downloaded from https://github.com/tambien/Piano
          Actual Samples/author:  Salamander Grand Piano V3, Alexander Holm 
                                  https://archive.org/details/SalamanderGrandPianoV3

 */

export { Piano };
import { Instrument } from "./instrument.js";
import { NOTES_TABLE, WHITE_INDEX_LOOKUP } from "./piano-table.js";

const NUM_WHITE_KEYS = 52;
const NUM_BLACK_KEYS = 36;

const WH_RATIO = 10.3595;
const BLACK_NOTE_W = 88;
const BLACK_NOTE_H = 513;
const KEY_H = 770;
const SPACE_W = 11;
const SPACE_H = KEY_H;
const NOTE_W = 153;
const BALL = 70;

const BLACK_NOTE_POS_Y = BLACK_NOTE_H - BALL;
const WHITE_NOTE_POS_Y = KEY_H - BALL;

const MIDI_FIRST_NOTE_OFFSET = 21

const SAMPLER = new Tone.Sampler({
    urls: {
        A0: "A0v16.mp3",
        C1: "C1v16.mp3",
        "D#1": "Ds1v16.mp3",
        "F#1": "Fs1v16.mp3",
        A1: "A1v16.mp3",
        C2: "C2v16.mp3",
        "D#2": "Ds2v16.mp3",
        "F#2": "Fs2v16.mp3",
        A2: "A2v16.mp3",
        C3: "C3v16.mp3",
        "D#3": "Ds3v16.mp3",
        "F#3": "Fs3v16.mp3",
        A3: "A3v16.mp3",
        C4: "C4v16.mp3",
        "D#4": "Ds4v16.mp3",
        "F#4": "Fs4v16.mp3",
        A4: "A4v16.mp3",
        C5: "C5v16.mp3",
        "D#5": "Ds5v16.mp3",
        "F#5": "Fs5v16.mp3",
        A5: "A5v16.mp3",
        C6: "C6v16.mp3",
        "D#6": "Ds6v16.mp3",
        "F#6": "Fs6v16.mp3",
        A6: "A6v16.mp3",
        C7: "C7v16.mp3",
        "D#7": "Ds7v16.mp3",
        "F#7": "Fs7v16.mp3",
        A7: "A7v16.mp3",
        C8: "C8v16.mp3",
    },
    release: 1,
    baseUrl: "res/",
}).toDestination();

const CANVAS_STATE = {
    width: 0,
    height: 0
};

var midi = null;

class Piano extends Instrument{
  constructor(canvas, statusDisplay, pedalDownCheckBox, noteStrokeCallback = null){
    super(noteStrokeCallback);
    this.canvas_piano = canvas;
    this.statusDisplay = statusDisplay;
    this.pedalDownCheckBox = pedalDownCheckBox;
    this.ctx = this.canvas_piano.getContext('2d');

    this.x_offset = "?"
    this.noteAudioSample;
    this.audioSynth;
    this.playingNote = '';

    this.canvas_piano.addEventListener('mousedown', (event) => this.onMouseDown(event));
    this.canvas_piano.addEventListener('mouseup', (event) => this.onMouseUp(event));
    this.pedalDownCheckBox.addEventListener('change', (event) => this.onPedalChange(event));
    addEventListener("midimessage", (event) => this.onMidiMessage(event));

    this.black_notes_x = [];
    this.initBackNotesX();

    this.whiteNames = [];
    this.initWhiteNames();

    this.initMidi();
    this.Repaint();
  }

  initBackNotesX() {
    for (var i=0; i<NOTES_TABLE.length; i++) {
      if (NOTES_TABLE[i].is_black) {
        this.black_notes_x.push(NOTES_TABLE[i].blackX_whiteCnt);
      }
    }
  }

  initWhiteNames() {
    for (var i=0; i<NOTES_TABLE.length; i++) {
      if (NOTES_TABLE[i].is_black == false) {
        this.whiteNames.push(NOTES_TABLE[i].note);
      }
    }
  }

  initMidi() {
    // Main MIDI listener
    (async () => {
      try {
        midi = await navigator.requestMIDIAccess();
        console.log('🎹 MIDI devices available:', midi.devices);

        midi.inputs.forEach(port => {
          port.onmidimessage = message => {
            const [_command, note, velocity] = message.data;

            var command = _command & 0xF0;

            // // Determine message type
            // const commandType = (command & 0xF0) === 0x90 ? 'Note On' :
            //                   (command & 0xF0) === 0x80 ? 'Note Off' :
            //                   (command & 0xF0) === 0xA0 ? 'Aftertouch' :
            //                   'Other';

            //if ((command & 0xF0) !== 0x90) return; // only Note On with velocity > 0
            if (command == 0x90) { // if note on
              var noteName = NOTES_TABLE[note - MIDI_FIRST_NOTE_OFFSET].note;

              if (velocity == 0) { // some MIDI issue velocity = 0 rather than "Note Off" command
                  SAMPLER.triggerRelease(noteName);
                  console.log(
                    `Note Off: ${noteName}, Pitch: ${note}, Velocity: ${velocity}`
                  );
              } 
              else {
                this.playNote(noteName);
                console.log(
                  `Note On: ${noteName}, Pitch: ${note}, Velocity: ${velocity}`
                );
              }
            }

            if (command == 0x80) { // if "Note Off" was explicit issued
              var noteName = NOTES_TABLE[note - MIDI_FIRST_NOTE_OFFSET].note;
              SAMPLER.triggerRelease(noteName);
              console.log(
                `Note Off: ${noteName}, Pitch: ${note}, Velocity: ${velocity}`
              );
            }

          };
        });

        // Handle MIDI state changes
        midi.onstatechange = event => {
          if (event.state === 'disconnected') {
            console.log('🔌 MIDI disconnected');
            connectBtn.textContent = 'Reconnect';
            connectBtn.disabled = false;
          }
        };
      } catch (err) {
        //console.error('❌ MIDI Access Error:', err.message);
      }
    })();
  }

  Repaint() {      
  const cssWidth = canvas_piano.offsetWidth;
  const cssHeight = canvas_piano.offsetHeight;

    this.minHeight = 100; 
    //this.actualHeight = Math.max(cssHeight || minHeight, minHeight);
    var actualHeight = 200; // TODO: declared me
    
    this.canvas_piano.width = cssWidth;
    this.canvas_piano.height = actualHeight;

    // Store it
    CANVAS_STATE.width = this.canvas_piano.width;
    CANVAS_STATE.height = actualHeight;

    this.drawPiano();
  }

  drawBlackNote(x) {
    this.ctx.fillStyle = '#000000';
    this.ctx.beginPath();
    this.ctx.rect(x, 0, BLACK_NOTE_W * this.scale, BLACK_NOTE_H * this.scale);
    this.ctx.fill(); 
  }

  drawLA(x) {
    for (var i = 0; i < this.black_notes_x.length; i++) {
      this.drawBlackNote(this.black_notes_x[i] * this.scale);
    }
  }

  drawSpaces() {
    var x = 0;
    for (var i = 0; i < NUM_WHITE_KEYS; i++) {
      this.ctx.rect(x * this.scale, 0, SPACE_W * this.scale, SPACE_H * this.scale);
      this.ctx.fill(); 
      x = x + NOTE_W;
    }
  }

  drawPiano () {
    var w = this.canvas_piano.width;
    var h = w / WH_RATIO;
    this.canvas_piano.height = h * 1.0;

    this.scale = h /KEY_H;
    this.ctx.fillStyle = '#ffffff';
    this.ctx.beginPath();
    this.ctx.rect(0, 0, w, h);
    this.ctx.fill();

    this.drawLA(0);
    this.drawSpaces();
  }

  playNote(n) {
    SAMPLER.triggerAttack(n);
    this.playingNote = n;
  }

  getKeyedNote(x,y) {
    var x_ref = x / this.scale;
    var y_ref = y / this.scale;
    var i = 0;
    var found = false;

    // check for black key
    for (i = 0; i< NOTES_TABLE.length; i++) {
      if (NOTES_TABLE[i].is_black) {
        var x_offset = NOTES_TABLE[i].blackX_whiteCnt;
        if ( x_ref > x_offset &&  x_ref < (x_offset + BLACK_NOTE_W) &&  y_ref < BLACK_NOTE_H) {
          return i;
        }
      }
    }

    if (y_ref < BLACK_NOTE_H * this.scale) {
      return -1;
    }

    i = Math.trunc((x /this.canvas_piano.width) * this.whiteNames.length);
    if (i < 0) i = 0;
    if (i >= this.whiteNames.length) {
      i = this.whiteNames.length - 1;
    }
    return WHITE_INDEX_LOOKUP[i];
  }

  onPedalChange(event) {
    // silence all notes upon pedal up
    if (event.target.checked == false) {
      var i;
      for(i = 0; i < NOTES_TABLE.length; i++) {
        SAMPLER.triggerRelease(NOTES_TABLE[i].note);
      }
    }
  }

  onMidiMessage(event) {
    console.log(`onMidiMessage: ${event.data}`);
  }

  drawNote(x, y, color) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, BALL * this.scale, 0, Math.PI * 2);
    this.ctx.fillStyle = '#ff404088';
    this.ctx.fill();
    this.ctx.closePath();
  }

  onMouseUp() {
    if (this.playingNote.length > 1) {
      if (this.pedalDownCheckBox.checked == false) {
        SAMPLER.triggerRelease(this.playingNote);
      }
      this.playingNote = '';
      setTimeout(event =>this.Repaint(event), 100);
    }
  }

  onMouseDown() {
    //this.ctx = this.canvas_piano.getContext('2d');
    var rect = this.canvas_piano.getBoundingClientRect();
    var x = Math.round(event.clientX - rect.left);
    var y = Math.round(event.clientY - rect.top);
    var ratio = this.canvas_piano.width / NUM_WHITE_KEYS;

    var note_pos_x = 0;
    var note_pos_y = 0;

    var note_name = "";
    var flat_note_name = "";

    var solfege_name = "";
    var solfege_flat_note_name = "";

    var display_text = "";

    this.x_offset = x;

    var i = this.getKeyedNote(x,y);
    if (i < 0) {
      return;
    }

    note_name = NOTES_TABLE[i].note;
    flat_note_name = NOTES_TABLE[i].flat;
    solfege_name = NOTES_TABLE[i].solfege;
    solfege_flat_note_name = NOTES_TABLE[i].solfege_flat;
    if (NOTES_TABLE[i].is_black) {
      display_text =  `${note_name}, ${flat_note_name} (${solfege_name}, $${solfege_flat_note_name})`;
      note_pos_y = BLACK_NOTE_POS_Y * this.scale;
      note_pos_x = (NOTES_TABLE[i].blackX_whiteCnt + BALL/2 + 10) * this.scale;
    }
    else {
      display_text =  `${note_name} (${solfege_name})`;
      note_pos_y = WHITE_NOTE_POS_Y * this.scale;
      note_pos_x = NOTES_TABLE[i].blackX_whiteCnt * ratio + ((BALL/2 + 36) * this.scale);
    }
    console.log(`note_pos_x = ${note_pos_x}, note_pos_y = ${note_pos_y}`);

    this.statusDisplay.innerText = display_text;
    if (note_name.length > 1) {
        this.playNote(note_name);
    }

    this.drawNote(note_pos_x, note_pos_y, '#ff404088');
  }

}


