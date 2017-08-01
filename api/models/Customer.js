
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var CustomerSchema = new mongoose.Schema({
    customerId: Number,
    customerName: String,
    address: String,
    phone: String,
    cnic: String,
    lastRate: Number,
    totalPaymentDue: Number,
    active: { type: Boolean, default: true },
	createdBy: Number,
	updatedBy: Number,
	createdOn: {type: Date, default: Date.now},
	updatedOn: {type: Date, default: Date.now},
	deleted: {type: Boolean, default: false}
})


autoIncrement.initialize(mongoose.connection);
CustomerSchema.plugin(autoIncrement.plugin, {
    model: 'Customer',
    field: 'customerId',
    startAt: 100,
    incrementBy: 10
});

module.exports = mongoose.model('Customer',CustomerSchema);