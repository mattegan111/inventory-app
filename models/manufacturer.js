var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ManufacturerSchema = new Schema(
  {
    name: {type: String, required: true, minLength: 1, maxLength: 100},
    address: {type: String, required: true, minLength: 1, maxLength: 200},
    phone_number: {type: String, required: true, minLength: 1, maxLength: 200},
    website: {type: String, required: false, minLength: 1, maxLength: 200},
  }
);

// Virtual for Manufacturer's URL
ManufacturerSchema
.virtual('url')
.get(function () {
  return '/manufacturers/' + this._id;
});

//Export model
module.exports = mongoose.model('Manufacturer', ManufacturerSchema);