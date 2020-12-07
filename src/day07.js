exports.run = (data) => {
  const rules = data.split('\n');
  let rulesMap = {};
  let keysLeftToCheck = new Set();
  let keysChecked = new Set();
  let ruleNameRegex = /^([a-z]+ [a-z]+) bags contain/;
  let ruleContentRegex = /((\d{1}) ([a-z]+ [a-z]+) bags?),?/g;
  rules.forEach(rule => {
    let ruleNameMatch = rule.match(ruleNameRegex);
    let ruleName = ruleNameMatch[1];
    let ruleContents = rule.match(ruleContentRegex);
    // No rule = contain no other bags
    rulesMap[ruleName] = {};
    if (!ruleContents) {
      keysChecked.add(ruleName);
    }
    else {
      // else, contains sub rules
      let match;
      ruleContents.forEach(bagRule => {
        match = ruleContentRegex.exec(bagRule);
        while (match !== null) {
          // Re-loop afterwards to complete the list of all types of bags
          keysLeftToCheck.add(match[3]);
          rulesMap[ruleName][match[3]] = parseInt(match[2]); // number of bags per type
          match = ruleContentRegex.exec(bagRule);
        }
      });
    }
  });
  // console.log(rulesMap)
  while (keysLeftToCheck.size > 0) {
    Object.entries(rulesMap).forEach(([key, rules]) => {
      Object.keys(rules).forEach(rule => {        
        rulesMap[key] = Object.assign(rulesMap[key], rulesMap[rule]);
        // rulesMap[key][rule] = rulesMap[key][rule] ? rulesMap[key][rule] + rules[rule] : rules[rule]
        // If it's the last level of recursion = bag already checked
        if (keysChecked.has(rule)) {
          keysLeftToCheck.delete(rule);
          keysChecked.add(key);
        }
      });
    });
  }
  // console.log(rulesMap)
  console.log(Object.values(rulesMap).filter(x => x['shiny gold']).length)
};