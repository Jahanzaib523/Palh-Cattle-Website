const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
   name: {type: String},
   msg: {type: String},
   phone: {type: String}
});

module.exports = mongoose.model('ContactInfo', contactSchema);