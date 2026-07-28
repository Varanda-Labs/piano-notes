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

 Demo: https://varanda-labs.github.io/piano-notes/

 midi: first pitch 21, last 108
 */
import { Piano } from "./piano.js";
import { Sheet } from "./sheet.js";
import { NOTES_IN_STAFF_TABLE} from "./piano-table.js";


const TOOLTIP_START_PRACTICE = "Start Practicing";
const TOOLTIP_STOP_PRACTICE = "Stop Practicing";
const BUTTON_START_TEXT = "▶ Start";
const BUTTON_STOP_TEXT = "⏹ Stop";

const BACKGROUND_COLOR_PRACTICING = '#b8f9e9';
const BACKGROUND_COLOR_IDLE = '#daf3fc';
const BACKGROUND_COLOR_DOWN = '#fbc2c2';


const timerLabel = document.getElementById('timerLabel');

const canvas_notes = document.getElementById('canvas_notes');
const canvas_piano = document.getElementById('canvas_piano');
const statusDisplay = document.getElementById('status');
const colorSelect = document.getElementById('colorSelect');
const StartStopBtn = document.getElementById('startStopBtn');
const circleBtn = document.getElementById('drawCircleBtn');
const clearBtn = document.getElementById('clearBtn');
const pedalDownCheckbox = document.getElementById('pedalDownCheckbox');

const piano = new Piano(canvas_piano, statusDisplay, pedalDownCheckbox, onNoteStroke);
//const staff = new Staff(canvas_notes);
const sheet = new Sheet(canvas_notes, onGoodAnimationDone, onBadAnimationDone);

StartStopBtn.textContent = BUTTON_START_TEXT;
StartStopBtn.setAttribute('title', TOOLTIP_START_PRACTICE);

var scale;
var current_note = "?"
var noteAudioSample;
var audioSynth;
var playingNote = '';

var mode = 'Idle'; // modes: Idle, Practicing
//var practicing_state = 'WaitingPlayerInput';


const canvasState = {
  width: 0,
  height: 0
};

let countdown = 300;
let intervalId = null;

function startCountDown() {
    mode = 'Practicing';
    sheet.setBackgroundColor(BACKGROUND_COLOR_PRACTICING);
    StartStopBtn.textContent = BUTTON_STOP_TEXT;
    StartStopBtn.setAttribute('title', TOOLTIP_STOP_PRACTICE);
    piano.SetExpectedNextNote(getRandomNote());
    sheet.addNote(piano.expectedNextNote);

    countdown = 300;
    timerLabel.textContent = countdown;
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(() => {
        countdown--;
        timerLabel.textContent = countdown;
        if (countdown <= 0) {
            stopCountDown();
        }
    }, 1000);
}

function stopCountDown() {
    clearInterval(intervalId);
    intervalId = null;
    timerLabel.textContent = "0";

    mode = 'Idle';
    StartStopBtn.textContent = BUTTON_START_TEXT;
    StartStopBtn.setAttribute('title', TOOLTIP_START_PRACTICE);
    sheet.setBackgroundColor(BACKGROUND_COLOR_IDLE);
    piano.SetExpectedNextNote('');
}

function onGoodAnimationDone() {
  piano.SetExpectedNextNote(getRandomNote());
  sheet.addNote(piano.expectedNextNote);
}

function onBadAnimationDone() {
  
}

function onNoteStroke(note_name) {
  if (mode == 'Idle') {
    sheet.addNote(note_name);
    sheet.Repaint();
    return;
  }
  //console.log(`********** onNoteStroke: ${note_name} ********`);

  if (note_name == piano.expectedNextNote) {
    // Success
    sheet.setBackgroundColor(BACKGROUND_COLOR_PRACTICING);
    sheet.startGoodAnimation();
  }
  else {
    sheet.setBackgroundColor(BACKGROUND_COLOR_DOWN);
    sheet.startBadAnimation();
  }

}

function resizeCanvases() {
  piano.Repaint();
  sheet.Repaint();

  drawNote();

}

// 4. Initialize on Load
window.onload = resizeCanvases;

// Handle Window Resize
window.addEventListener('resize', resizeCanvases);

function getRandomRange(inclusive_min, inclusive_max) {
  const r = Math.floor(Math.random() * ( inclusive_max - inclusive_min + 1));
  return r + inclusive_min;
}

const ranges = [
  [75, 87], // C7 ~ C8. lowest probability
  [63, 74], // C6 ~ B6. lower       "
  [63, 74], // C6 ~ B6. lower       "
  [27, 62], // C3 ~ B5  higher      "
  [27, 62], // C3 ~ B5  higher
  [27, 62], // C3 ~ B5  higher
  [27, 62], // C3 ~ B5  higher
  [27, 62], // C3 ~ B5  higher
  [27, 62], // C3 ~ B5  higher 
  [14, 26], // B1 ~ B2. lower
  [14, 26], // B1 ~ B2  lower
  [0, 13]   // A0 ~ A1  lowest
];

function getRandomNote() {
  const i = getRandomRange(0, ranges.length - 1);
  const ii =  getRandomRange(ranges[i][0], ranges[i][1]);
  const s = NOTES_IN_STAFF_TABLE[ii].note;
  console.log(`note = ${s}`);
  return s;
}

// 5. Helper: Draw function
function drawPattern(ctx) {
  ctx.clearRect(0, 0, ctx.width, ctx.height);
  ctx.fillStyle = colorSelect.value;
  ctx.beginPath();

  // Draw a shape relative to canvas size
  if (canvasState.width > 0) {
    if (canvasState.width < 300) {
      ctx.rect(0, 0, canvasState.width, 20); // Draw a small bar if narrow
    } else {
      // Draw a pattern or large rectangle for larger screens
      ctx.rect(0, 0, canvasState.width * 0.3, canvasState.height * 0.2);
      ctx.rect(0, canvasState.height * 0.8, canvasState.width * 0.3, canvasState.height * 0.2);
      ctx.rect(canvasState.width * 0.7, 0, canvasState.width * 0.2, canvasState.height * 0.5);
    }
    ctx.fill();
  }
}

function drawNote() {
  //canvas_notes.height = 100; //h * 1.0;
}

function drawCircle() {
  const ctx = canvas_notes.getContext('2d');
  // const ctx = canvas_piano.getContext('2d');

  ctx.clearRect(0, 0, ctx.width, ctx.height);
  ctx.fillStyle = colorSelect.value;
  ctx.beginPath();
  ctx.arc(canvas_notes.width / 2, canvas_notes.height / 2, canvas_notes.width / 4, 0, Math.PI * 2);
  ctx.fill();
}

function OnStartStopBtn() {
  if (mode == 'Idle') {
    startCountDown();
  }
  else {
    stopCountDown();
  }

}

// 6. Event Listeners
StartStopBtn.addEventListener('click', OnStartStopBtn);

circleBtn.addEventListener('click', drawCircle);

clearBtn.addEventListener('click', () => {
  const ctx = canvas_notes.getContext('2d');
  ctx.clearRect(0, 0, ctx.width, ctx.height);
  if (pedalDownCheckbox.checked == true) {
    synth.triggerAttackRelease("C3", "8n");
  }

  // piano.keyDown('C4', '+1');

});

// piano.SetExpectedNextNote('C4');

resizeCanvases();


