const fs = require('fs');
const readline = require('readline');
const { buildLine, getFileNameFromPath, getColumnHeaders } = require('./csv-helpers');

/*
Documentation for reading from file: 
https://nodejs.org/dist/latest-v15.x/docs/api/readline.html#readline_example_read_file_stream_line_by_line

This function will prune "email_hash","category" from each file read and output the remaining contents to stdout.
@param {filePath: string, firstFile: bool} 
filePath represents the filePath for the file to read from
firstFile is a boolean which be used to acquire header columns 
@return none
*/
async function processLineByLine(filePath, firstFile) {
  // setup for reading from file
  const fileStream = fs.createReadStream(filePath); 
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const fileName = getFileNameFromPath(filePath);  

  let firstLine = true; // flag to omit header lines
  for await (const line of rl) {      
    if(firstFile){ // print header columns for first file read
      console.log(`${line},"filename"`);
      firstFile = false;
    } else if (firstLine) { // skip headers for subsuquent files
      firstLine = false;
      continue;
    } else { 
      console.log(buildLine(line, fileName));
    }
  }
}

// Args >= 2 represent filepaths and will be sent to processLineByLine
let args = process.argv.slice(2);

// Run each cmd argument through processLineByLine
for(let i = 0; i < args.length; i++){
  i === 0 ? processLineByLine(args[i], true) : processLineByLine(args[i], false) 
}


