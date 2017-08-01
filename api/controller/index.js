var express = require('express');
var router = express.Router();


router.use('/master-data', require('./master-data'))
router.use('/abc', require('./master-data'))
router.use('/xyz', require('./master-data'))

router.get('/', function(req, res) {res.send('Hello World')});

module.exports = router;


