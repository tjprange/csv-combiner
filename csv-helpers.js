/*
This function will return a string consisting of a line read from a .csv file and the filename
@ params { line: string, fileName: string}
@ return string 
*/
module.exports.buildLine = (line, fileName) => {
  return `${line},"${fileName}"`;
}

/*
This function will remove the path and return the filename
@params {filePath: string}
@return string
*/
module.exports.getFileNameFromPath = (filePath) => {
  return filePath.substring(filePath.lastIndexOf("/")+1, filePath.length)
}