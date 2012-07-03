var conf = require('../')
  , fs   = require('fs')
  , test = require('tap').test
  , path = require('path')
  , join = path.join;


test("location", function (t) {
  var cwd = process.cwd();
  var name = '.confconf';

  // only really works if test server allows writing files.length levels above cwd
  // if it does then that's sufficient for my required effort/safety ratio
  var files = [
    join(cwd, '..', '..', name)
  , join(cwd, '..', name)
  , join(cwd, name)
  ]

  fs.writeFileSync(files[0], "{}");
  t.equal(conf(name), files[0], "conf finds 2 up");

  fs.writeFileSync(files[1], "{}");
  t.equal(conf(name), files[1], "conf finds 1 up");

  fs.writeFileSync(files[2], "{}");
  t.equal(conf(name), files[2], "conf finds in root");

  files.map(fs.unlinkSync);
  t.end();
});


