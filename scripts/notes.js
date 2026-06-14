// 1. Select Elements
const canvas_notes = document.getElementById('canvas_notes');
const canvas_piano = document.getElementById('canvas_piano');
const statusDisplay = document.getElementById('status');
const colorSelect = document.getElementById('colorSelect');
const rectBtn = document.getElementById('drawRectBtn');
const circleBtn = document.getElementById('drawCircleBtn');
const clearBtn = document.getElementById('clearBtn');

const WH_RATIO = 10.3595;
var current_note = "?"


// Configuration for the "Piano" Synth
// We use PolySynth to allow multiple notes to be played at once
const synth = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: "triangle" }, // Triangle waves are softer/singable
    envelope: {
        attack: 0.02,  // Fast attack
        decay: 0.2,    // Quick fall to sustain
        sustain: 0.5,  // Moderate volume
        release: 1.5   // Slow fade out (release)
    }
}).toDestination();

// 2. Storage Object
// This stores the logical (CSS) dimensions
const canvasState = {
    width: 0,
    height: 0
};

// 3. Function to resize and store data
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
    
    canvas_piano.width = cssWidth;
    canvas_piano.height = actualHeight;

    // Store it
    canvasState.width = canvas_notes.width;
    canvasState.height = 200; //actualHeight;

    // update circle
    //drawCircle();
    drawPiano();
    drawNote();

    // Update Status
    statusDisplay.innerText = `Stored Width: ${canvasState.width}px | Stored Height: ${canvasState.height}px | Note: ${current_note}`;
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

const BLACK_NOTE_W = 88;
const BLACK_NOTE_H = 513;
const KEY_H = 770;
const SPACE_W = 11;
const SPACE_H = KEY_H;
const NOTE_W = 153;
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
    'A0#', 'C1#', 'D1#', 'F1#', 'G1#',
    'A1#', 'C2#', 'D2#', 'F2#', 'G2#',
    'A2#', 'C3#', 'D3#', 'F3#', 'G3#',
    'A3#', 'C4#', 'D4#', 'F4#', 'G4#',
    'A4#', 'C5#', 'D5#', 'F5#', 'G5#',
    'A5#', 'C6#', 'D6#', 'F6#', 'G6#',
    'A6#', 'C7#', 'D7#', 'F7#', 'G7#', 'A7#'
]

const BLACK_BEMOL_NOTE_NAMES = [
    'B0b', 'D1b', 'E1b', 'G1b', 'A1b',
    'B1b', 'D2b', 'E2b', 'G2b', 'A2b',
    'B2b', 'D3b', 'E3b', 'G3b', 'A3b',
    'B3b', 'D4b', 'E4b', 'G4b', 'A4b',
    'B4b', 'D5b', 'E5b', 'G5b', 'A5b',
    'B5b', 'D6b', 'E6b', 'G6b', 'A6b',
    'B6b', 'D7b', 'E7b', 'G7b', 'A7b', 'B7b'
]

const BLACK_SHARP_NOTE_SOLFEGE_NAMES = [
    'La0#', 'Do1#', 'Re1#', 'Fa1#', 'Sol1#',
    'La1#', 'Do2#', 'Re2#', 'Fa2#', 'Sol2#',
    'La2#', 'Do3#', 'Re3#', 'Fa3#', 'Sol3#',
    'La3#', 'Do4#', 'Re4#', 'Fa4#', 'Sol4#',
    'La4#', 'Do5#', 'Re5#', 'Fa5#', 'Sol5#',
    'La5#', 'Do6#', 'Re6#', 'Fa6#', 'Sol6#',
    'La6#', 'Do7#', 'Re7#', 'Fa7#', 'Sol7#', 'La7#'
]

const BLACK_BEMOL_NOTE_SOLFEGE_NAMES = [
    'Si0b', 'Re1b', 'Mi1b', 'G1b', 'Sol1b',
    'Si1b', 'Re2b', 'Mi2b', 'G2b', 'Sol2b',
    'Si2b', 'Re3b', 'Mi3b', 'G3b', 'Sol3b',
    'Si3b', 'Re4b', 'Mi4b', 'G4b', 'Sol4b',
    'Si4b', 'Re5b', 'Mi5b', 'G5b', 'Sol5b',
    'Si5b', 'Re6b', 'Mi6b', 'G6b', 'Sol6b',
    'Si6b', 'Re7b', 'Mi7b', 'G7b', 'Sol7b', 'Si7b'
]

var scale;

function drawBlackNote(ctx, x) {
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.rect(x, 0, BLACK_NOTE_W * scale, BLACK_NOTE_H * scale);
    ctx.fill(); 
}

function drawLA(ctx, x) {
    BLACK_NOTES_X.forEach(function(x_offset) {
        drawBlackNote(ctx, x_offset * scale);
    });
    // drawBlackNote(ctx, 131 * scale);
}

function drawSpaces(ctx) {
    var x = 0;
    for (i = 0; i < 52; i++) {
        ctx.rect(x * scale, 0, SPACE_W * scale, SPACE_H * scale);
        ctx.fill(); 
        x = x + NOTE_W;
    }
}

function drawNote() {
    canvas_notes.height = 100; //h * 1.0;
}

function drawPiano () {
    const w = canvas_piano.width;
    const h = w / WH_RATIO;
    canvas_piano.height = h * 1.0;

    scale = h /KEY_H;
    const ctx = canvas_piano.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.rect(0, 0, w, h);
    ctx.fill();

    drawLA(ctx, 0);
    drawSpaces(ctx);
}

function drawCircle () {
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
    synth.triggerAttackRelease("C3", "8n");
});

function getBlackNote(x,y) {
    var x_ref = x / scale;
    var y_ref = y / scale;
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

function onNoteClicked() {
    const ctx = canvas_piano.getContext('2d');
    const rect = canvas_piano.getBoundingClientRect();
    const x = Math.round(event.clientX - rect.left);
    const y = Math.round(event.clientY - rect.top);

    console.log('Canvas click at', x, y);
    current_note = x;
    statusDisplay.innerText = `Stored Width: ${canvasState.width}px | Stored Height: ${canvasState.height}px | Note: ${current_note}`;

    var i = getBlackNote(x,y);
    console.log("getBlackNote ret: " + i);
    // Draw a circle at the click location
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fillStyle = '#ff404088';
    ctx.fill();
    ctx.closePath();
}

canvas_piano.addEventListener('click', onNoteClicked);

// Trigger initial draw
resizeCanvases();