const constChars = {
  FRONT_ROW:    'F',
  BACK_ROW:     'B',
  LEFT_COLUMN:  'L',
  RIGHT_COLUMN: 'R'
};
const maxRows = 128;
const maxIndexRow = 6;
const maxCol  = 8;

const computeHalf = (row, index, _lower, _upper, res) => {
  // Return result once finished iterating on each char
  if (index > 9) {
    res.col = _lower;
    return res;
  }
  // Reset params to start searching column
  if (index === 7) {
    res.row = _lower;
    _lower = 0;
    _upper = 7;
  }
  if (row.charAt(index) === constChars.FRONT_ROW) {
    return computeHalf(row, index+1, _lower, _upper - Math.round(maxRows/2**(index+1)), res);
  }
  if (row.charAt(index) === constChars.BACK_ROW) {
    return computeHalf(row, index+1, _upper + 1 - Math.round(maxRows/2**(index+1)), _upper, res);
  }
  if (row.charAt(index) === constChars.LEFT_COLUMN) {
    return computeHalf(row, index+1, _lower, _upper - Math.round(maxCol/2**(index-maxIndexRow)), res);
  }
  if (row.charAt(index) === constChars.RIGHT_COLUMN) {
    return computeHalf(row, index+1, _upper + 1 - Math.round(maxCol/2**(index-maxIndexRow)), _upper, res);
  }
};

exports.run = (data) => {
  const rows = data.split('\n');
  const seats = rows.reduce((acc, row) => {
    let res = computeHalf(row, 0, 0, maxRows-1, { row: null, col: null });
    return [...acc, res];
  }, []);

  // Part One
  const seatIds = seats.map(seat => seat.row * 8 + seat.col);
  const maxSeatId = seatIds.sort((a, b) => b - a)[0];
  console.log('Max seat ID: ' + maxSeatId);

  // Part Two
  seatIds.forEach((seat, index) => {
    if (seatIds[index+1] !== seat - 1 && index !== seatIds.length-1) {
      console.log(`My seat ID is ${seat-1}`);
    }
  });
};