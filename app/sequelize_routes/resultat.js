const Resultats = require('../sequelize_models/models').Resultats;

module.exports = router => {
  router.post('/resultats', (req, res, next) => {
    Resultats.create(req.body).then(result => {
      console.log('result: ', result);
      res.status(201).json(result);
    }).catch(err => {
      console.log('err: ', err);
      res.status(400).json(err);
    });
  });

  router.put('/resultats/:id', (req, res, next) => {
    Resultats.update(req.body, {
        where: {
          id: req.params.id
        }
      })
      .then(result => {
        console.log('result: ', result);
        res.status(201).json(result);
      }).catch(err => {
        console.log('err: ', err);
        res.status(400).json(err);
      });
  });

  router.delete('/resultats/:id', (req, res, next) => {
    Resultats.destroy({
        where: {
          id: req.params.id
        }
      })
      .then(result => {
        console.log('result: ', result);
        res.status(201).json(result);
      }).catch(err => {
        console.log('err: ', err);
        res.status(400).json(err);
      });
  });

  router.get('/resultats', (req, res, next) => {
    Resultats.findAll({
        attributes: ['id', 'eleve_id', 'evaluation_id']
      })
      .then(result => {
        console.log('result: ', result);
        res.status(201).json(result);
      }).catch(err => {
        console.log('err: ', err);
        res.status(400).json(err);
      });
  });

  return router;
}