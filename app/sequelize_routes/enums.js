const Enum_cycles = require('../sequelize_models/models').Enum_cycles;
const Enum_trimestres = require('../sequelize_models/models').Enum_trimestres;
const Enum_resultats = require('../sequelize_models/models').Enum_resultats;

module.exports = router => {
  router.get('/trimestres', (req, res, next) => {
    Enum_trimestres.findAll().then(result => {
      console.log('result: ', result);
      res.status(200).json(result);
    }).catch(err => {
      console.log('err: ', err);
      res.status(400).json(err);
    });
  });


  router.get('/cycles', (req, res, next) => {
    Enum_cycles.findAll().then(result => {
      console.log('result: ', result);
      res.status(200).json(result);
    }).catch(err => {
      console.log('err: ', err);
      res.status(400).json(err);
    });
  });

  router.get('/resultats', (req, res, next) => {
    Enum_resultats.findAll().then(result => {
      console.log('result: ', result);
      res.status(200).json(result);
    }).catch(err => {
      console.log('err: ', err);
      res.status(400).json(err);
    });
  });

  return router;
}