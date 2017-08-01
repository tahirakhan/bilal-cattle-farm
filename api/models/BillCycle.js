
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var BillCycleSchema = new mongoose.Schema({
    billCycleId: Number,
	billCycleName: String,
	billCycleDescription: String,
	billCycleDays : Number,
	companyId: Number,
    active: { type: Boolean, default: true },
	createdBy: Number,
	updatedBy: Number,
	createdOn: {type: Date, default: Date.now},
	updatedOn: {type: Date, default: Date.now},
	deleted: {type: Boolean, default: false}
})

autoIncrement.initialize(mongoose.connection);
BillCycleSchema.plugin(autoIncrement.plugin, {
    model: 'BillCycle',
    field: 'billCycleId',
    startAt: 100,
    incrementBy: 10
});

module.exports = mongoose.model('BillCycle',BillCycleSchema);