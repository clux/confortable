module.exports = process.env.CONFORTABLE_COV
  ? require('./lib-cov/confortable.js')
  : require('./lib/confortable.js');
