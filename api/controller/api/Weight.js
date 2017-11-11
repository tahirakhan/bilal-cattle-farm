var express = require('express');
var router = express.Router();

var Weight = require('../../models/Weight');

// on routes that end in /weights
// ----------------------------------------------------
router.route('/company/:id/weight')

	// create a weight (accessed at POST http://localhost:8080/weights)
	.post(function (req, res) {

		var weight = new Weight();		// create a new instance of the Weight model
		weight.animalId = req.body.animalId;  // set the weights name (comes from the request)
		weight.date = req.body.date;
		weight.weight = req.body.weight;
		weight.currentPrice = req.body.currentPrice;
		weight.birthWeight = req.body.birthWeight;
		weight.previousWeightDate = req.body.previousWeightDate;
		weight.previousWeight = req.body.previousWeight;
		
		weight.companyId = req.body.companyId;  // set the weights name (comes from the request)

		weight.save(function (err) {
			if (err)
				res.send(err);

			res.json({ message: 'Weight created!' });
		});


	})

	// get all the weights (accessed at GET http://localhost:8080/api/weights)
	.get(function (req, res) {
		Weight.find({ deleted: false, companyId: req.params.id }, function (err, weights) {
			if (err)
				res.send(err);

			res.json({ "aaData": weights });
		});
	});

// on routes that end in /weights/:weight_id
// ----------------------------------------------------
router.route('/company/:id/weight/:weight_id')

	// get the weight with that id
	.get(function (req, res) {
		Weight.findById(req.params.weight_id, function (err, weight) {
			if (err)
				res.send(err);
			res.json(weight);
		});
	})

	// update the weight with this id
	.put(function (req, res) {
		Weight.findById(req.params.weight_id, function (err, weight) {

			if (err)
				res.send(err);

				weight.animalId = req.body.animalId;  // set the weights name (comes from the request)
				weight.date = req.body.date;
				weight.weight = req.body.weight;
				weight.currentPrice = req.body.currentPrice;
				weight.birthWeight = req.body.birthWeight;
				weight.previousWeightDate = req.body.previousWeightDate;
				weight.previousWeight = req.body.previousWeight;
				weight.companyId = req.body.companyId;  // set the weights name (comes from the request)
			//weight.updatedOn = Date.now;

			if (req.body.active !== null && req.body.active !== undefined) {
				weight.active = req.body.active;
			}
			if (req.body.deleted !== null && req.body.deleted !== undefined) {
				weight.deleted = req.body.deleted;
			}

			weight.save(function (err) {
				if (err)
					res.send(err);

				res.json({ message: 'Weight updated!' });
			});

		});
	})

	// delete the weight with this id
	.delete(function (req, res) {
		Weight.findById(req.params.weight_id, function (err, weight) {

			if (err)
				res.send(err);

			//weight.updatedOn = Date.now;
			weight.deleted = true;

			weight.save(function (err) {
				if (err)
					res.send(err);

				res.json({ message: 'Weight deleted!' });
			});

		});
	});

	router.route('/company/:id/weight/animal-id/:animal_id')

	// get the animal with that id
	.get(function(req, res) {
		Weight.findOne({animalId:req.params.animal_id,deleted:false,companyId:req.params.id,deleted:false}, function(err, weight) {
			if (err)
				res.send(err);
			res.json(weight);
		});
	})

module.exports = router;