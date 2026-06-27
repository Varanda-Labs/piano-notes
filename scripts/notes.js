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
import { Staff } from "./staff.js";



const canvas_notes = document.getElementById('canvas_notes');
const canvas_piano = document.getElementById('canvas_piano');
const statusDisplay = document.getElementById('status');
const colorSelect = document.getElementById('colorSelect');
const rectBtn = document.getElementById('drawRectBtn');
const circleBtn = document.getElementById('drawCircleBtn');
const clearBtn = document.getElementById('clearBtn');
const pedalDownCheckbox = document.getElementById('pedalDownCheckbox');

const piano = new Piano(canvas_piano, statusDisplay, pedalDownCheckbox);
const staff = new Staff(canvas_notes);

var scale;
var current_note = "?"
var noteAudioSample;
var audioSynth;
var playingNote = '';


const canvasState = {
  width: 0,
  height: 0
};

function resizeCanvases() {
  // Get CSS display width/height (in pixels)
  const cssWidth = canvas_notes.offsetWidth;
  const cssHeight = canvas_notes.offsetHeight;

  // If the canvas is inside a flex container, it might have 0 height initially.
  // We ensure height is at least the content or a minimum.
  const minHeight = 100;
  const actualHeight = Math.max(cssHeight || minHeight, minHeight);

  // Update CSS width/height first (for immediate visual change)
  canvas_notes.width = cssWidth;
  canvas_notes.height = actualHeight; // drawPiano overrides this

  // Store it
  canvasState.width = canvas_notes.width;
  canvasState.height = 200; //actualHeight;

  piano.Repaint();
  staff.Repaint();

  drawNote();

  // Update Status
  //statusDisplay.innerText = `Stored Width: ${canvasState.width}px | Stored Height: ${canvasState.height}px | Note: ${current_note}`;
}

// 4. Initialize on Load
window.onload = resizeCanvases;

// Handle Window Resize
window.addEventListener('resize', resizeCanvases);

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

// 6. Event Listeners
rectBtn.addEventListener('click', () => drawPattern(canvas_notes.getContext('2d')));

circleBtn.addEventListener('click', drawCircle);

clearBtn.addEventListener('click', () => {
  const ctx = canvas_notes.getContext('2d');
  ctx.clearRect(0, 0, ctx.width, ctx.height);
  if (pedalDownCheckbox.checked == true) {
    synth.triggerAttackRelease("C3", "8n");
  }

  // piano.keyDown('C4', '+1');

});

resizeCanvases();


