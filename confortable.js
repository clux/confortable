var fs   = require('fs')
  , path = require('path')
  , exists = fs.existsSync || path.existsSync;

module.exports = function (name, cwd) {
  var cfg;

  cwd = cwd || process.cwd();
  if (path.relative(process.env.HOME, cwd).slice(0, 2) === '..') {
    // cwd is outside home, check cwd only
    cfg = path.join(cwd, name);
    return exists(cfg) ? cfg : null;
  }
  else {
    // cwd is somewhere under HOME start in cwd and go up until we hit HOME
    var dir = cwd;
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
