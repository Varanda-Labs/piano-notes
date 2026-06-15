
const canvas_notes = document.getElementById('canvas_notes');
const canvas_piano = document.getElementById('canvas_piano');
const statusDisplay = document.getElementById('status');
const colorSelect = document.getElementById('colorSelect');
const rectBtn = document.getElementById('drawRectBtn');
const circleBtn = document.getElementById('drawCircleBtn');
const clearBtn = document.getElementById('clearBtn');

const WH_RATIO = 10.3595;
const BLACK_NOTE_W = 88;
const BLACK_NOTE_H = 513;
const KEY_H = 770;
const SPACE_W = 11;
const SPACE_H = KEY_H;
const NOTE_W = 153;
const BALL = 70;

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

var scale;
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

function getWhiteNote(x,y) {
    var x_ref = x / scale;
    var y_ref = y / scale;
    var i = 0;
    var found = false;

    if (y_ref < BLACK_NOTE_H * scale) return -1;
    console.log('canvas_piano.width = ' + canvas_piano.width + ', x = ' + x);
    i = Math.trunc((x /canvas_piano.width) * WHITE_NOTE_NAMES.length);
    if (i < 0) i = 0;
    if (i >= WHITE_NOTE_NAMES.length) i = WHITE_NOTE_NAMES.length - 1;
    console.log('white idx: ' + i);
    return i;
}

function onNoteClicked() {
    const ctx = canvas_piano.getContext('2d');
    const rect = canvas_piano.getBoundingClientRect();
    const x = Math.round(event.clientX - rect.left);
    const y = Math.round(event.clientY - rect.top);

    var note_name = "";
    var solfege_note_name = "";

    var sharp_note_name = "";
    var flat_note_name = "";

    var solfege_sharp_note_name = "";
    var solfege_flat_note_name = "";

    var display_text = "";

    console.log('Canvas click at', x, y);
    current_note = x;
    // statusDisplay.innerText = `Stored Width: ${canvasState.width}px | Stored Height: ${canvasState.height}px | Note: ${current_note}`;

    var i = getBlackNote(x,y);
    if (i >= 0) {
        console.log("getBlackNote ret: " + i);
        sharp_note_name = BLACK_SHARP_NOTE_NAMES[i];
        flat_note_name = BLACK_FLAT_NOTE_NAMES[i];
        solfege_sharp_note_name = BLACK_SHARP_NOTE_SOLFEGE_NAMES[i];
        solfege_flat_note_name = BLACK_FLAT_NOTE_SOLFEGE_NAMES[i];
        display_text =  sharp_note_name + ', ' + 
                        flat_note_name + '  ' + 
                        solfege_sharp_note_name + ', ' + 
                        solfege_flat_note_name;
    }
    else {
        i = getWhiteNote(x,y);
        if (i >= 0) {
            console.log("getWhiteNote ret: " + i);
            solfege_note_name = WHITE_SOLFEGE_NOTE_NAMES[i];
            note_name = WHITE_NOTE_NAMES[i];
        display_text =  note_name + ', ' +  solfege_note_name;
        }
    }
    statusDisplay.innerText = display_text;

    // Draw a circle at the click location
    ctx.beginPath();
    ctx.arc(x, y, BALL * scale, 0, Math.PI * 2);
    ctx.fillStyle = '#ff404088';
    ctx.fill();
    ctx.closePath();
}

canvas_piano.addEventListener('click', onNoteClicked);

// Trigger initial draw
resizeCanvases();