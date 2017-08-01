
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var ExpenseTypeSchema = new mongoose.Schema({
    expenseTypeId: Number,
	expenseTypeName: String,
	companyId: Number,
    active: { type: Boolean, default: true },
	createdBy: Number,
	updatedBy: Number,
	createdOn: {type: Date, default: Date.now},
	updatedOn: {type: Date, default: Date.now},
	deleted: {type: Boolean, default: false}
})

autoIncrement.initialize(mongoose.connection);
ExpenseTypeSchema.plugin(autoIncrement.plugin, {
    model: 'ExpenseType',
    field: 'expenseTypeId',
    startAt: 100,
    incrementBy: 10
});


module.exports = mongoose.model('ExpenseType',ExpenseTypeSchema);