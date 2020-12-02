// Make sure we got a filename on the command line.
if (process.argv.length < 3) {
  console.log('Usage: node run.js DAY (e.g. node run.js day01)');
  process.exit(1);
}
// Read the file and print its contents.
let fs = require('fs')
  , filename = process.argv[2];
fs.readFile('./input/' + filename, 'utf8', function (err, data) {
  if (err) throw err;
  // console.log(data);
  let cmd = require(`./src/${filename}.js`)
  cmd.run(data);
});