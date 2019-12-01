const mongo = require('mongoose');

let collection;

(async () => {
  const conn = await mongo.connect('mongodb://127.0.0.1:27017/db', { useUnifiedTopology: true, useNewUrlParser: true });
  const db = conn.connection.db('users');
  db.createCollection('users');

  collection = db.collection('users')
})();

export default collection;