var conf = require(process.env.CONFORTABLE_COV ? '../confortable-cov.js' : '../')
  , fs = require('fs')
  , join = require('path').join
  , cwd = process.cwd();

exports.location = function (t) {
  var name = '.confconf';

  // only really works if test server allows writing files.length levels above cwd
  // if it does then that's sufficient for my required effort/safety ratio
  var files = [
    join(cwd, '..', '..', name)
  , join(cwd, '..', name)
  , join(cwd, name)
  ];

  fs.writeFileSync(files[0], "{}");
  t.equal(conf(name), files[0], "conf finds 2 up");

  fs.writeFileSync(files[1], "{}");
  t.equal(conf(name), files[1], "conf finds 1 up");

  fs.writeFileSync(files[2], "{}");
  t.equal(conf(name), files[2], "conf finds in root");

  files.map(fs.unlinkSync);
  t.done();
};

exports.homeBorder = function (t) {
  var name = '.confconf';

  process.env.HOME = join(cwd, name); // pretend we're in HOME

  var files = [
    join(cwd, '..', name)
  , join(cwd, name)
  ];

  fs.writeFileSync(files[0], "{}");
  t.equal(conf(name), undefined, "conf does not find above HOME");

  fs.writeFileSync(files[1], "{}");
  t.equal(conf(name), files[1], "conf finds in cwd");

  files.map(fs.unlinkSync);
  t.done();
};

exports.fallback = function (t) {
  var name = '.confconf';
  var fallbackDir = join(__dirname, 'fbdir');
  var expectedFallback = join(fallbackDir, name);

  t.equal(conf(name, cwd), null, 'no conf found in cwd');
  t.equal(conf(name, cwd, fallbackDir), expectedFallback, 'found fallback');
  t.done();
};
