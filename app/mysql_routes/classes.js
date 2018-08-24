const Classe = require('../mysql_models/classe');

module.exports = router => {
  router.post('/classes', (req, res, next) => {
    Classe.create(req.body.name, req.body.cycle_id, (err, classe) => {
      if (err) return next(err);
      return res.status(201).json(classe);
    });
  });

  router.put('/classes/:id', (req, res, next) => {
    Classe.update(req.params.id, req.body.name, req.body.cycle_id, (err, classe) => {
      if (err) return next(err);
      return res.status(201).json(classe);
    });
  });

  router.delete('/classes/:id', (req, res, next) => {
    Classe.delete(req.params.id, (err, classe) => {
      if (err) return next(err);
      return res.status(200).json(classe);
    });
  });

  router.get('/classes', (req, res, next) => {
    Classe.getAll((err, classes) => {
      if (err) return next(err);
      return res.status(200).json(classes);
    })
  })

  router.get('/classes/cycle_id/:cycle_id', (req, res, next) => {
    Classe.getByCycle(req.params.cycle_id, (err, classes) => {
      if (err) return next(err);
      return res.status(200).json(classes);
    })
  })

  router.get('/classes/:id', (req, res, next) => {
    Classe.getOne(req.params.id, (err, classe) => {
      if (err) return next(err);
      return res.status(200).json(classe);
    })
  })

  return router;
}