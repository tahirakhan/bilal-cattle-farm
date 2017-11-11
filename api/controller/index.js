var express = require('express');
var router = express.Router();




router.use('/', require('./api/user.js'))
router.use('/', require('./api/company.js'))
router.use('/', require('./api/farm.js'))
router.use('/', require('./api/animalTag.js'))
router.use('/', require('./api/expenseType.js'))
router.use('/', require('./api/product.js'))
router.use('/', require('./api/billCycle.js'))
router.use('/', require('./api/customer.js'))
router.use('/', require('./api/stock.js'))
router.use('/', require('./api/weight.js'))
router.use('/', require('./api/animal.js'))
router.use('/', require('./api/dairyRecord.js'))
router.use('/', require('./api/expense.js'))
router.use('/', require('./api/expense-detail.js'))

router.get('/', function(req, res) {res.send('Hello World')});

module.exports = router;


