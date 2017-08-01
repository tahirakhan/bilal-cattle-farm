
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var WeightsSchema = new mongoose.Schema({
    weightsId: Number,
	animalId: Number,
    date: {type: Date,default : Date.now},
	weight: Number,
	
	currentPrice:Number,

	birthWeight: Date,
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
WeightsSchema.plugin(autoIncrement.plugin, {
    model: 'Weights',
    field: 'weightsId',
    startAt: 100,
    incrementBy: 1
});

module.exports = mongoose.model('Weights',WeightsSchema);