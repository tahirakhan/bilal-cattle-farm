var express = require('express');
var router = express.Router();



var user_controller = require('./api/user');

router.get('/',function(req,res){
    res.send('Hello World')
})

/// BOOK ROUTES ///
/* GET catalog home page. */
router.get('/', user_controller.index);
/* GET request for creating a Book. NOTE This must come before routes that display Book (uses id) */
router.get('/book/create', user_controller.create_get);
/* POST request for creating Book. */
router.post('/book/create', user_controller.create_post);
/* GET request to delete Book. */
router.get('/book/:id/delete', user_controller.delete_get);
// POST request to delete Book
router.post('/book/:id/delete', user_controller.delete_post);
/* GET request to update Book. */
router.get('/book/:id/update', user_controller.update_get);
// POST request to update Book
router.post('/book/:id/update', user_controller.update_post);
/* GET request for one Book. */
router.get('/book/:id', user_controller.detail);
/* GET request for list of all Book items. */
router.get('/books', user_controller.list);



module.exports = router;