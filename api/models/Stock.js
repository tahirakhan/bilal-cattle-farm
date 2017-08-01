
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var StockSchema = new mongoose.Schema({
    stockId: Number,
	productId: Number,
	quantity:Number,
	companyId: Number,
    active: { type: Boolean, default: true },
	createdBy: Number,
	updatedBy: Number,
	createdOn: {type: Date, default: Date.now},
	updatedOn: {type: Date, default: Date.now},
	deleted: {type: Boolean, default: false}
})

autoIncrement.initialize(mongoose.connection);
StockSchema.plugin(autoIncrement.plugin, {
    model: 'Stock',
    field: 'stockId',
    startAt: 100,
    incrementBy: 1
});

module.exports = mongoose.model('Stock',StockSchema);