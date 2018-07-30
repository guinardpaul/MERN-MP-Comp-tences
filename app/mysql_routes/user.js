const jwt = require('jsonwebtoken');
const config = require('../../app/config/database');
const User = require('../mysql_models/user');

module.exports = (router) => {

    router.get('/checkEmail/:email', (req, res, next) => {
        if (!req.params.email) {
            return res.status(400).json({
                success: false,
                message: 'email not provided'
            });
        } else {
            User.findOne({
                email: req.params.email
            }).select('email').exec((err, user) => {
                if (err) return next(err);
                if (!user) {
                    // Email non enregistré => valid
                    res.status(200).json({
                        success: true,
                        message: 'Object user not find'
                    });
                } else {
                    // EMail enregistré => invalid
                    return res.status(200).json({
                        success: false,
                        message: 'Un compte existe déjà avec cette adresse email.'
                    });
                }
            });
        }
    });

    router.get('/email/:email', (req, res, next) => {
        if (!req.params.email) {
            return res.status(400).json({
                success: false,
                message: 'email not provided'
            });
        } else {
            User.findOne({
                email: req.params.email
            }).select('nom prenom email').exec((err, user) => {
                if (err) return next(err);
                if (!user) {
                    res.status(404).json({
                        success: false,
                        message: 'Object user not find'
                    });
                } else {
                    return res.status(200).json({
                        success: true,
                        obj: user
                    });
                }
            });
        }
    });

    router.get('/id/:id', (req, res, next) => {
        if (!req.params.id) {
            res.status(400).json({
                success: false,
                message: 'id not provided'
            });
        } else {
            User.findById({
                id: req.params.id,
                function (err, user) {
                    if (err) return next(err);
                    if (!user) {
                        res.status(404).json({
                            success: false,
                            message: 'Object user not find'
                        });
                    } else {
                        return res.status(200).json({
                            success: true,
                            obj: user
                        });
                    }
                }
            })
        }
    });

    router.put('/init-password/:id', (req, res, next) => {
        if (!req.body.password) {
            res.status(400).json({
                success: false,
                message: 'password not provided'
            });
        } else if (!req.params.id) {
            res.status(400).json({
                success: false,
                message: 'id not provided'
            });
        } else {
            User.findById(req.params.id, (err, user) => {
                if (err) return next(err);
                if (!user) {
                    res.status(404).json({
                        success: false,
                        message: 'Object user not find'
                    });
                } else {
                    User.update({
                        id: req.params.id
                    }, {
                        password: req.body.password
                    }, (err, raw) => {
                        if (err) return next(err);
                        if (!raw) {
                            res.status(404).json({
                                success: false,
                                message: 'Object user not find'
                            });
                        } else {
                            res.status(200).json({
                                success: true,
                                message: 'Mot de passe réinitialisé',
                                obj: raw
                            });
                        }
                    });
                }
            });
        }
    });

    router.put('/validate-account/:id', (req, res, next) => {
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
            User.findByIdAndUpdate(req.params.id, {
                validAccount: req.body.validAccount
            }, {
                new: true
            }, (err, user) => {
                if (err) return next(err);
                if (!user) {
                    res.status(404).json({
                        success: false,
                        message: 'Object user not find'
                    });
                } else if (!user.validAccount) {
                    res.status(409).json({
                        success: false,
                        message: 'Erreur. Compte non validé'
                    });
                } else {
                    res.status(200).json({
                        success: true,
                        message: 'Compte validé',
                        obj: user
                    });
                }
            });
        }
    });

    router.use((req, res, next) => {
        const token = req.headers['authorization'];
        if (!token) {
            res.status(401).json({
                success: false,
                message: 'token not provided'
            });
        } else {
            jwt.verify(token, config.secret, (err, decoded) => {
                if (err) {
                    res.status(401).json({
                        success: false,
                        message: 'token invalid'
                    });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        }
    });

    router.get('/profile', (req, res, next) => {
        User.findById(req.decoded.userId, function (err, user) {
            if (err) {
                res.status(500).json({
                    success: false,
                    message: err
                });
            } else if (!user) {
                res.status(404).json({
                    success: false,
                    message: 'Object User not find'
                });
            } else {
                res.status(200).json({
                    success: true,
                    obj: user
                });
            }
        })
    });


    return router;
}