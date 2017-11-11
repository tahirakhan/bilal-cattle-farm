
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var ExpenseSchema = new mongoose.Schema({
    expenseId: Number,
	expenseDescription: String,
	expenseDate: {type: Date,default: Date.now},
	expenseTotal: Number,
	companyId: Number,
	active: { type: Boolean, default: true },
	createdBy: Number,
	updatedBy: Number,
	createdOn: {type: Date, default: Date.now},
	updatedOn: {type: Date, default: Date.now},
	deleted: {type: Boolean, default: false}
})

autoIncrement.initialize(mongoose.connection);
ExpenseSchema.plugin(autoIncrement.plugin, {
    model: 'Expense',
    field: 'expenseId',
    startAt: 100,
    incrementBy: 1
});

module.exports = mongoose.model('Expense',ExpenseSchema);