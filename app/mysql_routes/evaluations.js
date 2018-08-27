const Evaluation = require('../mysql_models/evaluation');

module.exports = router => {
  router.post('/evaluations', (req, res, next) => {
    Evaluation.create(req.body.description, req.body.created_at, req.body.classe_id, req.body.cycle_id, req.body.trimestre_id, (err, result) => {
      if (err) return next(err);
      return res.status(201).json(result);
    });
  });

  router.put('/evaluations/:id', (req, res, next) => {
    Evaluation.update(req.params.id, req.body.description, req.body.created_at, req.body.classe_id,
      req.body.cycle_id, req.body.trimestre_id, (err, result) => {
        if (err) return next(err);
        return res.status(201).json(result);
      });
  });

  router.delete('/evaluations/:id', (req, res, next) => {
    Evaluation.delete(req.params.id, (err, result) => {
      if (err) return next(err);
      return res.status(201).json(result);
    });
  });

  router.get('/evaluations', (req, res, next) => {
    Evaluation.getAll((err, result) => {
      if (err) return next(err);
      return res.status(200).json(result);
    });
  });

  return router;
}