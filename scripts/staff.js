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
const MIN_CANVAS_H = STAFF_LINE_SPACE * 5 * 3;

const WIDTH_SCALE_REF = 1200;

const CLAVE_DE_SOL = './res/clave-de-sol.svg';
const CLAVE_DE_SOL_RATIO = 96/242; //64/204;
const CLAVE_DE_SOL_H = STAFF_LINE_SPACE * 5 * 1.5;
const CLAVE_DE_SOL_W = CLAVE_DE_SOL_H * CLAVE_DE_SOL_RATIO;
const CLAVE_DE_SOL_X_OFFSET = 20;
const CLAVE_DE_SOL_Y_OFFSET = -20; 



class Staff {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.minHeight = 100;
    this.scale = this.canvas.width / WIDTH_SCALE_REF;
    this.claveDeSolImg = new Image();
    this.claveDeSolImg.src = CLAVE_DE_SOL;

  }

drawStaff() {
  const x = 10 * this.scale;
  const y = 10 * this.scale;
  const staff_line_space = STAFF_LINE_SPACE * this.scale;
  const staff_w = STAFF_W * this.scale;
  const CLAVE_DE_SOL_SCALE = .2;
  const clave_scale = CLAVE_DE_SOL_SCALE * this.scale;
  
  const line_x = x; // TODO: cal center
  const line_y = y;
  var i = 0;
  var y_end;

  this.ctx.fillStyle = '#000000';
  this.ctx.beginPath();

  while (i < 5) {
    this.ctx.moveTo(line_x, line_y + i * staff_line_space );
    this.ctx.lineTo(line_x + staff_w, line_y + i * staff_line_space);
    this.ctx.stroke();
    i++;
  }

  y_end = line_y + 4 * staff_line_space;
  this.ctx.moveTo(line_x, line_y);
  this.ctx.lineTo(line_x, y_end);
  this.ctx.stroke();

  this.ctx.moveTo(line_x + staff_w, line_y);
  this.ctx.lineTo(line_x + staff_w, y_end);
  this.ctx.stroke();

  // this.ctx.drawImage( this.claveDeSolImg, 0, 0, 
  //                     this.claveDeSolImg.width * clave_scale, 
  //                     this.claveDeSolImg.height * clave_scale);
  
  this.ctx.drawImage( this.claveDeSolImg, CLAVE_DE_SOL_X_OFFSET * this.scale, CLAVE_DE_SOL_Y_OFFSET * this.scale, 
                      CLAVE_DE_SOL_W * this.scale, 
                      CLAVE_DE_SOL_H * this.scale);
}

  Repaint() {      
    // const cssHeight = this.canvas.offsetHeight;
    // const minHeight = MIN_CANVAS_H;
    // const actualHeight = Math.max(cssHeight || minHeight, minHeight);

    // this.canvas.height = actualHeight; // drawPiano overrides this

    this.scale = this.canvas.width / WIDTH_SCALE_REF;

    this.canvas.width = this.canvas.offsetWidth;
    // if (this.canvas.height < MIN_CANVAS_H * this.scale) {
    //   this.canvas.height = MIN_CANVAS_H * this.scale;
    // }

    this.drawStaff();
  }
}