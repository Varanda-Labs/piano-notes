// 1. Select Elements
const canvas1 = document.getElementById('canvas1');
const canvas2 = document.getElementById('canvas2');
const statusDisplay = document.getElementById('status');
const colorSelect = document.getElementById('colorSelect');
const rectBtn = document.getElementById('drawRectBtn');
const circleBtn = document.getElementById('drawCircleBtn');
const clearBtn = document.getElementById('clearBtn');

// 2. Storage Object
// This stores the logical (CSS) dimensions
const canvasState = {
    width: 0,
    height: 0
};

// 3. Function to resize and store data
function resizeCanvases() {
    // Get CSS display width/height (in pixels)
    const cssWidth = canvas1.offsetWidth;
    const cssHeight = canvas1.offsetHeight;
    
    // If the canvas is inside a flex container, it might have 0 height initially.
    // We ensure height is at least the content or a minimum.
    const minHeight = 200; 
    const actualHeight = Math.max(cssHeight || minHeight, minHeight);

    // Update CSS width/height first (for immediate visual change)
    canvas1.width = cssWidth;
    canvas1.height = actualHeight;
    
    canvas2.width = cssWidth;
    canvas2.height = actualHeight;

    // Store it
    canvasState.width = canvas1.width;
    canvasState.height = actualHeight;

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

// 6. Event Listeners
rectBtn.addEventListener('click', () => drawPattern(canvas1.getContext('2d')));
circleBtn.addEventListener('click', () => {
    const ctx = canvas1.getContext('2d');
    ctx.clearRect(0, 0, ctx.width, ctx.height);
    ctx.fillStyle = colorSelect.value;
    ctx.beginPath();
    ctx.arc(canvas1.width / 2, canvas1.height / 2, canvas1.width / 4, 0, Math.PI * 2);
    ctx.fill();
});

clearBtn.addEventListener('click', () => {
    const ctx = canvas1.getContext('2d');
    ctx.clearRect(0, 0, ctx.width, ctx.height);
});

// Trigger initial draw
resizeCanvases();