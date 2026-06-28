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


 */

export { Staff, G_CLEF, F_CLEF };

const G_CLEF = 'G-CLEF';
const F_CLEF = 'F-CLEF';

const BLACK_NOTE_W = 50;
const BLACK_NOTE_H = 10;

const STAFF_W = 500;
const STAFF_LINE_SPACE = 20;
const MIN_CANVAS_H = STAFF_LINE_SPACE * 5 * 3;

const CLAVE_DE_SOL = './res/clave-de-sol.svg';
const CLAVE_DE_SOL_RATIO = 96/242;
const CLAVE_DE_SOL_H = STAFF_LINE_SPACE * 5 * 1.5;
const CLAVE_DE_SOL_W = CLAVE_DE_SOL_H * CLAVE_DE_SOL_RATIO;
const CLAVE_DE_SOL_X_OFFSET = 20;
const CLAVE_DE_SOL_Y_OFFSET = -30; 

const CLAVE_DE_FA = './res/clave-de-fa.svg';
const CLAVE_DE_FA_RATIO = 420/494;
const CLAVE_DE_FA_H = STAFF_LINE_SPACE * 3.2;
const CLAVE_DE_FA_W = CLAVE_DE_FA_H * CLAVE_DE_FA_RATIO;
const CLAVE_DE_FA_X_OFFSET = 20;
const CLAVE_DE_FA_Y_OFFSET = -2; 

class Clave {
  constructor(  file,
                h,
                w,
                x_offset,
                y_offset) {
    this.file = file;
    this.h = h;
    this.w = w;
    this.x_offset = x_offset;
    this.y_offset = y_offset;
    this.claveImage = new Image();
    this.claveImage.src = this.file;
  }
}

class Staff {
  constructor(canvas, clef) {
    this.canvas = canvas;
    this.clef = clef;
    this.ctx = canvas.getContext('2d');
    this.minHeight = 100;
    this.claveDeSolImg = new Clave(
      CLAVE_DE_SOL,
      CLAVE_DE_SOL_H,
      CLAVE_DE_SOL_W,
      CLAVE_DE_SOL_X_OFFSET,
      CLAVE_DE_SOL_Y_OFFSET
    );

    this.claveDeFaImg = new Clave(
      CLAVE_DE_FA,
      CLAVE_DE_FA_H,
      CLAVE_DE_FA_W,
      CLAVE_DE_FA_X_OFFSET,
      CLAVE_DE_FA_Y_OFFSET
    );

    if (clef == 'G-CLEF') {
      this.activeClave = this.claveDeSolImg;
    }
    else if (clef == 'F-CLEF') {
      this.activeClave = this.claveDeFaImg;
    }
    else {
      console.log("clef must be either G-CLEF or F-CLEF, assuming G-CLEF");
      this.activeClave = this.claveDeSolImg;
    }
  }

  getStaffSize(scale) {
    const w = STAFF_W * scale;
    const h = STAFF_LINE_SPACE * scale * 5;
    return { "width": w, "height": h};

  }

  drawStaff(scale, line_x, line_y) {
    const staff_line_space = STAFF_LINE_SPACE * scale;
    const staff_w = STAFF_W * scale;
    
    // const line_x = x; // TODO: cal center
    // const line_y = y;
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
    
    this.ctx.drawImage( this.activeClave.claveImage,
                        line_x + this.activeClave.x_offset * scale, 
                        line_y + this.activeClave.y_offset * scale, 
                        this.activeClave.w * scale, 
                        this.activeClave.h * scale);
  }

}