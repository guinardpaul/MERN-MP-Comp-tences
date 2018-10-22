const express = require('express');
const router = express.Router();
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const compression = require('compression');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const passport = require('passport');
require('./app/config/passport')(passport);
const sequelize = require('./app/sequelize_db');
const models = require('./app/sequelize_models/models');
const port = process.env.PORT || 4000;
// Changer config file in environment mode
const config = require('./app/config/config.dev');

// database connection with sequelize
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');

  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// models.init();
// Set app
const app = express();

// set routes
const auth = require('./app/sequelize_routes/authentication')(router, passport);
const classe = require('./app/sequelize_routes/classe')(router);
const eleve = require('./app/sequelize_routes/eleve')(router);
const competence = require('./app/sequelize_routes/competence')(router);
const domaine = require('./app/sequelize_routes/domaine')(router);
const evaluation = require('./app/sequelize_routes/evaluations')(router);
const enums = require('./app/sequelize_routes/enums')(router);
const resultat = require('./app/sequelize_routes/resultat')(router);

// MIDDLEWARE
// log into console (dev)
app.use(logger('dev'));
// Log into file
// create a write stream (in append mode)
//var accessLogStream = fs.createWriteStream(path.join(__dirname, 'server.log'), { flags: 'a' })
//app.use(logger('common', { stream: accessLogStream }))

// Favicon
app.use(favicon(path.join(__dirname, config.favicon_path, config.favicon)));
// app.use(favicon(path.join(__dirname, 'dist', 'favicon.ico')))

// Allows cross origin in development only
app.use(cors(config.cors_origin));
// app.use(cors({ origin: 'http://gp-suivifact.herokuapp.com/' }));
// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
// Passport authenticate
app.use(passport.initialize());
// Set Static Folder
app.use(express.static(path.join(__dirname, config.static_path)));

// use routes
app.use('/api/auth', auth);
app.use('/api', classe);
app.use('/api', eleve);
app.use('/api', competence);
app.use('/api', domaine);
app.use('/api', evaluation);
app.use('/api/enums', enums);
app.use('/api', resultat);

// allow to refresh page
// send back to dist/index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, config.static_path, config.static_file));
});

// Start Server: Listen on port
app.listen(port, () => {
  console.log('Listening on port ' + port);
});