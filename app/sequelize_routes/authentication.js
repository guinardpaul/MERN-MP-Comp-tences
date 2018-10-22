const Users = require('../sequelize_models/models').Users;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const secret = require('../config/secret');

module.exports = (router, passport) => {
  /**
   * Register User
   */
  router.post('/register', (req, res, next) => {
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: 'Body not provided'
      });
    }
    Users.findOne({
        where: {
          email: req.body.email
        }
      })
      .then(result => {
        console.log('result: ', result);
        if (result !== null) {
          res.status(409).json({
            success: false,
            message: 'Cet email est déjà utilisé pour un compte valide.'
          })
        } else {
          let hashSaltData;
          hashSaltData = generateHash(req.body.password);
          if (!hashSaltData) {
            return res.status(500).json({
              message: 'Erreur du serveur durant la création du compte. Veuillez réessayer plus tard.'
            });
          }
          req.body.password = hashSaltData.hash
          Users.create(req.body)
            .then(result => {
              console.log('result: ', result);
              res.status(201).json(result);
            }).catch(err => {
              console.log('err: ', err);
              res.status(400).json(err);
            });
        }
      }).catch(err => {
        console.log('err: ', err);
        res.status(400).json(err);
      });
  });

  /**
   * Login User
   */
  router.post('/login', (req, res, next) => {
    if (!req.body.email) {
      return res.status(400).json({
        success: false,
        message: 'Email not provided'
      });
    } else if (!req.body.password) {
      return res.status(400).json({
        success: false,
        message: 'Password not provided'
      });
    }
    Users.findOne({
        where: {
          email: req.body.email
        }
      })
      .then(result => {
        console.log('result: ', result);
        if (result === null) {
          res.status(404).json({
            message: 'Le compte n\'existe pas.'
          });
        } else {
          if (!comparePassword(req.body.password, result.password)) {
            return res.status(401).json({
              message: 'Email ou Mot de Passe incorrect.'
            });
          } else {
            let token;
            token = generateToken(result.id)
            res.status(200).json({
              token: token,
              message: 'Vous etes connecté.'
            });
          }
        }
      });
  });

  /**
   * Compare password entered from client and hash from database
   * @param {String} passwordEntered Password from client
   * @param {String} dbPassword Hash password from database
   * @returns true if password match
   */
  function comparePassword(passwordEntered, dbPassword) {
    return bcrypt.compareSync(passwordEntered, dbPassword);
  }

  /**
   * Generate JWTtoken from user ID
   * @param {Integer} id user id
   */
  function generateToken(id) {
    // Set expiration date to date.now() + 7 days
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
      userId: id,
      exp: parseInt(expiry.getTime() / 1000),
    }, secret.secret);
  };

  /**
   * Hash the user password during account creation or update
   * @param {String} password password text
   * @returns hashed password and salt
   */
  function generateHash(password) {
    salt = generateSalt(10);
    hash = bcrypt.hashSync(password, salt);
    return {
      hash: hash,
      salt: salt
    };
  }

  /**
   * Genere salt
   * @param {Integer} length nombre de generation
   * @returns salt string
   */
  function generateSalt(length) {
    return bcrypt.genSaltSync(length);
  }

  return (router);
}