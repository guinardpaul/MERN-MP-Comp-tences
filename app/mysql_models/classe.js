const db = require('../db');

exports.create = function (name, cycle_id, done) {
  const values = [name, cycle_id];
  db.get().query('INSERT INTO classes (name, cycle_id) VALUES (?, ?)', values, function (err, result) {
    if (err) return done(err);
    db.get().query('SELECT c.id, c.name, c.cycle_id, e.literal FROM classes c INNER JOIN enum_cycles e on e.id=c.cycle_id WHERE c.id=?', result.insertId, function (err, data) {
      if (err) return done(err);
      console.log('data: ', data);
      done(null, data[0]);
    });
  });
}

exports.update = function (id, name, cycle_id, done) {
  const values = [name, cycle_id, id];
  db.get().query('UPDATE classes SET name=?, cycle_id=? WHERE id=?', values, function (err, result) {
    if (err) return done(err);
    db.get().query('SELECT c.id, c.name, c.cycle_id, e.literal FROM classes c INNER JOIN enum_cycles e on e.id=c.cycle_id WHERE c.id=?', id, function (err, data) {
      if (err) return done(err);
      console.log('data: ', data);
      done(null, data[0]);
    });
  })
}

exports.delete = function (id, done) {
  db.get().query('DELETE FROM classes WHERE id=?', id, function (err, result) {
    console.log('result: ', result);
    if (err) return done(err);
    done(null, result.affectedRows);
  })
}

exports.getAll = function (done) {
  db.get().query('SELECT c.id, c.name, c.cycle_id, e.literal FROM classes c INNER JOIN enum_cycles e on e.id=c.cycle_id ORDER BY c.name ASC', function (err, result) {
    console.log(result);
    if (err) return done(err);
    done(null, result);
  })
}

exports.getByCycle = function (cycle_id, done) {
  db.get().query('SELECT * FROM classes WHERE cycle_id=? ORDER BY name ASC', cycle_id, function (err, result) {
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