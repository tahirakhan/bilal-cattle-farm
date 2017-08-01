var express = require('express');
var router = express.Router();

var User = require('../../models/User');

// on routes that end in /users
// ----------------------------------------------------
router.route('/user')

	// create a user (accessed at POST http://localhost:8080/users)
	.post(function(req, res) {
		
		var user = new User();		// create a new instance of the User model
		user.name = req.body.name;  // set the users name (comes from the request)
        user.email = req.body.email; 
        user.password = req.body.password; 
        user.companyId = req.body.companyId; 
    

		user.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'User created!' });
		});

		
	})

	// get all the users (accessed at GET http://localhost:8080/api/users)
	.get(function(req, res) {
		User.find(function(err, users) {
			if (err)
				res.send(err);

			res.json(users);
		});
	});

// on routes that end in /users/:user_id
// ----------------------------------------------------
router.route('/user/:user_id')

	// get the user with that id
	.get(function(req, res) {
		User.findById(req.params.user_id, function(err, user) {
			if (err)
				res.send(err);
			res.json(user);
		});
	})

	// update the user with this id
	.put(function(req, res) {
		User.findById(req.params.user_id, function(err, user) {

			if (err)
				res.send(err);

            user.name = req.body.name;
            user.email = req.body.email; 
            user.password = req.body.password; 
            user.companyId = req.body.companyId; 
            user.updatedOn = Date.now;
            
            if (req.body.active !== null  && req.body.active !== undefined ) {
                user.active = req.body.active;         
            }
            if (req.body.deleted !== null && req.body.deleted !== undefined) {
                user.deleted = req.body.deleted;         
            }    
            
    
			user.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'User updated!' });
			});

		});
	})

	// delete the user with this id
	.delete(function(req, res) {
		User.findById(req.params.user_id, function(err, user) {

			if (err)
				res.send(err);

            user.updatedOn = Date.now;
            user.deleted = true;         
			user.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'User updated!' });
			});

		});
    });
    
    module.exports  = router;