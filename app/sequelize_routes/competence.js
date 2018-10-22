const Competences = require('../sequelize_models/models').Competences;

module.exports = router => {
  /**
   * Get All competences
   */
  router.get('/competences', (req, res, next) => {
    Competences.findAll({
        attributes: ['id', 'ref', 'description', 'cycle_id', 'domaine_id']
      })
      .then(result => {
        console.log('result: ', result);
        res.status(200).json(result);
      }).catch(err => {
        console.log('err: ', err);
        res.status(400).json(err);
      });
  });

  /**
   * Get All competences par Cycle
   */
  router.get('/competences/cycle/:cycle_id', (req, res, next) => {
    if (!req.params.cycle_id) {
      res.status(400).json({
        success: false,
        message: 'cycle_id not provided'
      });
    } else {
      Competences.findAll({
          attributes: ['id', 'ref', 'description', 'cycle_id', 'domaine_id'],
          where: {
            cycle_id: req.params.cycle_id
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
   * Get One competence par ref CT
   */
  router.get('/competences/ref/:ref', (req, res, next) => {
    if (!req.params.ref) {
      res.status(400).json({
        success: false,
        message: 'ref not provided'
      });
    } else {
      Competences.findOne({
          where: {
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
   * Get All competences par Domaine
   */
  router.get('/competences/domaine/:domaine_id', (req, res, next) => {
    if (!req.params.domaine_id) {
      res.status(400).json({
        success: false,
        message: 'domaine_id not provided'
      });
    } else {
      Competences.findAll({
          attributes: ['id', 'ref', 'description', 'cycle_id', 'domaine_id'],
          where: {
            domaine_id: req.params.domaine_id
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
   * Get All competences par Domaine et cycle
   */
  router.get('/competences/cycle/:cycle_id/domaine/:domaine_id', (req, res, next) => {
    if (!req.params.domaine_id) {
      res.status(400).json({
        success: false,
        message: 'domaine_id not provided'
      });
    } else if (!req.params.cycle_id) {
      res.status(400).json({
        success: false,
        message: 'cycle_id not provided'
      });
    } else {
      Competences.findAll({
        attributes: ['id', 'ref', 'description', 'cycle_id', 'domaine_id'],
        where: {
          domaine_id: req.params.domaine_id,
          cycle_id: req.params.cycle_id
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
   * Check unicité ref CT
   */
  router.get('/competences/cycle/:cycle_id/ref/:ref', (req, res, next) => {
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
      Competences.findOne({
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
   * Create Competence
   */
  router.post('/competences/', (req, res, next) => {
    if (!req.body) {
      res.status(400).json({
        success: false,
        message: 'body not provided'
      });
    } else {
      Competences.create(req.body).then(result => {
        console.log('result: ', result);
        res.status(200).json(result);
      }).catch(err => {
        console.log('err: ', err);
        res.status(400).json(err);
      });
    }
  });

  /**
   * Update Competence
   */
  router.put('/competences/:id', (req, res, next) => {
    if (!req.params.id) {
      return res.status(400).json({
        success: false,
        message: 'id not provided'
      });
    } else if (!req.body) {
      return res.status(400).json({
        success: false,
        message: 'body not provided'
      });
    } else {
      Competences.update(req.body, {
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
   * Delete Competence
   */
  router.delete('/competences/:id', (req, res, next) => {
    if (!req.params.id) {
      return res.status(400).json({
        success: false,
        message: 'id not provided'
      });
    } else {
      Competences.destroy({
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