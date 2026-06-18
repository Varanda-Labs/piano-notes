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
  }

  SetExpectedNextNote(note) {
    // when next note differs the Instrument should provide visual or audible to highlight the error
    console.log("SetExpectedNextNote should be implemented by derived class");
  }

  Repaint() {
    console.log("Repaint should be implemented by derived class");
  }
}