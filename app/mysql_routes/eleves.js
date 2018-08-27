const Eleve = require('../mysql_models/eleve');

module.exports = router => {
  router.post('/eleves', (req, res, next) => {
    Eleve.create(req.body.first_name, req.body.last_name, req.body.classe_id, (err, Eleve) => {
      if (err) return next(err);
      return res.status(201).json(Eleve);
    });
  });

  router.put('/eleves/:id', (req, res, next) => {
    Eleve.update(req.params.id, req.body.first_name, req.body.last_name, req.body.classe_id, (err, Eleve) => {
      if (err) return next(err);
      return res.status(201).json(Eleve);
    });
  });

  router.delete('/eleves/:id', (req, res, next) => {
    Eleve.delete(req.params.id, (err, Eleve) => {
      if (err) return next(err);
      return res.status(201).json(Eleve);
    });
  });

  router.get('/eleves', (req, res, next) => {
    Eleve.getAll((err, Eleves) => {
      if (err) return next(err);
      return res.status(200).json(Eleves);
    })
  })

  router.get('/eleves/classe/:classe_id', (req, res, next) => {
    Eleve.getByClasse(req.params.classe_id, (err, classes) => {
      if (err) return next(err);
      return res.status(200).json(classes);
    })
  })

  router.get('/classes/:id', (req, res, next) => {
    Eleve.getOne(req.params.id, (err, classe) => {
      if (err) return next(err);
      return res.status(200).json(classe);
    })
  })

  return router;
}