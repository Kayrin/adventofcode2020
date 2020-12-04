const REQ_NB_FIELDS = 8;

const checkIntRange = (int, min, max) => {
  let parsedInt = parseInt(int);
  return parsedInt >= min && parsedInt <= max;
}

const validateFields = (fields) => {
  if (!((/^\d{4}$/).test(fields.byr) && checkIntRange(fields.byr, 1920, 2002))) return false;
  if (!((/^\d{4}$/).test(fields.iyr) && checkIntRange(fields.iyr, 2010, 2020))) return false;
  if (!((/^\d{4}$/).test(fields.eyr) && checkIntRange(fields.eyr, 2020, 2030))) return false;
  
  let matches = /^(\d+)(cm|in)$/.exec(fields.hgt);
  if (!matches) return false;
  if (matches[2] === 'cm' && !checkIntRange(matches[1], 150, 193)) return false;
  if (matches[2] === 'in' && !checkIntRange(matches[1], 59, 76)) return false;

  if (!(/^#[0-9a-f]{6}$/.test(fields.hcl))) return false;
  if (!(/^(amb|blu|brn|gry|grn|hzl|oth)$/.test(fields.ecl))) return false;
  if (!(/^[0-9]{9}$/.test(fields.pid))) return false;
  return true;
};


exports.run = (data) => {
  const passports = data.split('\n\n');

  // Part One
  let validPassportsPartOne = passports.reduce((acc, passport) => {
    let passportFields = {};
    let fieldsArray = passport.replace(/\n/g, ' ').trim().split(' ');
    fieldsArray.map(field => passportFields[field.split(':')[0]] = field.split(':')[1]);
    if (Object.keys(passportFields).length === REQ_NB_FIELDS || Object.keys(passportFields).length === REQ_NB_FIELDS-1 && !passportFields.hasOwnProperty('cid'))
        return [...acc, passportFields];
    else
        return acc;
  }, []);
  console.log('Part One - Valid passports: ' + validPassportsPartOne.length);

  // Part Two
  let validPassportsPartTwo = validPassportsPartOne.reduce((acc, passport) => {
    return validateFields(passport) ? acc + 1 : acc
  }, 0);
  console.log('Part Two - Valid passports: ' + validPassportsPartTwo);
};