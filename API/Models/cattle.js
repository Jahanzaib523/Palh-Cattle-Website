const mongoose = require('mongoose');

const cattleSchema = mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   type: {type: String},
   description: {type: String},
   price: {type: Number},
   productImage: {type: String}
});

module.exports = mongoose.model('Cattle', cattleSchema);