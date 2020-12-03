const CHAR_TREE = '#'

function traverseMap(lines, right, down) {
  const LINE_LENGTH = lines[0].length;
  let nbTrees = 0, x = 0;

  for (let y = 0; y < lines.length; y += down) {
    if (lines[y][x % LINE_LENGTH] === CHAR_TREE)
      nbTrees++;
    
    x += right;
  }
  console.log(`Right ${right}, down ${down}: ${nbTrees} trees`);
  return nbTrees;
}

exports.run = (data) => {
  const lines = data.split('\n');
  const slopes = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]];
  let treesProd = slopes.reduce((prod, slope) => prod * traverseMap(lines, slope[0], slope[1]), 1);
  console.log("Prod: " + treesProd);
};