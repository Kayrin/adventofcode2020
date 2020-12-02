exports.run = (data) => {
  let numbers = data.split('\n');
  
  console.log('Part One');
  numbers.forEach((xi, i) => {
    numbers.forEach((xj, j)=> {
      if (i !== j && parseInt(xi) + parseInt(xj) === 2020) {
        console.log(`${xi} + ${xj} = 2020`);
        console.log(`${xi} * ${xj} = ${xi*xj}`);
      }
    });
  });

  console.log('\nPart Two');
  numbers.forEach((xi, i) => {
    numbers.forEach((xj, j)=> {
      if (i !== j) {
        let sum1 = parseInt(xi) + parseInt(xj);
        if (sum1 <= 2020) {
          numbers.forEach((xk, k) => {
            if ((i !== k && j !== k) && sum1 + parseInt(xk) === 2020) {
              console.log(`${xi} + ${xj} + ${xk} = 2020`);
              console.log(`${xi} * ${xj} + ${xk} = ${xi*xj*xk}`);
            }
          });
        }
      }
    });
  });
};