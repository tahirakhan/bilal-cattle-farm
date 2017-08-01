
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var ExpenseDetailsSchema = new mongoose.Schema({
    expenseDetailsId: Number,
	expenseDescription: String,
	productId: Number,
	animalId: Number,
	expenseId: Number,
	expenseTypeId:Number,
	companyId: Number,
	quantity: Number,
	amount: Number,
	total: Number,
    active: { type: Boolean, default: true },
	createdBy: Number,
	updatedBy: Number,
	createdOn: {type: Date, default: Date.now},
	updatedOn: {type: Date, default: Date.now},
	deleted: {type: Boolean, default: false}
})

autoIncrement.initialize(mongoose.connection);
ExpenseDetailsSchema.plugin(autoIncrement.plugin, {
    model: 'ExpenseDetails',
    field: 'expenseDetailsId',
    startAt: 100,
    incrementBy: 1
});

module.exports = mongoose.model('ExpenseDetails',ExpenseDetailsSchema);