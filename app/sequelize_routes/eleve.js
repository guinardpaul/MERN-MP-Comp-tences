const Eleves = require('../sequelize_models/models').Eleves;

module.exports = router => {
  /**
   * Get All Eleves
   */
  router.get('/eleves', (req, res, next) => {
    Eleves.findAll({
      attributes: ['id', 'first_name', 'last_name', 'classe_id']
    }).then(result => {
      console.log('result: ', result);
      res.status(200).json(result);
    }).catch(err => {
      console.log('err: ', err);
      res.status(400).json(err);
    });
  });

  /**
   * Get All Eleves by Classe id
   */
  router.get('/eleves/classe/:classe_id', (req, res, next) => {
    if (!req.params.classe_id) {
      return res.status(400).json({
        success: false,
        message: 'classe_id not provided'
      });
    } else {
      Eleves.findAll({
        attributes: ['id', 'first_name', 'last_name', 'classe_id'],
        where: {
          classe_id: req.params.classe_id
        }
      }).then(result => {
        console.log('result: ', result);
        res.status(200).json(result);
      }).catch(err => {
        console.log('err: ', err);
        res.status(400).json(err);
      });
    }
  });

  /**
   * Get One Eleve by Id
   */
  router.get('/eleves/:id', (req, res, next) => {
    if (!req.params.id) {
      return res.status(400).json({
        success: false,
        message: 'id not provided'
      });
    } else {
      Eleves.findById(req.params.id)
        .then(result => {
          console.log('result: ', result);
          res.status(200).json(result);
        }).catch(err => {
          console.log('err: ', err);
          res.status(400).json(err);
        });
    }
  });

  /**
   * Save Eleve
   */
  router.post('/eleves', (req, res, next) => {
    if (!req.body.first_name) {
      return res.status(400).json({
        success: false,
        message: 'first_name not provided'
      });
    } else if (!req.body.last_name) {
      return res.status(400).json({
        success: false,
        message: 'last_name not provided'
      });
    } else if (!req.body.classe_id) {
      return res.status(400).json({
        success: false,
        message: 'classe_id not provided'
      });
    } else {
      Eleves.create(req.body)
        .then(result => {
          Eleves.findById(result.dataValues.id)
            .then(eleve => {
              console.log('eleve: ', eleve);
              res.status(200).json(eleve);
            })
            .catch(err => {
              console.log('err: ', err);
              res.status(400).json(err);
            });
        }).catch(err => {
          console.log('err: ', err);
          res.status(400).json(err);
        });
    }
  });

  /**
   * Update Eleve
   */
  router.put('/eleves/:id', (req, res, next) => {
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: 'body not provided'
      });
    } else if (!req.params.id) {
      return res.status(400).json({
        success: false,
        message: 'id not provided'
      });
    } else {
      Eleves.update(req.body, {
          where: {
            id: req.params.id
          }
        })
        .then(result => {
          Eleves.findById(req.params.id)
            .then(eleve => {
              console.log('eleve: ', eleve);
              res.status(200).json(eleve);
            })
            .catch(err => {
              console.log('err: ', err);
              res.status(400).json(err);
            });
        }).catch(err => {
          console.log('err: ', err);
          res.status(400).json(err);
        });
    }
  });

  /**
   * Delete Eleve
   */
  router.delete('/eleves/:id', (req, res, next) => {
    if (!req.params.id) {
      return res.status(400).json({
        success: false,
        message: 'id not provided'
      });
    } else {
      Eleves.destroy({
          where: {
            id: req.params.id
          }
        })
        .then(result => {
          console.log('result: ', result);
          res.status(200).json(result);
        }).catch(err => {
          console.log('err: ', err);
          res.status(400).json(err);
        });
    }
  });

  return router;
};