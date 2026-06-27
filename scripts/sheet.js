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
import { Staff } from "./staff.js";

class Sheet {
  constructor(canvas) {
    this.canvas = canvas;
    this.staff_1 = new Staff(canvas_notes);
    this.Repaint();
  }

  Repaint() {
    this.staff_1.Repaint();
  }
}