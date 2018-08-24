const Competence = require('../mysql_models/competence');

module.exports = router => {
  router.post('/competences', (req, res, next) => {
    Competence.create(req.body.name, req.body.cycle_id, (err, competence) => {
      if (err) return next(err);
      return res.status(201).json(competence);
    });
  });

  router.put('/competences/:id', (req, res, next) => {
    Competence.update(req.params.id, req.body.name, req.body.cycle_id, (err, competence) => {
      if (err) return next(err);
      return res.status(201).json(competence);
    });
  });

  router.delete('/competences/:id', (req, res, next) => {
    Competence.delete(req.params.id, (err, competence) => {
      if (err) return next(err);
      return res.status(201).json(competence);
    });
  });

  router.get('/competences', (req, res, next) => {
    Competence.getAll((err, competences) => {
      if (err) return next(err);
      return res.status(200).json(competences);
    })
  })

  router.get('/competences/cycle_id/:cycle_id', (req, res, next) => {
    Competence.getByCycle(req.params.cycle_id, (err, competences) => {
      if (err) return next(err);
      return res.status(200).json(competences);
    })
  })

  router.get('/competences/:id', (req, res, next) => {
    Competence.getOne(req.params.id, (err, classe) => {
      if (err) return next(err);
      return res.status(200).json(classe);
    })
  })

  router.get('/competences/sous-domaines/:domaine_id', (req, res, next) => {
    Competence.getSousDomaine(req.params.domaine_id, (err, domaines) => {
      if (err) return next(err);
      return res.status(200).json(domaines);
    })
  })

  return router;
}