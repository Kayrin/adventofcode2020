exports.run = (data) => {
  let lines = data.split('\n');
  let counter1 = 0;
  let counter2 = 0;

  lines.forEach(line => {
    let range = line.split(' ')[0];

    let lowerBound = range.split('-')[0];
    let upperBound = range.split('-')[1];
    let letter = line.split(':')[0].split(' ')[1];
    let pwd = line.split(':')[1];

    let regex = new RegExp(letter, 'g');
    if (pwd) {
      pwd = pwd.trim();
      var result = pwd.match(regex);
      if (result && result.length >= lowerBound && result.length <= upperBound) {
        counter1++;
      }

      if (pwd[lowerBound - 1] === letter ^ pwd[upperBound - 1] === letter) {
        counter2++;
      }
    }
  });
  console.log(`Part One - Valid lines: ${counter1}`);
  console.log(`Part Two - Valid lines: ${counter2}`);
};