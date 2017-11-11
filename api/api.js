var express = require('express');
var  bodyParser= require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var User = require('./models/User.js');
var Company = require('./models/Company.js');
var Farm = require('./models/Farm.js');

var AnimalTag = require('./models/AnimalTag.js');
var AnimalTag = require('./models/AnimalTag.js');
var ExpenseType = require('./models/ExpenseType.js');
var Product = require('./models/Product.js')
var BillCycle = require('./models/BillCycle.js');

var Expense = require('./models/Expense.js');
var ExpenseDetails = require('./models/ExpenseDetail.js');
var Animal = require('./models/Animal.js');

var Stock = require('./models/Stock.js');
var Weights = require('./models/Weight.js');
var FeedUsed = require('./models/FeedUsed.js');
var Prices = require('./models/Prices.js');




var DairyRecord = require('./models/DairyRecord.js');
var Customer = require('./models/Customer.js');
var MilkDelivery = require('./models/MilkDelivery.js');
var DairyPayment = require('./models/DairyPayment.js');
var app = express();
app.use(bodyParser.json()); // for parsing application/json

var router = require('./controller/index');



app.use(function(req,res,next){
    
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers','Content-Type,Authorization');
    
    next();
});
app.use('/api', router);



app.post('/register',function(req,res){
    var object = req.body;
    
    var newCompany = new Company({companyName:object.companyName});
    newCompany.save(function(err){
        var newUser = new User({name:object.name,email:object.email,password:object.password,companyId:newCompany.companyId,masterAdmin:true});
        newUser.save(function(err){
            createSendToken(newUser,res);
        });
    });
});

app.post('/login',function(req,res){
    req.user = req.body;
    var searchUser = {email:req.user.email};
    User.findOne(searchUser,function(err,user){
        if(err)
            throw err;
        if(!user)
            return res.status(401).send({message:'Wrong email/password'});
            
        user.comparePasswords(req.user.password,function(err,isMatch){
            if(err) throw err;
            if(!isMatch)
                return res.status(401).send({message:'Wrong email/password'});
            
            createSendToken(user,res);
        });
    })
})

function createSendToken(user,res){
    var payload = {
        sub: user.id
    }
    var token = jwt.encode(payload,"shhh...");
    
    res.status(200).send({user:user.toJSON(),token:token});
    
}
var jobs = [
    'Cook',
    'Super Hero',
    'Unicorn Wisperer',
    'Toast Inspector'
];

app.get('/jobs',function(req,res){
    
    if(!req.headers.authorization){
        return res.status(401).send({
            message: 'You are not authorized'
        })
    }
    var token = req.headers.authorization.split(' ')[1];
    var payload = jwt.decode(token,"shhh...");
    
    if(!payload.sub){
        res.status(401).send({
            message: 'Authentication failed'
        });
    }
    
    res.json(jobs);
})


var mongoDB = 'mongodb://localhost/cattlefarm';
mongoose.connect(mongoDB);


var server = app.listen(9000,function(){
    console.log('server listening on ',server.address().port);
    
})