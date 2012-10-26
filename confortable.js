var exists = require('fs').existsSync
  , path = require('path');

var withinHome = function (dir) {
  return (path.relative(process.env.HOME, dir).slice(0, 2) !== '..');
};

var findFromStart = function (name, start) {
  start = start || process.cwd();
  var relative = path.relative(process.env.HOME, start)
    , noRelation = (relative === start) // i.e. different drive or undefined HOME
    , isAbove = (relative.slice(0, 2) === '..');

  if (noRelation || isAbove) {
    // start is outside HOME: check start and HOME only
    var startCfg = path.join(start, name)
      , homeCfg = path.join(process.env.HOME, name);

    if (exists(startCfg)) {
      return startCfg;
    }
    if (exists(homeCfg)) {
      return homeCfg;
    }
    return;
  }

  // start is under HOME, move up the directory tree until we hit HOME
  for (var dir = start; withinHome(dir) ; dir = path.join(dir, '..')) {
    var currCfg = path.join(dir, name);
    if (exists(currCfg)) {
      return currCfg;
    }

    // windows $HOME defined at drive root => joining on '..' does nothing
    if (path.join(dir, '..') === path.normalize(dir)) {
      return; // at windows root, we found nothing. dont loop forever
    }
  }
};


module.exports = function (name, start, fallbackDir) {
  var result = findFromStart(name, start);
  if (result || !fallbackDir) {
    return result;
  }
  var fbPath = path.join(fallbackDir, name);
  if (exists(fbPath)) {
    return fbPath;
  }
};
