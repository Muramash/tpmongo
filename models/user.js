const mongoose = require('mongoose');
const counter = require('mongoose');

mongoose.connect('mongodb://localhost:27017/users', {useNewUrlParser: true});
counter.connect('mongodb://localhost:27017/counter', {useNewUrlParser: true});

const model = new mongoose.Schema({
  userId: String,
  pseudo: String,
  firstname: String,
  lastname: String,
  email: String,
  password: String
});

const modelCounter = new counter.Schema({
  counterName: String,
  sequenceValue: Number
})

// model.static.find() = function(limit, offset){
//   return this.find().skip(offset).limit(limit);
// }

const theModel = mongoose.model('users', model);

const theCounterModel = counter.model('counter', modelCounter);

module.exports = {
  get: (userId) => {
   return theModel.find({ userId });
  },

  count: () => {
    return theModel.count();
  },

  getAll: (limit, offset) => {
    return theModel.find().skip(offset).limit(limit);
  },

  insert: (params) => {
    return theModel.updateOne(
      {"email": params.email}, {
      //userId: getNextSequenceValue('userId'),
      //_id: params.email,
      pseudo: params.pseudo, 
      firstname: params.firstname,
      lastname: params.lastname,
      email: params.email,
      password: params.password
    }, {upsert:true})
  },

  remove: (userId) => {
    return theModel.remove({userId});
  }
}

function getNextSequenceValue(sequenceName){

  var sequenceDocument = theCounterModel.updateOne(
     {counterName: sequenceName},
     {$inc:{sequenceValue:1}},
     {upsert: true}
  );
  var res = theCounterModel.find({sequenceName})
  
  return sequenceDocument.sequenceValue;
}

  //Insert
  //users.insertOne({ 'userId': userId, 'firstname': firstname, 'lastname': lastname, 'email': email, 'password': password })
  //update
  //users.updateOne({ 'userId': userId, 'firstname': firstname, 'lastname': lastname, 'email': email, 'password': password })
  //find/get userID
  //users.find({ 'userId': userId })
  //get all
  //users.find({}).skip(skipNumber).limit(limiteNumber);
  //remove userId
  //users.deleteOne({ 'userId': userId })
  //count
  //users.find({ 'userId': userId }).count()
//})

// const db = require('sqlite')

// module.exports = {
//   get: (userId) => {
//     return db.get('SELECT rowid, * FROM users WHERE rowid = ?', userId)
//   },

//   count: () => {
//     return db.get('SELECT COUNT(*) as count FROM users')
//   },

//   getAll: (limit, offset) => {
//     return db.all('SELECT rowid, * FROM users LIMIT ? OFFSET ?', limit, offset)
//   },

//   insert: (params) => {
//     return db.run(
//       'INSERT INTO users (pseudo, firstname, lastname, email, password) VALUES (?, ?, ?, ?, ?)',
//       params.pseudo,
//       params.firstname,
//       params.lastname,
//       params.email,
//       params.password
//     )
//   },

//   update: (userId, params) => {
//     const possibleKeys = ['firstname', 'lastname', 'email', 'pseudo', 'password']

//     let dbArgs = []
//     let queryArgs = []
//     for (key in params) {
//       if (-1 !== possibleKeys.indexOf(key)) {
//         queryArgs.push(`${key} = ?`)
//         dbArgs.push(params[key])
//       }
//     }

//     if (!queryArgs.length) {
//       let err = new Error('Bad Request')
//       err.status = 400
//       return Promise.reject(err)
//     }

//     dbArgs.push(userId)
//     dbArgs.unshift('UPDATE users SET ' + queryArgs.join(', ') + ' WHERE rowid = ?')

//     return db.run.apply(db, dbArgs).then((stmt) => {
//       if (stmt.changes === 0){
//         let err = new Error('Not found')
//         err.status = 404
//         return Promise.reject(err)
//       }

//       return stmt
//     })
//   },

//   remove: (userId) => {
//     return db.run('DELETE FROM users WHERE rowid = ?', userId)
//   }

// }
