
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var ExpenseDetailSchema = new mongoose.Schema({
    expenseDetailId: Number,
	expenseDescription: {type: String,default: ""},
	productId: Number,
	animalId: Number,
	expenseId: Number,
	expenseTypeId:Number,
	
	quantity: Number,
	amount: Number,
	total: Number,
	
	companyId: Number,
	active: { type: Boolean, default: true },
	createdBy: Number,
	updatedBy: Number,
	createdOn: {type: Date, default: Date.now},
	updatedOn: {type: Date, default: Date.now},
	deleted: {type: Boolean, default: false}
})

autoIncrement.initialize(mongoose.connection);
ExpenseDetailSchema.plugin(autoIncrement.plugin, {
    model: 'ExpenseDetails',
    field: 'expenseDetailId',
    startAt: 100,
    incrementBy: 1
});

module.exports = mongoose.model('ExpenseDetails',ExpenseDetailSchema);