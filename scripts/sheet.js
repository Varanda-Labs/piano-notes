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

    this.Repaint();
  }

  Repaint() {
    this.scale = this.canvas.width / WIDTH_SCALE_REF;
    const staff_area = this.staff_1.getStaffSize(this.scale);
    const space = staff_area.height / 5;
    const y_first_staff = space * 5;
    const y_second_staff = space * 15;

    this.canvas.width = this.canvas.offsetWidth;

    const canvas_h = window.innerHeight / 2;
    this.canvas.height = canvas_h;
    this.scale = this.canvas.width / WIDTH_SCALE_REF;

    var line_x = (this.canvas.width - staff_area.width) / 2;

    this.staff_1.drawStaff(this.scale, line_x, y_first_staff);
    this.staff_2.drawStaff(this.scale, line_x, y_second_staff);

  }
}