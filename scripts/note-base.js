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

export { Note };
//import { Staff, G_CLEF, F_CLEF } from "./staff.js";

const NOTE_IMG_WH_RATE = 250/350;

const NOTE_IMG_UP_X_FRAC = 126/250;
const NOTE_IMG_UP_Y_FRAC = 270/350;

const NOTE_IMG_DOWN_X_FRAC = 190/250;
const NOTE_IMG_DOWN_Y_FRAC = 97/350;

const NOTE_IMG_DOWN         = "./res/note-down.svg";
const NOTE_IMG_FLAT_DOWN    = "./res/note-flat-down.svg";
const NOTE_IMG_FLAT_UP      = "./res/note-flat-up.svg";
const NOTE_IMG_SHARP_DOWN   = "./res/note-sharp-down.svg";
const NOTE_IMG_SHARP_UP     = "./res/note-sharp-up.svg";
const NOTE_IMG_UP           = "./res/note-up.svg";

class NoteImage {
  constructor(filename, wh_rate, x_frac, y_frac) {
    this.file = filename;
    this.img = new Image();
    this.img.src = filename;
    this.x_frac = x_frac;
    this.y_frac = y_frac;
  }
}

class Note {
  constructor(canvas) {
    this.canvas = canvas;

    this.noteImgDown = new NoteImage( NOTE_IMG_DOWN, 
                                      NOTE_IMG_WH_RATE,
                                      NOTE_IMG_DOWN_X_FRAC,
                                      NOTE_IMG_DOWN_Y_FRAC);

    this.noteImgFlatDown = new NoteImage( NOTE_IMG_FLAT_DOWN, 
                                          NOTE_IMG_WH_RATE, 
                                          NOTE_IMG_DOWN_X_FRAC,
                                          NOTE_IMG_DOWN_Y_FRAC);

    this.noteImgFlatUp = new NoteImage( NOTE_IMG_FLAT_UP, 
                                        NOTE_IMG_WH_RATE,
                                        NOTE_IMG_UP_X_FRAC,
                                        NOTE_IMG_UP_Y_FRAC);

    this.noteImgSharpDown = new NoteImage(  NOTE_IMG_SHARP_DOWN, 
                                            NOTE_IMG_WH_RATE, 
                                            NOTE_IMG_DOWN_X_FRAC,
                                            NOTE_IMG_DOWN_Y_FRAC);

    this.noteImgSharpUp = new NoteImage(  NOTE_IMG_SHARP_UP,
                                          NOTE_IMG_WH_RATE,
                                          NOTE_IMG_UP_X_FRAC,
                                          NOTE_IMG_UP_Y_FRAC);

    this.noteImgUp = new NoteImage( NOTE_IMG_UP, 
                                    NOTE_IMG_WH_RATE,
                                    NOTE_IMG_UP_X_FRAC,
                                    NOTE_IMG_UP_Y_FRAC);
  }

  drawNote(note_name, is_flat, clef, scale, staff_x, staff_y, line_space) {

  }
}