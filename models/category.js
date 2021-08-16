var mongoose = require('mongoose');

var Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {type: String, required: true},
    parent_category: {type: Schema.Types.ObjectId, ref: 'Category'},
    child_categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
});

// Virtual for Category URL
categorySchema
.virtual('url')
.get(function () {
    return `/category/${this.name}-${this._id}/`;
});

//Export model
module.exports = mongoose.model('Category', categorySchema);