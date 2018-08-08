const db = require('../db');

exports.create = function (name, cycle, done) {
  const values = [name, cycle];
  db.get().query('INSERT INTO classes (name, cycle) VALUES (?, ?)', values, function (err, result) {
    if (err) return done(err);
    done(null, result.insertId);
  })
}

exports.update = function (id, name, cycle, done) {
  const values = [name, cycle, id];
  db.get().query('UPDATE classes SET name=?, cycle=? WHERE id=?', values, function (err, result) {
    if (err) return done(err);
    console.log(result)
    done(null, result.insertId);
  })
}

exports.delete = function (id, done) {
  db.get().query('DELETE FROM classes WHERE id=?', id, function (err, result) {
    if (err) return done(err);
    done(null, result.affectedRows);
  })
}

exports.getAll = function (done) {
  db.get().query('SELECT c.id, c.name, e.literal FROM classes c INNER JOIN enum_cycles e on e.id=c.cycle ORDER BY c.name ASC ', function (err, result) {
    console.log(result);
    if (err) return done(err);
    done(null, result);
  })
}

exports.getByCycle = function (cycle, done) {
  db.get().query('SELECT * FROM classes WHERE cycle=? ORDER BY name ASC', cycle, function (err, result) {
    console.log(result);
    if (err) return done(err);
    done(null, result);
  })
}

exports.getOne = function (id, done) {
  db.get().query('SELECT * FROM classes WHERE id=?', id, function (err, result) {
    console.log(result);
    if (err) return done(err);
    done(null, result);
  })
}