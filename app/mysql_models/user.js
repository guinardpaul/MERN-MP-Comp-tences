const db = require('../db');

exports.create = function (nom, prenom, email, password, done) {
  const values = [nom, prenom, email, password];
  db.get().query('INSERT INTO auth_users (nom, prenom, email, password) VALUES (?, ?, ?, ?)', values, function (err, result) {
    if (err) return done(err);
    done(null, result.insertId);
  })
}

exports.update = function (id, nom, prenom, email, done) {
  const values = [nom, prenom, email, id];
  db.get().query('UPDATE auth_users SET nom=?, prenom=?, email=? WHERE id=?', values, function (err, result) {
    if (err) return done(err);
    console.log(result)
    done(null, result.insertId);
  })
}

exports.delete = function (id, done) {
  db.get().query('DELETE FROM auth_users WHERE id=?', id, function (err, result) {
    if (err) return done(err);
    done(null, result.affectedRows);
  })
}

exports.findOne = function (email, done) {
  db.get().query('SELECT nom, prenom, email FROM auth_users WHERE email=?', email, function (err, result) {
    console.log(result[0]);
    if (err) return done(err);
    done(null, result[0]);
  })
}

exports.findUserForLogin = function (email, done) {
  db.get().query('SELECT nom, prenom, email, password FROM auth_users WHERE email=?', email, function (err, result) {
    if (err) return done(err);
    done(null, result[0]);
  })
}

exports.findById = function (id, done) {
  db.get().query('SELECT nom, prenom, email FROM auth_users WHERE id=?', id, function (err, result) {
    console.log(result);
    if (err) return done(err);
    done(null, result);
  })
}

exports.findByIdAndUpdate = function (id, done) {
  db.get().query('SELECT nom, prenom, email FROM auth_users WHERE id=?', id, function (err, result) {
    console.log(result);
    if (err) return done(err);
    update(result[0].id, result[0].nom, result[0].prenom, result[0].email, function (err, result) {
      console.log(result);
      if (err) return done(err);
      done(null, result);
    })
  })
}