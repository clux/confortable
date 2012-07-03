# Confortable [![Build Status](https://secure.travis-ci.org/clux/confortable.png)](http://travis-ci.org/clux/confortable)
Confortable is a super lightweight config file selector/finder for nodejs. It will look at the execution cwd, and if no config matching the name is found, and the cwd is inside $HOME, it will keep going up one directory until it hits $HOME. Example usage can be seen in [logule](https://github.com/clux/logule/blob/master/logule.js#L6).

It does not parse the config, and thus does not enforce any structure upon the config file itself.
It simply returns the best path || null.

## Usage
Basic usage:

````javascript
var conf = require('confortable');
confPath = conf('.logule'); // if non-null, this can be read by fs or required if js compatible
````

## Installation

````bash
$ npm install conf
````

## Running tests
Install development dependencies

````bash
$ npm install
````

Run the tests

````bash
$ npm test
````

## License
MIT-Licensed. See LICENSE file for details.
