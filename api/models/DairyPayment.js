
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var DairyPaymentSchema = new mongoose.Schema({
    dairyPaymentId: Number,
	customerId: Number,
    paymentDate: {type: Date,default : Date.now},
	amount: Number,
	
	companyId: Number,
    active: { type: Boolean, default: true },
	createdBy: Number,
	updatedBy: Number,
	createdOn: {type: Date, default: Date.now},
	updatedOn: {type: Date, default: Date.now},
	deleted: {type: Boolean, default: false}
})

autoIncrement.initialize(mongoose.connection);
DairyPaymentSchema.plugin(autoIncrement.plugin, {
    model: 'DairyPayment',
    field: 'dairyPaymentId',
    startAt: 100,
    incrementBy: 1
});

module.exports = mongoose.model('DairyPayment',DairyPaymentSchema);