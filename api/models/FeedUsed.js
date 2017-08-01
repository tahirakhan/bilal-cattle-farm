
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var FeedUsedSchema = new mongoose.Schema({
    feedUsedId: Number,
	farmId: Number,
	animalId:Number,
	productId:Number,
	quantity:Number,
	costPerAnimal:Number,
	companyId: Number,
    active: { type: Boolean, default: true },
	createdBy: Number,
	updatedBy: Number,
	createdOn: {type: Date, default: Date.now},
	updatedOn: {type: Date, default: Date.now},
	deleted: {type: Boolean, default: false}
})

autoIncrement.initialize(mongoose.connection);
FeedUsedSchema.plugin(autoIncrement.plugin, {
    model: 'FeedUsed',
    field: 'feedUsedId',
    startAt: 100,
    incrementBy: 1
});

module.exports = mongoose.model('FeedUsed',FeedUsedSchema);