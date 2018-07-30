module.exports = {
  environment: 'development',
  uri: 'mongodb://localhost:27017/MP-Competences',
  options: {
    useMongoClient: true
  },
  db: 'MP-Competences',
  favicon_path: 'client/public',
  favicon: 'favicon.ico',
  cors_origin: {
    origin: 'http://localhost:3000'
  },
  static_path: 'client/build', // TODO: change static path/file
  static_file: 'index.html'
};