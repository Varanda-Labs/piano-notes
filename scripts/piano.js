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

const BLACK_NOTES_X = [
        131, 407, 589, 868, 1036, 1203,
        1479, 1661, 1940, 2108, 2275,
        2551, 2733, 3012, 3180, 3347,
        3623, 3805, 4084, 4252, 4419,
        4695, 4877, 5156, 5324, 5491,
        5767, 5949, 6228, 6396, 6563,
        6839, 7021, 7300, 7468, 7635,
        // 7911
    ];

const BLACK_SHARP_NOTE_NAMES = [
    'A#0', 'C#1', 'D#1', 'F#1', 'G#1',
    'A#1', 'C#2', 'D#2', 'F#2', 'G#2',
    'A#2', 'C#3', 'D#3', 'F#3', 'G#3',
    'A#3', 'C#4', 'D#4', 'F#4', 'G#4',
    'A#4', 'C#5', 'D#5', 'F#5', 'G#5',
    'A#5', 'C#6', 'D#6', 'F#6', 'G#6',
    'A#6', 'C#7', 'D#7', 'F#7', 'G#7', 'A#7'
];

const BLACK_FLAT_NOTE_NAMES = [
    'Bb0', 'Db1', 'Eb1', 'Gb1', 'Ab1',
    'Bb1', 'Db2', 'Eb2', 'Gb2', 'Ab2',
    'Bb2', 'Db3', 'Eb3', 'Gb3', 'Ab3',
    'Bb3', 'Db4', 'Eb4', 'Gb4', 'Ab4',
    'Bb4', 'Db5', 'Eb5', 'Gb5', 'Ab5',
    'Bb5', 'Db6', 'Eb6', 'Gb6', 'Ab6',
    'Bb6', 'Db7', 'Eb7', 'Gb7', 'Ab7', 'Bb7'
];

const WHITE_NOTE_NAMES = [
    'A0', 'B0', 
    'C1', 'D1', 'E1', 'F1', 'G1', 'A1', 'B1',
    'C2', 'D2', 'E2', 'F2', 'G2', 'A2', 'B2',
    'C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3',
    'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4',
    'C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5',
    'C6', 'D6', 'E6', 'F6', 'G6', 'A6', 'B6',
    'C7', 'D7', 'E7', 'F7', 'G7', 'A7', 'B7',
    'C8'
];

const WHITE_SOLFEGE_NOTE_NAMES = [
    'La0', 'Si0', 
    'Do1', 'Re1', 'Mi1', 'Fa1', 'Sol1', 'La1', 'Si1',
    'Do2', 'Re2', 'Mi2', 'Fa2', 'Sol2', 'La2', 'Si2',
    'Do3', 'Re3', 'Mi3', 'Fa3', 'Sol3', 'La3', 'Si3',
    'Do4', 'Re4', 'Mi4', 'Fa4', 'Sol4', 'La4', 'Si4',
    'Do5', 'Re5', 'Mi5', 'Fa5', 'Sol5', 'La5', 'Si5',
    'Do6', 'Re6', 'Mi6', 'Fa6', 'Sol6', 'La6', 'Si6',
    'Do7', 'Re7', 'Mi7', 'Fa7', 'Sol7', 'La7', 'Si7',
    'Do8'
];

const BLACK_SHARP_NOTE_SOLFEGE_NAMES = [
    'La#0', 'Do#1', 'Re#1', 'Fa#1', 'Sol#1',
    'La#1', 'Do#2', 'Re#2', 'Fa#2', 'Sol#2',
    'La#2', 'Do#3', 'Re#3', 'Fa#3', 'Sol#3',
    'La#3', 'Do#4', 'Re#4', 'Fa#4', 'Sol#4',
    'La#4', 'Do#5', 'Re#5', 'Fa#5', 'Sol#5',
    'La#5', 'Do#6', 'Re#6', 'Fa#6', 'Sol#6',
    'La#6', 'Do#7', 'Re#7', 'Fa#7', 'Sol#7', 'La#7'
];

