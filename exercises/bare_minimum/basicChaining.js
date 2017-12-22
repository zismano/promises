/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var promisification = require('./promisification.js');
var promConstructor = require('./promiseConstructor.js');

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {  // with promise, should always return the promise!
  return promConstructor.pluckFirstLineFromFileAsync(readFilePath)  // return promise, after return first line of file (aka user)
    .then(firstLine => promisification.getGitHubProfileAsync(firstLine))  // if succeed, return profile github (aka objectbody)
    .then(body => { // if succeed,
      var promisifiedWriteFile = Promise.promisify(fs.writeFile); // promisify async writeFile function
      return promisifiedWriteFile(writeFilePath, JSON.stringify(body)); // return promise, after writing body to file
    })
    .catch(err => console.error(err));  // err
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
