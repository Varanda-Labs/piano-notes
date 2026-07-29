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
import { NOTES_IN_STAFF_TABLE, NOTES_TABLE} from "./piano-table.js";


const TOOLTIP_START_PRACTICE = "Start Practicing";
const TOOLTIP_STOP_PRACTICE = "Stop Practicing";
const BUTTON_START_TEXT = "▶ Start";
const BUTTON_STOP_TEXT = "⏹ Stop";

const BACKGROUND_COLOR_PRACTICING = '#b8f9e9';
const BACKGROUND_COLOR_IDLE = '#daf3fc';
const BACKGROUND_COLOR_DOWN = '#fbc2c2';
const PRACTICE_TIME = 180;

const timerLabel = document.getElementById('timerLabel');

const canvas_notes = document.getElementById('canvas_notes');
const canvas_piano = document.getElementById('canvas_piano');
const statusDisplay = document.getElementById('status');
const colorSelect = document.getElementById('colorSelect');
const StartStopBtn = document.getElementById('startStopBtn');
const circleBtn = document.getElementById('drawCircleBtn');
const clearBtn = document.getElementById('clearBtn');
const pedalDownCheckbox = document.getElementById('pedalDownCheckbox');

const right_score = document.getElementById("right-score"); 
const wrong_score = document.getElementById("wrong-score"); 
const total_score = document.getElementById("total-score");
var right_score_int = 0;
var right_wrong_int = 0;

const piano = new Piano(canvas_piano, statusDisplay, pedalDownCheckbox, onNoteStroke);
//const staff = new Staff(canvas_notes);
const sheet = new Sheet(canvas_notes, onGoodAnimationDone, onBadAnimationDone);

StartStopBtn.textContent = BUTTON_START_TEXT;
StartStopBtn.setAttribute('title', TOOLTIP_START_PRACTICE);

statusDisplay.innerText = "";

var scale;
var current_note = "?"
var noteAudioSample;
var audioSynth;
var playingNote = '';

var mode = 'Idle'; // modes: Idle, Practicing

var expectedNextNoteIndex = -1;
var expectedNextIsFlat = false;


const canvasState = {
  width: 0,
  height: 0
};

let countdown = 0;
let intervalId = null;

function score_reset() {
  right_score_int = 0;
  right_wrong_int = 0;
  right_score.textContent = 0;
  wrong_score.textContent = 0;
  total_score.textContent = 0;
}

function score_correct() {
  right_score_int += 1;
  right_score.textContent = right_score_int;
  total_score.textContent = right_score_int + right_wrong_int;
}

function score_incorrect() {
  right_wrong_int += 1;
  wrong_score.textContent = right_wrong_int;
  total_score.textContent = right_score_int + right_wrong_int;
}

function startCountDown() {
    mode = 'Practicing';
    score_reset();
    statusDisplay.innerText = "";
    sheet.setBackgroundColor(BACKGROUND_COLOR_PRACTICING);
    StartStopBtn.textContent = BUTTON_STOP_TEXT;
    StartStopBtn.setAttribute('title', TOOLTIP_STOP_PRACTICE);

    getRandomNoteIndex();
    piano.SetExpectedNextNote(NOTES_IN_STAFF_TABLE[expectedNextNoteIndex].note);

    sheet.addNote(piano.expectedNextNote);

    countdown = PRACTICE_TIME;
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
  getRandomNoteIndex();
  piano.SetExpectedNextNote(NOTES_IN_STAFF_TABLE[expectedNextNoteIndex].note);
  if (expectedNextIsFlat == true) {
    sheet.addNote(NOTES_IN_STAFF_TABLE[expectedNextNoteIndex + 1].note, expectedNextIsFlat);
  } else {
    sheet.addNote(NOTES_IN_STAFF_TABLE[expectedNextNoteIndex].note, expectedNextIsFlat);
  }
  statusDisplay.innerText = "";
}

function onBadAnimationDone() {
  // do nothing for now
}

function noteStatus(i) {
  const note_name = NOTES_TABLE[i].note;
  const flat_note_name = NOTES_TABLE[i].flat;
  const solfege_name = NOTES_TABLE[i].solfege;
  const solfege_flat_note_name = NOTES_TABLE[i].solfege_flat;
    if (NOTES_TABLE[i].is_black) {
      statusDisplay.innerText =  `${note_name}, ${flat_note_name} (${solfege_name}, ${solfege_flat_note_name})`;
    }
    else {
      statusDisplay.innerText =  `${note_name} (${solfege_name})`;
    }
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
    score_correct();
    noteStatus(expectedNextNoteIndex);
  }
  else {
    sheet.setBackgroundColor(BACKGROUND_COLOR_DOWN);
    sheet.startBadAnimation();
    score_incorrect();
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
  [27, 62], // C3 ~ B5  higher
  [27, 62], // C3 ~ B5  higher
  [27, 62], // C3 ~ B5  higher
  [27, 62], // C3 ~ B5  higher
  [27, 62], // C3 ~ B5  higher  
  [14, 26], // B1 ~ B2. lower
  [14, 26], // B1 ~ B2  lower
  [0, 13]   // A0 ~ A1  lowest
];

function getRandomNoteIndex() {
  const i = getRandomRange(0, ranges.length - 1);
  expectedNextNoteIndex = getRandomRange(ranges[i][0], ranges[i][1]);
  expectedNextIsFlat = false;
  if (NOTES_TABLE[expectedNextNoteIndex].is_black == true) {
    if (getRandomRange(0,99) > 70) { // 30% to be flat
      expectedNextIsFlat = true;
    }
  }

  return expectedNextNoteIndex;
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


