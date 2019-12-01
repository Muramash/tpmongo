const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/users', {useNewUrlParser: true});

const model = new mongoose.Schema({
  userId: String,
  pseudo: String,
  firstname: String,
  lastname: String,
  email: String,
  password: String
});

const aModel = mongoose.model('users', model);

module.exports = {
  get: (userId) => {
   return aModel.find({ userId });
  },

  count: () => {
    return aModel.count();
  },

  getAll: (limit, offset) => {
    return aModel.find().skip(offset).limit(limit);
  },

  insert: (params) => {
    return aModel.updateOne(
      {"email": params.email}, {
      pseudo: params.pseudo, 
      firstname: params.firstname,
      lastname: params.lastname,
      email: params.email,
      password: params.password
    }, {upsert:true})
  },

  remove: (userId) => {
    return aModel.remove({userId});
  }
}

function getNextSequenceValue(sequenceName){

  var sequenceDocument = theCounterModel.updateOne(
     {counterName: sequenceName},
     {$inc:{sequenceValue:1}},
     {upsert: true}
  );
  
  return sequenceDocument.sequenceValue;
}