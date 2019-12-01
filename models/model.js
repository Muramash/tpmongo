const Mongoose = require('mongoose');

const model = new Mongoose.Schema({
  userId: String,
  pseudo: String,
  firstname: String,
  lastname: String,
  email: String,
  password: String
});

export default Mongoose.model('user', model);