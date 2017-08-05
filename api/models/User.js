
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var bcrypt = require('bcrypt-nodejs')
var UserSchema = new mongoose.Schema({
    userId: Number,
    name:String,
    email : String,
    password: String,
    masterAdmin:{type: Boolean, default: false},
    companyId: Number,
    active: { type: Boolean, default: true },
	createdBy: Number,
	updatedBy: Number,
	createdOn: {type: Date, default: Date.now},
	updatedOn: {type: Date, default: Date.now},
	deleted: {type: Boolean, default: false}
})

UserSchema.methods.comparePasswords = function(password,callback){
    bcrypt.compare(password,this.password,callback);
}

UserSchema.pre('save',function(next){
    var user = this;
    if(!user.isModified('password')) return next();
    bcrypt.genSalt(10,function(err,salt){
        bcrypt.hash(user.password,salt, null, function(err, hash){
            
            if(err) return next(err);    
            user.password = hash;
            next();
        })
    });
})


UserSchema.methods.toJSON = function(){
    var user = this.toObject();
    delete user.password;
    
    return user;
}

autoIncrement.initialize(mongoose.connection);
UserSchema.plugin(autoIncrement.plugin, {
    model: 'User',
    field: 'userId',
    startAt: 100,
    incrementBy: 1
});


module.exports = mongoose.model('User',UserSchema);