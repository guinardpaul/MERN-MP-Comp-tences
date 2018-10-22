const Evaluations = require('../sequelize_models/models').Evaluations;
const Competences = require('../sequelize_models/models').Competences;

module.exports = router => {
  router.post('/evaluations', (req, res, next) => {
    Evaluations.create(req.body).then(result => {
      console.log('result: ', result);
      res.status(201).json(result);
    }).catch(err => {
      console.log('err: ', err);
      res.status(400).json(err);
    });
  });

  router.put('/evaluations/:id', (req, res, next) => {
    Evaluations.update(req.body, {
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

  router.delete('/evaluations/:id', (req, res, next) => {
    Evaluations.destroy({
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

  router.get('/evaluations', (req, res, next) => {
    Evaluations.findAll({
        attributes: ['id', 'description', 'classe_id', 'cycle_id', 'trimestre_id'],
        include: [Competences]
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