const db = require('../db');

exports.create = function (ref, description, cycle, domaine_id, done) {
  const values = [ref, description, cycle, domaine_id];
  db.get().query('INSERT INTO competences (ref, description, cycle, domaine_id) VALUES (?, ?)', values, function (err, result) {
    if (err) return done(err);
    done(null, result.insertId);
  })
}

exports.update = function (id, ref, description, cycle, domaine_id, done) {
  const values = [ref, description, cycle, domaine_id, id];
  db.get().query('UPDATE competences SET ref=?, description=?, cycle=?, domaine_id=? WHERE id=?', values, function (err, result) {
    if (err) return done(err);
    console.log(result)
    done(null, result.insertId);
  })
}

exports.delete = function (id, done) {
  db.get().query('DELETE FROM competences WHERE id=?', id, function (err, result) {
    if (err) return done(err);
    done(null, result.affectedRows);
  })
}

exports.getAll = function (done) {
  db.get().query('SELECT * FROM competences ORDER BY ref ASC', function (err, result) {
    if (err) return done(err);
    done(null, result);
  })
}

exports.getByCycle = function (cycle, done) {
  db.get().query('SELECT * FROM competences WHERE cycle=? ORDER BY ref ASC', cycle, function (err, result) {
    console.log(result);
    if (err) return done(err);
    done(null, result);
  })
}

exports.getOne = function (id, done) {
  db.get().query('SELECT * FROM competences WHERE id=?', id, function (err, result) {
    console.log(result);
    if (err) return done(err);
    done(null, result);
  })
}

exports.getSousDomaine = function (domaine_id, done) {
  db.get().query('SELECT * FROM competences WHERE domaine_id=?', domaine_id, function (err, result) {
    console.log(result);
    if (err) return done(err);
    done(null, result);
  })
}