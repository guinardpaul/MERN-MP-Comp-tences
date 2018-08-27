const db = require('../db');

exports.getEnumTrimestres = function (done) {
  db.get().query('SELECT * FROM enum_trimestres', function (err, result) {
    if (err) return done(err);
    done(null, result);
  });
}

exports.getEnumCycles = function (done) {
  db.get().query('SELECT * FROM enum_cycles', function (err, result) {
    if (err) return done(err);
    done(null, result);
  });
}

exports.getEnumResultats = function (done) {
  db.get().query('SELECT * FROM enum_resultats', function (err, result) {
    if (err) return done(err);
    done(null, result);
  });
}