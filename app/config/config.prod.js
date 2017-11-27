
module.exports = {
  environment: 'production',
  uri: 'mongodb://localhost:27017/MP-Competences',
  options: { useMongoClient: true },
  db: 'MP-Competences',
  favicon_path: 'client/build',  // TODO: change favicon path/file
  favicon: 'favicon.ico',
  cors_origin: { origin: 'http://gp-suivifact.herokuapp.com/' }, // Changer adresse quand connue
  static_path: 'client/build',  // TODO: change static path/file
  static_file: 'index.html'
};