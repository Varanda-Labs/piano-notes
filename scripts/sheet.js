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

export { Sheet };
import { Staff, G_CLEF, F_CLEF } from "./staff.js";

const WIDTH_SCALE_REF = 1400;

class Sheet {
  constructor(canvas, goodAnimationDoneCallback = null, badAnimationDoneCallback = null) {
    this.canvas = canvas;
    this.goodAnimationDoneCallback = goodAnimationDoneCallback;
    this.badAnimationDoneCallback = badAnimationDoneCallback;

    this.scale = this.canvas.width / WIDTH_SCALE_REF;

    this.staff_1 = new Staff(canvas_notes, G_CLEF);
    this.staff_2 = new Staff(canvas_notes, F_CLEF);

    this.current_note = null; //this.staff_2.addNote('C2', false);

    this.Repaint();
  }

  setBackgroundColor(color) {
    this.canvas.style.backgroundColor = color;
  }

  addNote(note_name, is_flat) {
    if (this.current_note != null) {
      this.staff_1.removeNote(this.current_note);
      this.staff_2.removeNote(this.current_note);
    }
    this.current_note = this.staff_1.addNote(note_name, is_flat);
    this.current_note = this.staff_2.addNote(note_name, is_flat);
    this.Repaint();
  }

  Repaint() {
    this.scale = this.canvas.width / WIDTH_SCALE_REF;
    const canvas_h = window.innerHeight / 2;
    this.canvas.height = canvas_h;
    this.scale = this.canvas.width / WIDTH_SCALE_REF;

    const staff_area = this.staff_1.getStaffSize(this.scale);
    const space = staff_area.height / 4;

    const CLEF_NUM_VERTICAL_SPACES = 4;
    const SPACE_BETWEEN_CLEFS_IN_SPACES = 6;
    const BOTH_CLEFS_NUM_SPACES = (CLEF_NUM_VERTICAL_SPACES * 2) + SPACE_BETWEEN_CLEFS_IN_SPACES;

    const y_first_staff = (canvas_h - BOTH_CLEFS_NUM_SPACES * space) / 2;
    const y_second_staff = y_first_staff + ((CLEF_NUM_VERTICAL_SPACES + SPACE_BETWEEN_CLEFS_IN_SPACES) * space);

    this.canvas.width = this.canvas.offsetWidth;

    var line_x = (this.canvas.width - staff_area.width) / 2;

    this.staff_1.drawStaff(this.scale, line_x, y_first_staff);
    this.staff_2.drawStaff(this.scale, line_x, y_second_staff);

  }

  goodAnimationDone(event) {
    if (this.goodAnimationDoneCallback != null) {
      this.goodAnimationDoneCallback();
    }
  }

  badAnimationDone(event) {
    if (this.badAnimationDoneCallback != null) {
      this.badAnimationDoneCallback();
    }
  }

  startGoodAnimation() {
    setTimeout(event =>this.goodAnimationDone(event), 1000);
  }

  startBadAnimation() {
    setTimeout(event =>this.badAnimationDone(event), 1000);
  }
}