
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var WeightSchema = new mongoose.Schema({
    weightId: Number,
	animalId: Number,
    date: {type: Date,default : Date.now},
	weight: Number,
	
	currentPrice:Number,

	birthWeight: Number,
	previousWeightDate: Date,
	previousWeight: Number,
	
	companyId: Number,
    active: { type: Boolean, default: true },
	createdBy: Number,
	updatedBy: Number,
	createdOn: {type: Date, default: Date.now},
	updatedOn: {type: Date, default: Date.now},
	deleted: {type: Boolean, default: false}
})

autoIncrement.initialize(mongoose.connection);
WeightSchema.plugin(autoIncrement.plugin, {
    model: 'Weight',
    field: 'weightId',
    startAt: 100,
    incrementBy: 1
});

module.exports = mongoose.model('Weight',WeightSchema);