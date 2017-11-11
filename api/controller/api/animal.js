var express = require('express');
var router = express.Router();

var Animal = require('../../models/Animal');

// on routes that end in /animals
// ----------------------------------------------------
router.route('/company/:id/animal')

	// create a animal (accessed at POST http://localhost:8080/animals)
	.post(function(req, res) {
		
		var animal = new Animal();		// create a new instance of the Animal model
		animal.animalName = req.body.animalName;  // set the animals name (comes from the request)
		animal.purchaseDate = req.body.purchaseDate,
        animal.birthDate = req.body.birthDate,
        animal.birthWeight = req.body.birthWeight,
        animal.currentWeight = req.body.currentWeight,
        animal.farmId = req.body.farmId,
        animal.tagId = req.body.tagId,
        animal.breed = req.body.breed,
        animal.purchasePrice = req.body.purchasePrice,
        animal.currentPrice = req.body.currentPrice
		animal.companyId = req.body.companyId;  // set the animals name (comes from the request)

		animal.save(function(err) {
			if (err) return next(err);

			res.json({ message: 'Animal created!' });
		});

		
	})

	// get all the animals (accessed at GET http://localhost:8080/api/animals)
	.get(function(req, res) {
		Animal.find({deleted:false,companyId:req.params.id},function(err, animals) {
			if (err)
				res.send(err);

			res.json({ "aaData":animals});
		});
	});

// on routes that end in /animals/:animal_id
// ----------------------------------------------------
router.route('/company/:id/animal/:animal_id')

	// get the animal with that id
	.get(function(req, res) {
		Animal.findById(req.params.animal_id, function(err, animal) {
			if (err)
				res.send(err);
			res.json(animal);
		});
	})

	// update the animal with this id
	.put(function(req, res) {
		Animal.findById(req.params.animal_id, function(err, animal) {

			if (err)
				res.send(err);

		animal.animalName = req.body.animalName;  // set the animals name (comes from the request)
		animal.purchaseDate = req.body.purchaseDate,
        animal.birthDate = req.body.birthDate,
        animal.birthWeight = req.body.birthWeight,
        animal.currentWeight = req.body.currentWeight,
        animal.farmId = req.body.farmId,
        animal.tagId = req.body.tagId,
        animal.breed = req.body.breed,
        animal.purchasePrice = req.body.purchasePrice,
		animal.currentPrice = req.body.currentPrice
		animal.companyId = req.body.companyId;  // set the animals name (comes from the request)
            //animal.updatedOn = Date.now;

            if (req.body.active !== null  && req.body.active !== undefined ) {
                animal.active = req.body.active;         
            }
            if (req.body.deleted !== null && req.body.deleted !== undefined) {
                animal.deleted = req.body.deleted;         
            } 

			animal.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Animal updated!' });
			});

		});
	})

	// delete the animal with this id
	.delete(function(req, res) {
		Animal.findById(req.params.animal_id, function(err, animal) {

			if (err)
				res.send(err);

            //animal.updatedOn = Date.now;
            animal.deleted = true;         
             
			animal.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Animal deleted!' });
			});

		});
	});
	
	router.route('/company/:id/animal/animal-id/:animal_id')

	// get the animal with that id
	.get(function(req, res) {
		Animal.findOne({animalId:req.params.animal_id,deleted:false,companyId:req.params.id,deleted:false}, function(err, animal) {
			if (err)
				res.send(err);
			res.json(animal);
		});
	})

    
    module.exports  = router;