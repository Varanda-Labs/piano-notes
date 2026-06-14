// 1. Select Elements
const canvas_notes = document.getElementById('canvas_notes');
const canvas_piano = document.getElementById('canvas_piano');
const statusDisplay = document.getElementById('status');
const colorSelect = document.getElementById('colorSelect');
const rectBtn = document.getElementById('drawRectBtn');
const circleBtn = document.getElementById('drawCircleBtn');
const clearBtn = document.getElementById('clearBtn');

const WH_RATIO = 10.3595;


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
    const minHeight = 200; 
    const actualHeight = Math.max(cssHeight || minHeight, minHeight);

    // Update CSS width/height first (for immediate visual change)
    canvas_notes.width = cssWidth;
    canvas_notes.height = actualHeight;
    
    canvas_piano.width = cssWidth;
    canvas_piano.height = actualHeight;

    // Store it
    canvasState.width = canvas_notes.width;
    canvasState.height = actualHeight;

    // update circle
    drawCircle();
    drawPiano();

    // Update Status
    statusDisplay.innerText = `Stored Width: ${canvasState.width}px | Stored Height: ${canvasState.height}px`;
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
const NOTE_W = 153.4;
const LALA = [
        131, 407, 589, 868, 1036, 1203,
        1479, 1661, 1940, 2108, 2275,
        2551, 2733, 3012, 3180, 3347,
        3623, 3805, 4084, 4252, 4419,
        4695, 4877, 5156, 5324, 5491,
        5767, 5949, 6228, 6396, 6563,
        6839, 7021, 7300, 7468, 7635,
        // 7911
    ];

var scale;

function drawBlackNote(ctx, x) {
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.rect(x, 0, BLACK_NOTE_W * scale, BLACK_NOTE_H * scale);
    ctx.fill(); 
}

function drawLA(ctx, x) {
    LALA.forEach(function(x_offset) {
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

function drawPiano () {
    const w = canvas_piano.width;
    const h = w / WH_RATIO;
    scale = h /KEY_H;
    const ctx = canvas_notes.getContext('2d');
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

// Trigger initial draw
resizeCanvases();