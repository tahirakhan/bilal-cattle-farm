var express = require('express');
var router = express.Router();

var AnimalTag = require('../../models/AnimalTag');

// on routes that end in /animalTags
// ----------------------------------------------------
router.route('/animal-tag')

	// create a animalTag (accessed at POST http://localhost:8080/animalTags)
	.post(function(req, res) {
		
		var animalTag = new AnimalTag();		// create a new instance of the AnimalTag model
		animalTag.animalTagName = req.body.animalTagName;  // set the animalTags name (comes from the request)
		animalTag.companyId = req.body.companyId;  // set the animalTags name (comes from the request)

		animalTag.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'AnimalTag created!' });
		});

		
	})

	// get all the animalTags (accessed at GET http://localhost:8080/api/animalTags)
	.get(function(req, res) {
		AnimalTag.find({deleted:false},function(err, animalTags) {
			if (err)
				res.send(err);

			res.json({ "aaData":animalTags});
		});
	});

// on routes that end in /animalTags/:animalTag_id
// ----------------------------------------------------
router.route('/animal-tag/:animalTag_id')

	// get the animalTag with that id
	.get(function(req, res) {
		AnimalTag.findById(req.params.animalTag_id, function(err, animalTag) {
			if (err)
				res.send(err);
			res.json(animalTag);
		});
	})

	// update the animalTag with this id
	.put(function(req, res) {
		AnimalTag.findById(req.params.animalTag_id, function(err, animalTag) {

			if (err)
				res.send(err);

		animalTag.animalTagName = req.body.animalTagName;  // set the animalTags name (comes from the request)
		animalTag.companyId = req.body.companyId;  // set the animalTags name (comes from the request)
            //animalTag.updatedOn = Date.now;

            if (req.body.active !== null  && req.body.active !== undefined ) {
                animalTag.active = req.body.active;         
            }
            if (req.body.deleted !== null && req.body.deleted !== undefined) {
                animalTag.deleted = req.body.deleted;         
            } 

			animalTag.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'AnimalTag updated!' });
			});

		});
	})

	// delete the animalTag with this id
	.delete(function(req, res) {
		AnimalTag.findById(req.params.animalTag_id, function(err, animalTag) {

			if (err)
				res.send(err);

            //animalTag.updatedOn = Date.now;
            animalTag.deleted = true;         
             
			animalTag.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'AnimalTag deleted!' });
			});

		});
    });
    
    module.exports  = router;