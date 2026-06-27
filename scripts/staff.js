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

export { Staff };

const BLACK_NOTE_W = 50;
const BLACK_NOTE_H = 10;

const STAFF_W = 500;
const STAFF_LINE_SPACE = 20;
const MAX_CANVAS_H = STAFF_LINE_SPACE * 5 * 2;

class Staff {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.minHeight = 100;
    this.scale = 1;

  }

drawStaff() {
  const x = 10;
  const y = 10;
  
  const line_x = x; // TODO: cal center
  const line_y = y;
  var i = 0;
  var y_end;

  this.ctx.fillStyle = '#000000';
  this.ctx.beginPath();

  while (i < 5) {
    this.ctx.moveTo(line_x, line_y + i * STAFF_LINE_SPACE);
    this.ctx.lineTo(line_x + STAFF_W, line_y + i * STAFF_LINE_SPACE);
    this.ctx.stroke();
    i++;
  }

  y_end = line_y + 4 * STAFF_LINE_SPACE;
  this.ctx.moveTo(line_x, line_y);
  this.ctx.lineTo(line_x, y_end);
  this.ctx.stroke();

  this.ctx.moveTo(line_x + STAFF_W, line_y);
  this.ctx.lineTo(line_x + STAFF_W, y_end);
  this.ctx.stroke();


}

  Repaint() {      
  // const cssWidth = this.canvas.offsetWidth;
  // const cssHeight = this.canvas.offsetHeight;

  //   this.minHeight = 100; 
  //   //this.actualHeight = Math.max(cssHeight || minHeight, minHeight);
  //   var actualHeight = 200; // TODO: declared me
    
  //   this.canvas.width = cssWidth;
  //   this.canvas.height = actualHeight;

    this.canvas.width = this.canvas.offsetWidth;
    if (this.canvas.height > MAX_CANVAS_H) {
      this.canvas.height = MAX_CANVAS_H;
    }
    this.drawStaff();
  }
}