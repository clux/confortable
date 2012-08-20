var fs   = require('fs')
  , path = require('path')
  , existsSync = fs.existsSync || path.existsSync;

var findFromStart = function (name, start) {
  start = start || process.cwd();
  var relative = path.relative(process.env.HOME, start)
    , noRelation = (relative === start) // i.e. different drive or undefined HOME
    , isAbove = (relative.slice(0, 2) === '..')
    , cfg;

  if (noRelation || isAbove) {
    // start is outside home, check start only
    cfg = path.join(start, name);
    if (existsSync(cfg)) {
      return cfg;
    }
    else {
      cfg = path.join(process.env.HOME, name);
      return existsSync(cfg) ? cfg : null;
    }
  }
  else {
    // start is somewhere under HOME start, so start there and go up until we hit HOME
    var dir = start;
    while (true) {
      relative = path.relative(process.env.HOME, dir);
      if (relative.slice(0, 2) === '..') {
        break; // dir is above HOME
      }

      cfg = path.join(dir, name);
      if (existsSync(cfg)) {
        return cfg;
      }

      // windows users can put a drive root to home in which case adding '..' does nothing
      if (path.join(dir, '..') === path.normalize(dir)) {
        break; // next iteration's dir is root, and nothing's there, prevent infinite loop
      }
      dir = path.join(dir, '..');
    }
    return null;
  }
};


module.exports = function (name, start, fallbackDir) {
  var result = findFromStart(name, start);
  if (result || !fallbackDir) {
    return result;
  }
  var fbPath = path.join(fallbackDir, name);
  return (existsSync(fbPath)) ? fbPath : null;
};
