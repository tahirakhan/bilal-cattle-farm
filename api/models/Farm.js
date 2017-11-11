
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var FarmSchema = new mongoose.Schema({
	farmId: Number,
	farmName: String,
	companyId: Number,
	active: { type: Boolean, default: true },
	createdBy: Number,
	updatedBy: Number,
	createdOn: { type: Date, default: Date.now },
	updatedOn: { type: Date, default: Date.now },
	deleted: { type: Boolean, default: false }
})

autoIncrement.initialize(mongoose.connection);
FarmSchema.plugin(autoIncrement.plugin, {
	model: 'Farm',
	field: 'farmId',
	startAt: 100,
	incrementBy: 1
});

module.exports = mongoose.model('Farm', FarmSchema);