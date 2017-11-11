
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var AnimalSchema = new mongoose.Schema({
    animalId: Number,
	tagId: Number,
	farmId: Number,
	birthDate :{type : Date, default: Date.now},
	purchaseDate :{type : Date, default: Date.now},
	
	birthWeight: Number,
	currentWeight: Number,

	breed: String,

	purchasePrice: Number,
	currentPrice:Number,
	
	companyId: Number,
    active: { type: Boolean, default: true },
	createdBy: Number,
	updatedBy: Number,
	createdOn: {type: Date, default: Date.now},
	updatedOn: {type: Date, default: Date.now},
	deleted: {type: Boolean, default: false}
})

autoIncrement.initialize(mongoose.connection);
AnimalSchema.plugin(autoIncrement.plugin, {
    model: 'Animal',
    field: 'animalId',
    startAt: 100,
    incrementBy: 1
});

module.exports = mongoose.model('Animal',AnimalSchema);