
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var CompanySchema = new mongoose.Schema({
    companyId: Number,
    companyName: String,
    active: { type: Boolean, default: true },
	createdBy: Number,
	updatedBy: Number,
	createdOn: {type: Date, default: Date.now},
	updatedOn: {type: Date, default: Date.now},
	deleted: {type: Boolean, default: false}
})


autoIncrement.initialize(mongoose.connection);
CompanySchema.plugin(autoIncrement.plugin, {
    model: 'Company',
    field: 'companyId',
    startAt: 100,
    incrementBy: 10
});

module.exports = mongoose.model('Company',CompanySchema);