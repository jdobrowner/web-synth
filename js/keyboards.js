(function() {

  const CLASS = '<div class="', ID = '" id="', END = '"></div>', CLOSE = '</div>';
  const KEYS = '<div class="keys', BLACK = '<div class="black-keys">', WHITE = '<div class="white-keys">';

  var whiteKeyNums = [1,3,5,6,8,10,12,13,15,17,18,20,22,24,25];
  var blackKeyNums = [2,4,7,9,11,14,16,19,21,23];

  var whiteKeys25 = whiteKeyNums.map( n => CLASS + getLetter(n) + ID + n + END ).join('');
  var blackKeys25 = blackKeyNums.map( n => CLASS + getLetter(n) + spacing(n) + ID + n + END ).join('');
  var whiteKeys49 = whiteKeyNums.map( n => CLASS + getLetter(n) + ID + (n+24) + END ).join('');
  var blackKeys49 = blackKeyNums.map( n => CLASS + getLetter(n) + spacing(n) + ID + (n+24) + END ).join('');
  var whiteKeys73 = whiteKeyNums.map( n => CLASS + getLetter(n) + ID + (n+48) + END ).join('');
  var blackKeys73 = blackKeyNums.map( n => CLASS + getLetter(n) + spacing(n) + ID + (n+48) + END ).join('');

  var row1 = KEYS + ' row1">' + BLACK + blackKeys25 + CLOSE + WHITE + whiteKeys25 + CLOSE + CLOSE;
  var row2 = KEYS + ' row2">' + BLACK + blackKeys49 + CLOSE + WHITE + whiteKeys49 + CLOSE + CLOSE;
  var row3 = KEYS + ' row3">' + BLACK + blackKeys73 + CLOSE + WHITE + whiteKeys73 + CLOSE + CLOSE;

  module.exports = { row1: row1, row2: row2, row3: row3 };
})();

function getLetter(n) {
  var m = n % 12;
  switch(m) {
    case 1: return 'C';
    case 2: return 'Cs';
    case 3: return 'D';
    case 4: return 'Ds';
    case 5: return 'E';
    case 6: return 'F';
    case 7: return 'Fs';
    case 8: return 'G';
    case 9: return 'Gs';
    case 10: return 'A';
    case 11: return 'As';
    case 0: return 'B';
    default: return;
  }
}

function spacing(n) {
  var spacer;
  var m = n % 12;
  if ((m === 4) || (m === 9) || (m === 11)) spacer = ' half-step-margin';
  else if ((m === 2) || (m === 7)) spacer = ' whole-step-margin';
  if (n === 2) spacer = ' shift-left';
  return spacer;
}
