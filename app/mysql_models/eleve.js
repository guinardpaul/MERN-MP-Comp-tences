const db = require('../db');

exports.create = function (first_name, last_name, classe_id, done) {
  const values = [first_name, last_name, classe_id];
  db.get().query('INSERT INTO eleves (first_name, last_name, classe_id) VALUES (?, ?)', values, function (err, result) {
    if (err) return done(err);
    done(null, result.insertId);
  })
}

exports.update = function (id, first_name, last_name, classe_id, done) {
  const values = [first_name, last_name, classe_id, id];
  db.get().query('UPDATE eleves SET first_name=?, last_name=?, classe_id=? WHERE id=?', values, function (err, result) {
    if (err) return done(err);
    console.log(result)
    done(null, result.insertId);
  })
}

exports.delete = function (id, done) {
  db.get().query('DELETE FROM eleves WHERE id=?', id, function (err, result) {
    if (err) return done(err);
    done(null, result.affectedRows);
  })
}

exports.getAll = function (done) {
  db.get().query('SELECT * FROM eleves ORDER BY first_name ASC', function (err, result) {
    console.log(result);
    if (err) return done(err);
    done(null, result);
  })
}

exports.getByClasse = function (classe_id, done) {
  db.get().query('SELECT * FROM eleves WHERE classe_id=? ORDER BY first_name ASC', classe_id, function (err, result) {
    console.log(result);
    if (err) return done(err);
    done(null, result);
  })
}

exports.getOne = function (id, done) {
  db.get().query('SELECT * FROM eleves WHERE id=?', id, function (err, result) {
    console.log(result);
    if (err) return done(err);
    done(null, result);
  })
}