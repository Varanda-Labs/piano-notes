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
import { /*NOTES_TABLE, WHITE_INDEX_LOOKUP,*/ NOTES_IN_STAFF_TABLE} from "./piano-table.js";

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
    this.ctx = canvas.getContext('2d');

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
    this.Note_w = 80;
    this.Note_h = this.Note_w / NOTE_IMG_WH_RATE;
  }

  drawNote(note_name, is_flat, clef, scale, staff_x, staff_y, line_space) {
    const off_x = this.Note_w * this.noteImgUp.x_frac / NOTE_IMG_WH_RATE * scale;
    const off_y = this.Note_w * this.noteImgUp.y_frac / NOTE_IMG_WH_RATE * scale;
    const lineSpaceOffsetDic = this.getLineSpaceOffset(note_name, false);
    var lineSpaceOffset = lineSpaceOffsetDic.G_CLEF_LINE_POS;
    var extra_lines = lineSpaceOffsetDic.G_CLEF_EXTRA_LINES;
    if (clef != "G-CLEF") {
      lineSpaceOffset = lineSpaceOffsetDic.F_CLEF_LINE_POS;
      lineSpaceOffsetDic.F_CLEF_EXTRA_LINES;
    }

    if (lineSpaceOffset == null) {
      console.log(`Note ${note_name} can not be display in ${clef}`);
      return;
    }

    this.ctx.drawImage( this.noteImgUp.img,
                        staff_x - off_x,
                        lineSpaceOffset * line_space + staff_y - off_y,
                        this.Note_w * scale, 
                        this.Note_h * scale);
  }

  getLineSpaceOffset(note_name, is_flat) {
    // return {"HAS-VALID-G-CLEF": true, "G-CLEF": 0, "HAS-VALID-F-CLEF": true, "F-CLEF": -1}
    var n = NOTES_IN_STAFF_TABLE.find( function (a) 
      { if (a.note == note_name) 
          return true; 
        return false; 
      }
    );
    return n;
  }
}