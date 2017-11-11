var express = require('express');
var router = express.Router();

var Farm = require('../../models/Farm');

// on routes that end in /farms
// ----------------------------------------------------
router.route('/company/:id/farm')

	// create a farm (accessed at POST http://localhost:8080/farms)
	.post(function (req, res) {

		var farm = new Farm();		// create a new instance of the Farm model
		farm.farmName = req.body.farmName;  // set the farms name (comes from the request)
		farm.companyId = req.body.companyId;  // set the farms name (comes from the request)

		farm.save(function (err) {
			if (err)
				res.send(err);

			res.json({ message: 'Farm created!' });
		});


	})

	// get all the farms (accessed at GET http://localhost:8080/api/farms)
	.get(function (req, res) {
		Farm.find({ deleted: false, companyId: req.params.id }, function (err, farms) {
			if (err)
				res.send(err);

			res.json({ "aaData": farms });
		});
	});

// on routes that end in /farms/:farm_id
// ----------------------------------------------------
router.route('/company/:id/farm/:farm_id')

	// get the farm with that id
	.get(function (req, res) {
		Farm.findById(req.params.farm_id, function (err, farm) {
			if (err)
				res.send(err);
			res.json(farm);
		});
	})

	// update the farm with this id
	.put(function (req, res) {
		Farm.findById(req.params.farm_id, function (err, farm) {

			if (err)
				res.send(err);

			farm.farmName = req.body.farmName;  // set the farms name (comes from the request)
			farm.companyId = req.body.companyId;  // set the farms name (comes from the request)
			//farm.updatedOn = Date.now;

			if (req.body.active !== null && req.body.active !== undefined) {
				farm.active = req.body.active;
			}
			if (req.body.deleted !== null && req.body.deleted !== undefined) {
				farm.deleted = req.body.deleted;
			}

			farm.save(function (err) {
				if (err)
					res.send(err);

				res.json({ message: 'Farm updated!' });
			});

		});
	})

	// delete the farm with this id
	.delete(function (req, res) {
		Farm.findById(req.params.farm_id, function (err, farm) {

			if (err)
				res.send(err);

			//farm.updatedOn = Date.now;
			farm.deleted = true;

			farm.save(function (err) {
				if (err)
					res.send(err);

				res.json({ message: 'Farm deleted!' });
			});

		});
	});

module.exports = router;