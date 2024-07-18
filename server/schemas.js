const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

const splitSchema = new mongoose.Schema({
  description: String,
  totalcost: Number,
  paidBy: String,
  splitType: String,
  participants: [
      {
      name: String,
      amount: Number
      }
  ],
  entryDate:{type: Date, default: Date.now }
});

const friendschema = new mongoose.Schema({
  name: String,
  iconKey: String
});

const Split = mongoose.model('Split', splitSchema, "splits");
const Friend = mongoose.model('Friend', friendschema, "friends_DB");

const mySchemas = {'Split': Split, "Friend": Friend};
module.exports = mySchemas;