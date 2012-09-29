# Confortable [![Build Status](https://secure.travis-ci.org/clux/confortable.png)](http://travis-ci.org/clux/confortable)
Confortable is a super lightweight config file selector/finder for nodejs. It will look at the execution cwd, and if no config matching the name is found, and the cwd is inside $HOME, it will keep going up one directory until it hits $HOME. Example usage can be seen in [logule](https://github.com/clux/logule/blob/master/logule.js#L6). and [combustion](https://github.com/clux/combustion/blob/master/lib/precompiler.js#L4).

It does not parse the config, and thus does not enforce any structure upon the config file itself.
It simply returns the best path || null.

## Usage
Basic usage:

```js
var conf = require('confortable');
confPath = conf('.confName'); // if non-null, this can be read by fs or required if js compatible
```

Optionally, a start directory (if cwd isn't sufficient) can be specified for the search start:

```js
var confPath = require('confortable')('.combustion', templateDir);
```

A final optional setting is a fallback directory, in case the recursive search fails, but you still want to see if a config exists somewhere else (like say the path of the parent module). In this use case, you have to specify the start as well.

```js
var fallback = require('path').dirname(module.parent.filename);
var confPath = require('confortable')('.logule', process.cwd(), fallback);
```

## Installation

```bash
$ npm install conf
```

## Running tests
Install development dependencies

```bash
$ npm install
```

Run the tests

```bash
$ npm test
```

## License
MIT-Licensed. See LICENSE file for details.