const BLACK_FLAT_NOTE_SOLFEGE_NAMES = [
    'Sib0', 'Reb1', 'Mib1', 'Solb1', 'Lab1',
    'Sib1', 'Reb2', 'Mib2', 'Solb2', 'Lab2',
    'Sib2', 'Reb3', 'Mib3', 'Solb3', 'Lab3',
    'Sib3', 'Reb4', 'Mib4', 'Solb4', 'Lab4',
    'Sib4', 'Reb5', 'Mib5', 'Solb5', 'Lab5',
    'Sib5', 'Reb6', 'Mib6', 'Solb6', 'Lab6',
    'Sib6', 'Reb7', 'Mib7', 'Solb7', 'Lab7', 'Mib7'
];

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

// Main MIDI listener
(async () => {
    try {
        midi = await navigator.requestMIDIAccess();
        console.log('🎹 MIDI devices available:', midi.devices);

        midi.inputs.forEach(port => {
            port.onmidimessage = message => {
                const [command, note, velocity] = message.data;

                // Determine message type
                const commandType = (command & 0xF0) === 0x90 ? 'Note On' :
                                  (command & 0xF0) === 0x80 ? 'Note Off' :
                                  (command & 0xF0) === 0xA0 ? 'Aftertouch' :
                                  'Other';

                if ((command & 0xF0) !== 0x90) return; // only Note On with velocity > 0
                if (velocity == 0) return;

                // Get note name
                const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
                const noteName = noteNames[note % 12] + (Math.floor(note / 12) - 1);

                console.log(
                    `[${commandType}] Note: ${noteName}, Pitch: ${note}, Velocity: ${velocity}`
                );
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

    this.Repaint();
  }

  Repaint() {      
      // If the canvas is inside a flex container, it might have 0 height initially.
      // We ensure height is at least the content or a minimum.
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

  // // 4. Initialize on Load
  // window.onload = Repaint;
          
  // // Handle Window Resize
  // window.addEventListener('resize', Repaint);

  drawPattern() {
      this.ctx.clearRect(0, 0, this.ctx.width, this.ctx.height);
      this.ctx.fillStyle = colorSelect.value;
      this.ctx.beginPath();
      
      if (CANVAS_STATE.width > 0) {
          if (CANVAS_STATE.width < 300) {
              this.ctx.rect(0, 0, CANVAS_STATE.width, 20); // Draw a small bar if narrow
          } else {
              // Draw a pattern or large rectangle for larger screens
              this.ctx.rect(0, 0, CANVAS_STATE.width * 0.3, CANVAS_STATE.height * 0.2);
              this.ctx.rect(0, CANVAS_STATE.height * 0.8, CANVAS_STATE.width * 0.3, CANVAS_STATE.height * 0.2);
              this.ctx.rect(CANVAS_STATE.width * 0.7, 0, CANVAS_STATE.width * 0.2, CANVAS_STATE.height * 0.5);
          }
          this.ctx.fill();
      }
  }

  drawBlackNote(x) {
      this.ctx.fillStyle = '#000000';
      this.ctx.beginPath();
      this.ctx.rect(x, 0, BLACK_NOTE_W * this.scale, BLACK_NOTE_H * this.scale);
      this.ctx.fill(); 
  }

  drawLA(x) {
      for (var i = 0; i < BLACK_NOTES_X.length; i++) {
        this.drawBlackNote(BLACK_NOTES_X[i] * this.scale);
      }

      // BLACK_NOTES_X.forEach(function(x_offset) {
      //     this.drawBlackNote(x_offset * this.scale);
      // });
  }

  drawSpaces() {
      var x = 0;
      for (var i = 0; i < 52; i++) {
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

  getBlackNote(x,y) {
      var x_ref = x / this.scale;
      var y_ref = y / this.scale;
      var i = 0;
      var found = false;

      for (i = 0; i< BLACK_NOTES_X.length; i++) {
          var x_offset = BLACK_NOTES_X[i];
          if ( x_ref > x_offset &&  x_ref < (x_offset + BLACK_NOTE_W) &&  y_ref < BLACK_NOTE_H) {
              found = true;
              break;
          }
      }

      if (found) {
          return i;
      }
      return -1;
  }

  getWhiteNote(x,y) {
      var x_ref = x / this.scale;
      var y_ref = y / this.scale;
      var i = 0;
      var found = false;

      if (y_ref < BLACK_NOTE_H * this.scale) return -1;
      console.log('this.canvas_piano.width = ' + this.canvas_piano.width + ', x = ' + x);
      i = Math.trunc((x /this.canvas_piano.width) * WHITE_NOTE_NAMES.length);
      if (i < 0) i = 0;
      if (i >= WHITE_NOTE_NAMES.length) i = WHITE_NOTE_NAMES.length - 1;
      console.log('white idx: ' + i);
      return i;
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


  onPedalChange(event) {
    // silence all notes upon pedal up
    if (event.target.checked == false) {
      var i;
      for(i = 0; i < WHITE_NOTE_NAMES.length; i++) {
        SAMPLER.triggerRelease(WHITE_NOTE_NAMES[i]);
      }
      for(i = 0; i < BLACK_SHARP_NOTE_NAMES.length; i++) {
        SAMPLER.triggerRelease(BLACK_SHARP_NOTE_NAMES[i]);
      }
    }
  }

  onMidiMessage(event) {
    console.log(`onMidiMessage: ${event.data}`);
  }

  onMouseDown() {
      //this.ctx = this.canvas_piano.getContext('2d');
      var rect = this.canvas_piano.getBoundingClientRect();
      var x = Math.round(event.clientX - rect.left);
      var y = Math.round(event.clientY - rect.top);
      var ratio = this.canvas_piano.width / 52;

      var note_pos_x = 0;
      var note_pos_y = 0;

      var note_name = "";
      var solfege_note_name = "";

      var sharp_note_name = "";
      var flat_note_name = "";

      var solfege_sharp_note_name = "";
      var solfege_flat_note_name = "";

      var display_text = "";



      console.log('Canvas click at', x, y);
      this.x_offset = x;
      // statusDisplay.innerText = `Stored Width: ${canvasState.width}px | Stored Height: ${canvasState.height}px | Note: ${this.x_offset}`;

      var i = this.getBlackNote(x,y);
      if (i >= 0) {
          console.log("getBlackNote ret: " + i);
          sharp_note_name = BLACK_SHARP_NOTE_NAMES[i];
          flat_note_name = BLACK_FLAT_NOTE_NAMES[i];
          solfege_sharp_note_name = BLACK_SHARP_NOTE_SOLFEGE_NAMES[i];
          solfege_flat_note_name = BLACK_FLAT_NOTE_SOLFEGE_NAMES[i];
          display_text =  `${sharp_note_name}, ${flat_note_name} (${solfege_sharp_note_name}, $${solfege_flat_note_name})`;

          note_pos_y = BLACK_NOTE_POS_Y * this.scale;
          note_pos_x = (BLACK_NOTES_X[i] + BALL/2 + 10) * this.scale;

      }
      else {
          i = this.getWhiteNote(x,y);
          if (i >= 0) {
              console.log("getWhiteNote ret: " + i);
              solfege_note_name = WHITE_SOLFEGE_NOTE_NAMES[i];
              note_name = WHITE_NOTE_NAMES[i];
              display_text =  `${note_name} (${solfege_note_name})`;
              note_pos_y = WHITE_NOTE_POS_Y * this.scale;
              note_pos_x = i * ratio + ((BALL/2 + 36) * this.scale);
          }
      }
      this.statusDisplay.innerText = display_text;
      if (note_name.length > 1) {
          this.playNote(note_name);
      }
      if (sharp_note_name.length > 1) {
          this.playNote(sharp_note_name);
      }

      // Draw a circle at the click location
      this.ctx.beginPath();
      this.ctx.arc(note_pos_x, note_pos_y, BALL * this.scale, 0, Math.PI * 2);
      this.ctx.fillStyle = '#ff404088';
      this.ctx.fill();
      this.ctx.closePath();
  }

}


