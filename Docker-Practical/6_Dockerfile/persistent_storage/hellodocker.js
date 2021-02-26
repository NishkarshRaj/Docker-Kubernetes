/* File System Object */
var fs = require('fs');

/* Read File */

fs.readFile('data/DATA', 'utf8', function(err, contents) {
    console.log(contents);
});