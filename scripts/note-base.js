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

const NOTE_IMG_DOWN_X_FRAC = (190 - 20)/250;
const NOTE_IMG_DOWN_Y_FRAC = 97/350;

const NOTE_IMG_DOWN         = "./res/note-down.svg";
const NOTE_IMG_FLAT_DOWN    = "./res/note-flat-down.svg";
const NOTE_IMG_FLAT_UP      = "./res/note-flat-up.svg";
const NOTE_IMG_SHARP_DOWN   = "./res/note-sharp-down.svg";
const NOTE_IMG_SHARP_UP     = "./res/note-sharp-up.svg";
const NOTE_IMG_UP           = "./res/note-up.svg";

const EXTRALINE_W = 8;
const EXTRALINE_X_OFFSET = 38;


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
  constructor(canvas, note_name, is_flat) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.note_name = note_name;
    this.is_flat = is_flat;

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

  async drawNote(clef, scale, staff_x, staff_y, line_space) {
    const OFFSET_TO_FLIP_NOTE_DOWN = 1;
    var off_x = this.Note_w * this.noteImgUp.x_frac / NOTE_IMG_WH_RATE * scale;
    var off_y = this.Note_w * this.noteImgUp.y_frac / NOTE_IMG_WH_RATE * scale;
    const lineSpaceOffsetDic = this.getLineSpaceOffset(this.note_name, false);
    var lineSpaceOffset = lineSpaceOffsetDic.G_CLEF_LINE_POS;
    var extra_lines = lineSpaceOffsetDic.G_CLEF_EXTRA_LINES;
    var img;

    if (clef != "G-CLEF") {
      lineSpaceOffset = lineSpaceOffsetDic.F_CLEF_LINE_POS;
      extra_lines = lineSpaceOffsetDic.F_CLEF_EXTRA_LINES;
    }

    if (lineSpaceOffset == null) {
      console.log(`Note ${this.note_name} can not be display in ${clef}`);
      return;
    }

    if (this.note_name.indexOf('#') > 0) {
      if (lineSpaceOffset > OFFSET_TO_FLIP_NOTE_DOWN) {
        img = this.noteImgSharpUp.img;
      }
      else {
        img = this.noteImgSharpDown.img;
        off_x = this.Note_w * this.noteImgDown.x_frac / NOTE_IMG_WH_RATE * scale;
        off_y = this.Note_w * this.noteImgDown.y_frac / NOTE_IMG_WH_RATE * scale;
      }
    }
    else {
      if (lineSpaceOffset > OFFSET_TO_FLIP_NOTE_DOWN) {
        img = this.noteImgUp.img;
      }
      else {
        img = this.noteImgDown.img;
        off_x = this.Note_w * this.noteImgDown.x_frac / NOTE_IMG_WH_RATE * scale;
        off_y = this.Note_w * this.noteImgDown.y_frac / NOTE_IMG_WH_RATE * scale;
      }
    }

    if (extra_lines > 0) {
        var i = 5;
        while (i < 5 + extra_lines) {
          this.ctx.moveTo(staff_x - (EXTRALINE_X_OFFSET * scale), staff_y + i * line_space );
          this.ctx.lineTo(staff_x + EXTRALINE_W * scale, staff_y + i * line_space);
          this.ctx.stroke();
          i++;
      }
    }

    if (extra_lines < 0) {
        var i = -1;
        while (i >= extra_lines) {
          this.ctx.moveTo(staff_x - (EXTRALINE_X_OFFSET * scale), staff_y + i * line_space );
          this.ctx.lineTo(staff_x + EXTRALINE_W * scale, staff_y + i * line_space);
          this.ctx.stroke();
          i--;
      }
    }

    try {
      await img.decode(); 
      
      this.ctx.drawImage( img,
                          staff_x - off_x,
                          lineSpaceOffset * line_space + staff_y - off_y,
                          this.Note_w * scale, 
                          this.Note_h * scale);
    } catch (error) {
      console.error("Image failed to load or decode:", error);
    }

  }

  getLineSpaceOffset(note_name, is_flat) {
    var n = NOTES_IN_STAFF_TABLE.find( function (a) 
      { if (a.note == note_name) 
          return true; 
        return false; 
      }
    );
    return n;
  }
}