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

export {Instrument};

class Instrument {
  constructor(noteStrokeCallback) {
    this.noteStrokeCallback = noteStrokeCallback;
    this.expectedNextNote = '';
  }

  SetExpectedNextNote(note) {
    this.expectedNextNote = note;
  }

  Repaint() {
    console.log("Repaint should be implemented by derived class");
  }
}