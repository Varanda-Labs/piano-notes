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

export { NOTES_TABLE, WHITE_INDEX_LOOKUP }

const NOTES_TABLE = [
  { 'note': 'A0', 'is_black': false, 'flat': '',    'solfege': 'La0', 'solfege_flat': '',      'blackX_whiteCnt': 0},   // 0
  { 'note': 'A#0', 'is_black': true, 'flat': 'Bb0', 'solfege': 'La#0', 'solfege_flat': 'Sib0', 'blackX_whiteCnt': 131}, 
  { 'note': 'B0', 'is_black': false, 'flat': '',    'solfege': 'Si0',  'solfege_flat': '',     'blackX_whiteCnt': 1},   // 2
  { 'note': 'C1', 'is_black': false, 'flat': '',    'solfege': 'Do1',  'solfege_flat': '',     'blackX_whiteCnt': 2},   // 3
  { 'note': 'C#1', 'is_black': true, 'flat': 'Db1', 'solfege': 'Do#1', 'solfege_flat': 'Reb1', 'blackX_whiteCnt': 407}, 
  { 'note': 'D1', 'is_black': false, 'flat': '',    'solfege': 'Re1',  'solfege_flat': '',     'blackX_whiteCnt': 3},   // 5
  { 'note': 'D#1', 'is_black': true, 'flat': 'Eb1', 'solfege': 'Re#1', 'solfege_flat': 'Mib1', 'blackX_whiteCnt': 589}, 
  { 'note': 'E1', 'is_black': false, 'flat': '',    'solfege': 'Mi1',  'solfege_flat': '',     'blackX_whiteCnt': 4},   // 7
  { 'note': 'F1', 'is_black': false, 'flat': '',    'solfege': 'Fa1',  'solfege_flat': '',     'blackX_whiteCnt': 5},   // 8
  { 'note': 'F#1', 'is_black': true, 'flat': 'Gb1', 'solfege': 'Fa#1', 'solfege_flat': 'Solb1','blackX_whiteCnt': 868}, 
  { 'note': 'G1', 'is_black': false, 'flat': '',    'solfege': 'Sol1', 'solfege_flat': '',     'blackX_whiteCnt': 6},   // 10
  { 'note': 'G#1', 'is_black': true, 'flat': 'Ab1', 'solfege': 'Sol#1','solfege_flat': 'Lab1', 'blackX_whiteCnt': 1036},
  { 'note': 'A1', 'is_black': false, 'flat': '',    'solfege': 'La1',  'solfege_flat': '',     'blackX_whiteCnt': 7},   // 12
  { 'note': 'A#1', 'is_black': true, 'flat': 'Bb1', 'solfege': 'La#1', 'solfege_flat': 'Sib1', 'blackX_whiteCnt': 1203}, 
  { 'note': 'B1', 'is_black': false, 'flat': '',    'solfege': 'Si1',  'solfege_flat': '',     'blackX_whiteCnt': 8},   // 14
  { 'note': 'C2', 'is_black': false, 'flat': '',    'solfege': 'Do2',  'solfege_flat': '',     'blackX_whiteCnt': 9},   // 15
  { 'note': 'C#2', 'is_black': true, 'flat': 'Db2', 'solfege': 'Do#2', 'solfege_flat': 'Reb2', 'blackX_whiteCnt': 1479}, 
  { 'note': 'D2', 'is_black': false, 'flat': '',    'solfege': 'Re2',  'solfege_flat': '',     'blackX_whiteCnt': 10},   // 17
  { 'note': 'D#2', 'is_black': true, 'flat': 'Eb2', 'solfege': 'Re#2', 'solfege_flat': 'Mib2', 'blackX_whiteCnt': 1661}, 
  { 'note': 'E2', 'is_black': false, 'flat': '',    'solfege': 'Mi2',  'solfege_flat': '',     'blackX_whiteCnt': 11},   // 19
  { 'note': 'F2', 'is_black': false, 'flat': '',    'solfege': 'Fa2',  'solfege_flat': '',     'blackX_whiteCnt': 12},   // 20
  { 'note': 'F#2', 'is_black': true, 'flat': 'Gb2', 'solfege': 'Fa#2', 'solfege_flat': 'Solb2','blackX_whiteCnt': 1940}, 
  { 'note': 'G2', 'is_black': false, 'flat': '',    'solfege': 'Sol2', 'solfege_flat': '',     'blackX_whiteCnt': 13},   // 22
  { 'note': 'G#2', 'is_black': true, 'flat': 'Ab2', 'solfege': 'Sol#2','solfege_flat': 'Lab2', 'blackX_whiteCnt': 2108},
  { 'note': 'A2', 'is_black': false, 'flat': '',    'solfege': 'La2',  'solfege_flat': '',     'blackX_whiteCnt': 14},   // 24
  { 'note': 'A#2', 'is_black': true, 'flat': 'Bb2', 'solfege': 'La#2', 'solfege_flat': 'Sib2', 'blackX_whiteCnt': 2275}, 
  { 'note': 'B2', 'is_black': false, 'flat': '',    'solfege': 'Si2',  'solfege_flat': '',     'blackX_whiteCnt': 15},   // 26
  { 'note': 'C3', 'is_black': false, 'flat': '',    'solfege': 'Do3',  'solfege_flat': '',     'blackX_whiteCnt': 16},   // 27
  { 'note': 'C#3', 'is_black': true, 'flat': 'Db3', 'solfege': 'Do#3', 'solfege_flat': 'Reb3', 'blackX_whiteCnt': 2551}, 
  { 'note': 'D3', 'is_black': false, 'flat': '',    'solfege': 'Re3',  'solfege_flat': '',     'blackX_whiteCnt': 17},   // 29
  { 'note': 'D#3', 'is_black': true, 'flat': 'Eb3', 'solfege': 'Re#3', 'solfege_flat': 'Mib3', 'blackX_whiteCnt': 2733}, 
  { 'note': 'E3', 'is_black': false, 'flat': '',    'solfege': 'Mi3',  'solfege_flat': '',     'blackX_whiteCnt': 18},   // 31
  { 'note': 'F3', 'is_black': false, 'flat': '',    'solfege': 'Fa3',  'solfege_flat': '',     'blackX_whiteCnt': 19},   // 32
  { 'note': 'F#3', 'is_black': true, 'flat': 'Gb3', 'solfege': 'Fa#3', 'solfege_flat': 'Solb3','blackX_whiteCnt': 3012}, 
  { 'note': 'G3', 'is_black': false, 'flat': '',    'solfege': 'Sol3', 'solfege_flat': '',     'blackX_whiteCnt': 20},   // 34
  { 'note': 'G#3', 'is_black': true, 'flat': 'Ab3', 'solfege': 'Sol#3','solfege_flat': 'Lab3', 'blackX_whiteCnt': 3180},
  { 'note': 'A3', 'is_black': false, 'flat': '',    'solfege': 'La3',  'solfege_flat': '',     'blackX_whiteCnt': 21},   // 36
  { 'note': 'A#3', 'is_black': true, 'flat': 'Bb3', 'solfege': 'La#3', 'solfege_flat': 'Sib3', 'blackX_whiteCnt': 3347}, 
  { 'note': 'B3', 'is_black': false, 'flat': '',    'solfege': 'Si3',  'solfege_flat': '',     'blackX_whiteCnt': 22},   // 38
  { 'note': 'C4', 'is_black': false, 'flat': '',    'solfege': 'Do4',  'solfege_flat': '',     'blackX_whiteCnt': 23},   // 39
  { 'note': 'C#4', 'is_black': true, 'flat': 'Db4', 'solfege': 'Do#4', 'solfege_flat': 'Reb4', 'blackX_whiteCnt': 3623}, 
  { 'note': 'D4', 'is_black': false, 'flat': '',    'solfege': 'Re4',  'solfege_flat': '',     'blackX_whiteCnt': 24},   // 41
  { 'note': 'D#4', 'is_black': true, 'flat': 'Eb4', 'solfege': 'Re#4', 'solfege_flat': 'Mib4', 'blackX_whiteCnt': 3805}, 
  { 'note': 'E4', 'is_black': false, 'flat': '',    'solfege': 'Mi4',  'solfege_flat': '',     'blackX_whiteCnt': 25},   // 43
  { 'note': 'F4', 'is_black': false, 'flat': '',    'solfege': 'Fa4',  'solfege_flat': '',     'blackX_whiteCnt': 26},   // 44
  { 'note': 'F#4', 'is_black': true, 'flat': 'Gb4', 'solfege': 'Fa#4', 'solfege_flat': 'Solb4','blackX_whiteCnt': 4084}, 
  { 'note': 'G4', 'is_black': false, 'flat': '',    'solfege': 'Sol4', 'solfege_flat': '',     'blackX_whiteCnt': 27},   // 46
  { 'note': 'G#4', 'is_black': true, 'flat': 'Ab4', 'solfege': 'Sol#4','solfege_flat': 'Lab4', 'blackX_whiteCnt': 4252},
  { 'note': 'A4', 'is_black': false, 'flat': '',    'solfege': 'La4',  'solfege_flat': '',     'blackX_whiteCnt': 28},   // 48
  { 'note': 'A#4', 'is_black': true, 'flat': 'Bb4', 'solfege': 'La#4', 'solfege_flat': 'Sib4', 'blackX_whiteCnt': 4419}, 
  { 'note': 'B4', 'is_black': false, 'flat': '',    'solfege': 'Si4',  'solfege_flat': '',     'blackX_whiteCnt': 29},   // 50
  { 'note': 'C5', 'is_black': false, 'flat': '',    'solfege': 'Do5',  'solfege_flat': '',     'blackX_whiteCnt': 30},   // 51
  { 'note': 'C#5', 'is_black': true, 'flat': 'Db5', 'solfege': 'Do#5', 'solfege_flat': 'Reb5', 'blackX_whiteCnt': 4695}, 
  { 'note': 'D5', 'is_black': false, 'flat': '',    'solfege': 'Re5',  'solfege_flat': '',     'blackX_whiteCnt': 31},   // 53
  { 'note': 'D#5', 'is_black': true, 'flat': 'Eb5', 'solfege': 'Re#5', 'solfege_flat': 'Mib5', 'blackX_whiteCnt': 4877}, 
  { 'note': 'E5', 'is_black': false, 'flat': '',    'solfege': 'Mi5',  'solfege_flat': '',     'blackX_whiteCnt': 32},   // 55
  { 'note': 'F5', 'is_black': false, 'flat': '',    'solfege': 'Fa5',  'solfege_flat': '',     'blackX_whiteCnt': 33},   // 56
  { 'note': 'F#5', 'is_black': true, 'flat': 'Gb5', 'solfege': 'Fa#5', 'solfege_flat': 'Solb5','blackX_whiteCnt': 5156}, 
  { 'note': 'G5', 'is_black': false, 'flat': '',    'solfege': 'Sol5', 'solfege_flat': '',     'blackX_whiteCnt': 34},   // 58
  { 'note': 'G#5', 'is_black': true, 'flat': 'Ab5', 'solfege': 'Sol#5','solfege_flat': 'Lab5', 'blackX_whiteCnt': 5324},
  { 'note': 'A5', 'is_black': false, 'flat': '',    'solfege': 'La5',  'solfege_flat': '',     'blackX_whiteCnt': 35},   // 60
  { 'note': 'A#5', 'is_black': true, 'flat': 'Bb5', 'solfege': 'La#5', 'solfege_flat': 'Sib5', 'blackX_whiteCnt': 5491}, 
  { 'note': 'B5', 'is_black': false, 'flat': '',    'solfege': 'Si5',  'solfege_flat': '',     'blackX_whiteCnt': 36},   // 62
  { 'note': 'C6', 'is_black': false, 'flat': '',    'solfege': 'Do6',  'solfege_flat': '',     'blackX_whiteCnt': 37},   // 63
  { 'note': 'C#6', 'is_black': true, 'flat': 'Db6', 'solfege': 'Do#6', 'solfege_flat': 'Reb6', 'blackX_whiteCnt': 5767}, 
  { 'note': 'D6', 'is_black': false, 'flat': '',    'solfege': 'Re6',  'solfege_flat': '',     'blackX_whiteCnt': 38},   // 65
  { 'note': 'D#6', 'is_black': true, 'flat': 'Eb6', 'solfege': 'Re#6', 'solfege_flat': 'Mib6', 'blackX_whiteCnt': 5949}, 
  { 'note': 'E6', 'is_black': false, 'flat': '',    'solfege': 'Mi6',  'solfege_flat': '',     'blackX_whiteCnt': 39},   // 67
  { 'note': 'F6', 'is_black': false, 'flat': '',    'solfege': 'Fa6',  'solfege_flat': '',     'blackX_whiteCnt': 40},   // 68
  { 'note': 'F#6', 'is_black': true, 'flat': 'Gb6', 'solfege': 'Fa#6', 'solfege_flat': 'Solb6','blackX_whiteCnt': 6228}, 
  { 'note': 'G6', 'is_black': false, 'flat': '',    'solfege': 'Sol6', 'solfege_flat': '',     'blackX_whiteCnt': 41},   // 70
  { 'note': 'G#6', 'is_black': true, 'flat': 'Ab6', 'solfege': 'Sol#6','solfege_flat': 'Lab6', 'blackX_whiteCnt': 6396},
  { 'note': 'A6', 'is_black': false, 'flat': '',    'solfege': 'La6',  'solfege_flat': '',     'blackX_whiteCnt': 42},   // 72
  { 'note': 'A#6', 'is_black': true, 'flat': 'Bb6', 'solfege': 'La#6', 'solfege_flat': 'Sib6', 'blackX_whiteCnt': 6563}, 
  { 'note': 'B6', 'is_black': false, 'flat': '',    'solfege': 'Si6',  'solfege_flat': '',     'blackX_whiteCnt': 43},   // 74
  { 'note': 'C7', 'is_black': false, 'flat': '',    'solfege': 'Do7',  'solfege_flat': '',     'blackX_whiteCnt': 44},   // 75
  { 'note': 'C#7', 'is_black': true, 'flat': 'Db7', 'solfege': 'Do#7', 'solfege_flat': 'Reb7', 'blackX_whiteCnt': 6839}, 
  { 'note': 'D7', 'is_black': false, 'flat': '',    'solfege': 'Re7',  'solfege_flat': '',     'blackX_whiteCnt': 45},   // 77
  { 'note': 'D#7', 'is_black': true, 'flat': 'Eb7', 'solfege': 'Re#7', 'solfege_flat': 'Mib7', 'blackX_whiteCnt': 7021}, 
  { 'note': 'E7', 'is_black': false, 'flat': '',    'solfege': 'Mi7',  'solfege_flat': '',     'blackX_whiteCnt': 46},   // 79
  { 'note': 'F7', 'is_black': false, 'flat': '',    'solfege': 'Fa7',  'solfege_flat': '',     'blackX_whiteCnt': 47},   // 80
  { 'note': 'F#7', 'is_black': true, 'flat': 'Gb7', 'solfege': 'Fa#7', 'solfege_flat': 'Solb7','blackX_whiteCnt': 7300}, 
  { 'note': 'G7', 'is_black': false, 'flat': '',    'solfege': 'Sol7', 'solfege_flat': '',     'blackX_whiteCnt': 48},   // 82
  { 'note': 'G#7', 'is_black': true, 'flat': 'Ab7', 'solfege': 'Sol#7','solfege_flat': 'Lab7', 'blackX_whiteCnt': 7468},
  { 'note': 'A7', 'is_black': false, 'flat': '',    'solfege': 'La7',  'solfege_flat': '',     'blackX_whiteCnt': 49},   // 84
  { 'note': 'A#7', 'is_black': true, 'flat': 'Bb7', 'solfege': 'La#7', 'solfege_flat': 'Sib7', 'blackX_whiteCnt': 7635}, 
  { 'note': 'B7', 'is_black': false, 'flat': '',    'solfege': 'Si7',  'solfege_flat': '',     'blackX_whiteCnt': 50},   // 86
  { 'note': 'C8', 'is_black': false, 'flat': '',    'solfege': 'Do8',  'solfege_flat': '',     'blackX_whiteCnt': 51}    // 87
];

const WHITE_INDEX_LOOKUP = [
    0,2,3,5,7,8,10,12,14,15,17,
    19,20,22,24,26,27,29,31,32,34,36,38,39,41,
    43,44,46,48,50,51,53,55,56,58,60,62,63,65,
    67,68,70,72,74,75,77,79,80,82,84,86,87
]