var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProductSchema = new Schema(
  {
    name: {type: String, required: true, minLength: 1, maxLength: 100},
    description: {type: String, required: true, minLength: 1, maxLength: 500},
    serial: {type: String, required: true, minLength: 1, maxLength: 100},
    price_in_cents: {type: String, required: true, minLength: 1, maxLength: 10},
    manufacturer: [{type: Schema.Types.ObjectId, ref: 'Manufacturer'}],
    category: [{type: Schema.Types.ObjectId, ref: 'Category'}],
    quantity: {type: Number, required: true},
  }
);

// Virtual for Product's URL
ProductSchema
.virtual('url')
.get(function () {
  return '/product/' + this._id;
});

//Export model
module.exports = mongoose.model('Product', ProductSchema);