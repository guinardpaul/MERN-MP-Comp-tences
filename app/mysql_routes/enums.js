const Enum = require('../mysql_models/enum');

module.exports = router => {
  router.get('/trimestres', (req, res, next) => {
    Enum.getEnumTrimestres((err, result) => {
      if (err) return next(err);
      return res.status(200).json(result);
    });
  });


  router.get('/cycles', (req, res, next) => {
    Enum.getEnumCycles((err, result) => {
      if (err) return next(err);
      return res.status(200).json(result);
    });
  });

  router.get('/resultats', (req, res, next) => {
    Enum.getEnumResultats((err, result) => {
      if (err) return next(err);
      return res.status(200).json(result);
    });
  });

  return router;
}