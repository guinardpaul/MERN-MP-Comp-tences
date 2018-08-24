const Domaine = require('../mysql_models/domaine');

module.exports = router => {
  router.post('/domaines', (req, res, next) => {
    Domaine.create(req.body.name, req.body.cycle_id, (err, domaine) => {
      if (err) return next(err);
      return res.status(201).json(domaine);
    });
  });

  router.put('/domaines/:id', (req, res, next) => {
    Domaine.update(req.params.id, req.body.name, req.body.cycle_id, (err, domaine) => {
      if (err) return next(err);
      return res.status(201).json(domaine);
    });
  });

  router.delete('/domaines/:id', (req, res, next) => {
    Domaine.delete(req.params.id, (err, domaine) => {
      if (err) return next(err);
      return res.status(201).json(domaine);
    });
  });

  router.get('/domaines', (req, res, next) => {
    Domaine.getAll((err, domaines) => {
      if (err) return next(err);
      return res.status(200).json(domaines);
    })
  })

  router.get('/domaines/cycle_id/:cycle_id', (req, res, next) => {
    Domaine.getByCycle(req.params.cycle_id, (err, domaines) => {
      if (err) return next(err);
      return res.status(200).json(domaines);
    })
  })

  router.get('/domaines/:id', (req, res, next) => {
    Domaine.getOne(req.params.id, (err, classe) => {
      if (err) return next(err);
      return res.status(200).json(classe);
    })
  })

  router.get('/domaines/sous-domaines/:domaine_id', (req, res, next) => {
    Domaine.getSousDomaine(req.params.domaine_id, (err, domaines) => {
      if (err) return next(err);
      return res.status(200).json(domaines);
    })
  })

  return router;
}