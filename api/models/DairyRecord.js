
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var DairyRecordSchema = new mongoose.Schema({
    dairyRecordId: Number,
	animalId: Number,
    date: {type: Date,default : Date.now},
	weight: Number,
	
	companyId: Number,
    active: { type: Boolean, default: true },
	createdBy: Number,
	updatedBy: Number,
	createdOn: {type: Date, default: Date.now},
	updatedOn: {type: Date, default: Date.now},
	deleted: {type: Boolean, default: false}
})

autoIncrement.initialize(mongoose.connection);
DairyRecordSchema.plugin(autoIncrement.plugin, {
    model: 'DairyRecord',
    field: 'dairyRecordId',
    startAt: 100,
    incrementBy: 1
});

module.exports = mongoose.model('DairyRecord',DairyRecordSchema);