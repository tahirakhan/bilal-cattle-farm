
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var AnimalTagSchema = new mongoose.Schema({
    animalTagId: Number,
	animalTagName: String,
	companyId: Number,
    active: { type: Boolean, default: true },
	createdBy: Number,
	updatedBy: Number,
	createdOn: {type: Date, default: Date.now},
	updatedOn: {type: Date, default: Date.now},
	deleted: {type: Boolean, default: false}
})

autoIncrement.initialize(mongoose.connection);
AnimalTagSchema.plugin(autoIncrement.plugin, {
    model: 'AnimalTag',
    field: 'animalTagId',
    startAt: 100,
    incrementBy: 10
});

module.exports = mongoose.model('AnimalTag',AnimalTagSchema);