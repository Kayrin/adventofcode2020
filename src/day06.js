exports.run = (data) => {
  const groups = data.split('\n\n');

  // Part One
  const sumCountsAnyone = groups.reduce((acc, group) => {
    return acc + group.replace(/\n/g, '').split('').filter((char, i, arr) => arr.indexOf(char) === i).length;
  }, 0);
  console.log(`Sum of questions to which anyone answered yes = ${sumCountsAnyone}`);

  // Part Two
  const sumCountsEveryone = groups.reduce((acc, group) => {
    let nbPeople = group.split('\n').length;
    let uniqueLetters = group.replace(/\n/g, '').split('').filter((char, i, arr) => arr.indexOf(char) === i);
    let allAnswers = group.replace(/\n/g, '');
    return acc + uniqueLetters.reduce((allYes, letter) => {
      return allAnswers.match(new RegExp(letter, 'g')).length === nbPeople ? allYes + 1 : allYes
    }, 0);
  }, 0);
  console.log(`Sum of questions to which everyone answered yes = ${sumCountsEveryone}`);
}