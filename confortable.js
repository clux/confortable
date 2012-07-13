var fs   = require('fs')
  , path = require('path')
  , exists = fs.existsSync || path.existsSync;

module.exports = function (name, start) {
  start = start || process.cwd();
  var relative = path.relative(process.env.HOME, start)
    , differentDrive = (relative === start)
    , isAbove = (relative.slice(0, 2) === '..')
    , cfg;

  if (differentDrive || isAbove) {
    // start is outside home, check start only
    cfg = path.join(start, name);
    return exists(cfg) ? cfg : null;
  }
  else {
    // start is somewhere under HOME start, so start there and go up until we hit HOME
    var dir = start;
    while (path.relative(process.env.HOME, dir).slice(0, 2) !== '..') {
      cfg = path.join(dir, name);
      if (exists(cfg)) {
        return cfg;
      }
      dir = path.join(dir, '..');
    }
    return null;
  }
};
