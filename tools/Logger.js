const color = require("colorette");

class Logger {
  log = function log(msg) {
    console.log(color.yellow(msg));
  };
  debug = function debug(msg) {
    console.log(color.cyan(msg));
  };
  error = function error(msg) {
    console.log(color.red(msg));
  };
}

module.exports = Logger;
