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
  constructor(canvas) {
    this.canvas = canvas;
    this.scale = this.canvas.width / WIDTH_SCALE_REF;

    this.staff_1 = new Staff(canvas_notes, G_CLEF);
    this.staff_2 = new Staff(canvas_notes, F_CLEF);

    this.current_note = null; //this.staff_2.addNote('C2', false);

    this.Repaint();
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

    // both clefs and space in between takes 12 spaces.
    // Therefore, to place the vertical center the first clef y position will be:
    //. (height - (12 * space)) / 2

    const y_first_staff = (canvas_h - 12 * space) / 2; // space * 5;
    const y_second_staff = y_first_staff + 8 * space; // space * 13;

    this.canvas.width = this.canvas.offsetWidth;

    // const canvas_h = window.innerHeight / 2;
    // this.canvas.height = canvas_h;
    // this.scale = this.canvas.width / WIDTH_SCALE_REF;

    var line_x = (this.canvas.width - staff_area.width) / 2;

    this.staff_1.drawStaff(this.scale, line_x, y_first_staff);
    this.staff_2.drawStaff(this.scale, line_x, y_second_staff);

  }
}