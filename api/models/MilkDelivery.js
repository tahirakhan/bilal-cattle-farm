
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var MilkDeliverySchema = new mongoose.Schema({
    milkDeliveryId: Number,
    
    customerId: Number,
    deliveryDate: {type: Date,default : Date.now},
    quantity: Number,
    rate:Number,
    
    amount:Number,
    
    active: { type: Boolean, default: true },
	createdBy: Number,
	updatedBy: Number,
	createdOn: {type: Date, default: Date.now},
	updatedOn: {type: Date, default: Date.now},
	deleted: {type: Boolean, default: false}
})


autoIncrement.initialize(mongoose.connection);
MilkDeliverySchema.plugin(autoIncrement.plugin, {
    model: 'MilkDelivery',
    field: 'milkDeliveryId',
    startAt: 100,
    incrementBy: 10
});

module.exports = mongoose.model('MilkDelivery',MilkDeliverySchema);