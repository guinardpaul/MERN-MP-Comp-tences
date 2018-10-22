const Domaines = require('../sequelize_models/models').Domaines;

module.exports = (router) => {

  /**
   * Get All Domaines
   */
  router.get('/domaines', (req, res, next) => {
    Domaines.findAll({
      attributes: ['id', 'ref', 'description', 'cycle_id', 'sous_domaine_id']
    }).then(result => {
      console.log('result: ', result);
      res.status(200).json(result);
    }).catch(err => {
      console.log('err: ', err);
      res.status(400).json(err);
    });
  });

  /**
   * Get All Domaine by cycle
   */
  router.get('/domaines/cycle/:cycle_id', (req, res, next) => {
    if (!req.params.cycle_id) {
      res.status(400).json({
        success: false,
        message: 'cycle_id not provided'
      });
    } else {
      Domaines.findAll({
          where: {
            cycle_id: req.params.cycle_id
          },
          attributes: ['id', 'ref', 'description', 'cycle_id', 'sous_domaine_id']
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

  /**
   * Get One Domaine by id
   */
  router.get('/domaines/:id', (req, res, next) => {
    if (!req.params.id) {
      res.status(400).json({
        success: false,
        message: 'id not provided'
      });
    } else {
      Domaines.findById(req.params.id)
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
   * Check ref unicité
   */
  router.get('/domaines/cycle/:cycle_id/ref/:ref', (req, res, next) => {
    if (!req.params.cycle_id) {
      res.status(400).json({
        success: false,
        message: 'cycle_id not provided'
      });
    } else if (!req.params.ref) {
      res.status(400).json({
        success: false,
        message: 'ref not provided'
      });
    } else {
      Domaines.findOne({
          where: {
            cycle_id: req.params.cycle_id,
            ref: req.params.ref
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

  /**
   * Create Domaine
   */
  router.post('/domaines', (req, res, next) => {
    if (!req.body) {
      res.status(400).json({
        success: false,
        message: 'body not provided'
      });
    } else {
      Domaines.create(req.body)
        .then(result => {
          console.log('result: ', result);
          res.status(201).json(result);
        }).catch(err => {
          console.log('err: ', err);
          res.status(400).json(err);
        });
    }
  });

  /**
   * Update Domaine
   */
  router.put('/domaines/:id', (req, res, next) => {
    if (!req.body) {
      res.status(400).json({
        success: false,
        message: 'body not provided'
      });
    } else if (!req.params.id) {
      res.status(400).json({
        success: false,
        message: 'id not provided'
      });
    } else {
      Domaines.update(req.body, {
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

  /**
   * Delete Domaine
   */
  router.delete('/domaines/:id', (req, res, next) => {
    if (!req.params.id) {
      res.status(400).json({
        success: false,
        message: 'id not provided'
      });
    } else {
      Domaines.destroy({
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
}