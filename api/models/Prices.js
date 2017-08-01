
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var Priceschema = new mongoose.Schema({
    pricesId: Number,
	animalId: Number,
	version: Number,
	date :{type : Date,default: Date.now},
	price :Number,
	new:{type:Boolean,default:true},
	companyId: Number,
    active: { type: Boolean, default: true },
	createdBy: Number,
	updatedBy: Number,
	createdOn: {type: Date, default: Date.now},
	updatedOn: {type: Date, default: Date.now},
	deleted: {type: Boolean, default: false}
})

autoIncrement.initialize(mongoose.connection);
Priceschema.plugin(autoIncrement.plugin, {
    model: 'Prices',
    field: 'pricesId',
    startAt: 100,
    incrementBy: 1
});

module.exports = mongoose.model('Prices',Priceschema);