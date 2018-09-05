const db = require('../db');
const async = require('async');

exports.create = function (
  description,
  created_at,
  classe_id,
  cycle_id,
  trimestre_id, selectedCompetences,
  done
) {
  const values = [description, created_at, classe_id, cycle_id, trimestre_id];
  db.get().query(
    'INSERT INTO evaluations (description, created_at, classe_id, cycle_id, trimestre_id) VALUES (?, ?, ?, ?, ?)',
    values,
    function (err, result) {
      if (err) return done(err);
      selectedCompetences.forEach(ct => {
        const val = [result.insertId, ct];
        db.get().query(
          'INSERT INTO evaluations_competences (evaluation_id, competence_id) VALUES (?, ?)',
          val,
          function (err, result) {
            if (err) return done(err);
          });
      });
      done(null, result);
    }
  );
};

exports.update = function (
  id,
  description,
  created_at,
  classe_id,
  cycle_id,
  trimestre_id,
  done
) {
  const values = [
    description,
    created_at,
    classe_id,
    cycle_id,
    trimestre_id,
    id
  ];
  db.get().query(
    'UPDATE evaluations SET description=?, created_at=?, classe_id=?, cycle_id=?, trimestre_id=? WHERE id=?',
    values,
    function (err, result) {
      if (err) return done(err);
      selectedCompetences.forEach(ct => {
        const val = [ct, id];
        db.get().query('UPDATE evaluations_competences SET competence_id=? WHERE evaluation_id=?', val, function (err, result) {
          if (err) return done(err);
          console.log('result: ', result);
        });
      });
      done(null, result);
    }
  );
};

exports.delete = function (id, done) {
  db.get().query('DELETE FROM evaluations_competences WHERE evaluation_id=?', id, function (err, result) {
    if (err) return done(err);
    db.get().query('DELETE FROM evaluations WHERE id=?', id, function (err, result) {
      if (err) return done(err);
      done(null, result);
    });
  });
};

exports.getAll = async function (done) {
  db.get().query(
    'SELECT e.id, e.description, e.created_at, e.classe_id, cl.name as classe_name, cy.literal as cycle_literal, t.id as trimestre_id, t.literal as trimestre_literal FROM evaluations e INNER JOIN classes cl ON e.classe_id=cl.id INNER JOIN enum_trimestres t ON t.id=e.trimestre_id INNER JOIN enum_cycles cy ON cy.id=e.cycle_id',
    function (err, result) {
      if (err) return done(err);
      // const resultComplete = [];
      // async.forEach(
      //   result,
      //   function(r, cb) {
      //     getEvaluationCompetences(r.id, (err, res) => {
      //       console.log('err: ', err);
      //       console.log('res: ', res);
      //       r['selectedCompetences'] = res;
      //     });
      //     resultComplete.push(r);
      //     console.log('r: ', r);
      //     cb();
      //   },
      //   function(err) {
      //     if (err) throw err;
      //   }
      // );
      // console.log('resultComplete: ', resultComplete);
      done(null, result);
    }
  );
};

function getEvaluationCompetences(id, callback) {
  let r = [];
  db.get().query(
    'SELECT * from evaluations_competences where evaluation_id=?',
    id,
    function (err, res) {
      if (err) return done(err);
      console.log('res: ', res);
      callback(err, res);
    }
  );
}

exports.createLinkCompetences = function (evaluation_id, competence_id, done) {
  const values = [evaluation_id, competence_id];
  db.get().query(
    'INSERT INTO evaluations_competences (evaluation_id, competence_id) VALUES (?, ?)',
    values,
    function (err, result) {
      if (err) return done(err);
      done(null, result);
    }
  );
};