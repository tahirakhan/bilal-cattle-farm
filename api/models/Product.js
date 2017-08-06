
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var ProductSchema = new mongoose.Schema({
    productId: Number,
	productName: String,
	productDescription: String,
	productPrice: String,
	productPer: String,
	companyId: Number,
    active: { type: Boolean, default: true },
	createdBy: Number,
	updatedBy: Number,
	createdOn: {type: Date, default: Date.now},
	updatedOn: {type: Date, default: Date.now},
	deleted: {type: Boolean, default: false}
})

autoIncrement.initialize(mongoose.connection);
ProductSchema.plugin(autoIncrement.plugin, {
    model: 'Product',
    field: 'productId',
    startAt: 100,
    incrementBy: 1
});


module.exports = mongoose.model('Product',ProductSchema);