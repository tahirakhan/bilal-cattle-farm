var express = require('express');
var router = express.Router();

var DairyRecord = require('../../models/DairyRecord');

// on routes that end in /dairy-records
// ----------------------------------------------------
router.route('/company/:id/dairy-record')

	// create a dairyRecord (accessed at POST http://localhost:8080/dairy-records)
	.post(function (req, res) {

		var dairyRecord = new DairyRecord();		// create a new instance of the DairyRecord model
		dairyRecord.animalId = req.body.animalId;  // set the dairyRecords name (comes from the request)
		dairyRecord.date = req.body.date;  // set the dairyRecords name (comes from the request)
		dairyRecord.weight = req.body.weight;  // set the dairyRecords name (comes from the request)
		dairyRecord.companyId = req.body.companyId;  // set the dairyRecords name (comes from the request)
		dairyRecord.save(function (err) {
			if (err)
				res.send(err);

			res.json({ message: 'DairyRecord created!' });
		});


	})

	// get all the dairyRecords (accessed at GET http://localhost:8080/api/dairy-records)
	.get(function (req, res) {
		DairyRecord.find({ deleted: false, companyId: req.params.id }, function (err, dairyRecords) {
			if (err)
				res.send(err);

			res.json({ "aaData": dairyRecords });
		});
	});

// on routes that end in /dairy-records/:dairyRecord_id
// ----------------------------------------------------
router.route('/company/:id/dairy-record/:dairyRecord_id')

	// get the dairyRecord with that id
	.get(function (req, res) {
		DairyRecord.findById(req.params.dairyRecord_id, function (err, dairyRecord) {
			if (err)
				res.send(err);
			res.json(dairyRecord);
		});
	})

	// update the dairyRecord with this id
	.put(function (req, res) {
		DairyRecord.findById(req.params.dairyRecord_id, function (err, dairyRecord) {

			if (err)
				res.send(err);

			dairyRecord.animalId = req.body.animalId;  // set the dairyRecords name (comes from the request)
			dairyRecord.date = req.body.date;  // set the dairyRecords name (comes from the request)
			dairyRecord.weight = req.body.weight;  // set the dairyRecords name (comes from the request)
			dairyRecord.companyId = req.body.companyId;  // set the dairyRecords name (comes from the request)
			//dairy-record.updatedOn = Date.now;

			if (req.body.active !== null && req.body.active !== undefined) {
				dairyRecord.active = req.body.active;
			}
			if (req.body.deleted !== null && req.body.deleted !== undefined) {
				dairyRecord.deleted = req.body.deleted;
			}

			dairyRecord.save(function (err) {
				if (err)
					res.send(err);

				res.json({ message: 'DairyRecord updated!' });
			});

		});
	})

	// delete the dairyRecord with this id
	.delete(function (req, res) {
		DairyRecord.findById(req.params.dairyRecord_id, function (err, dairyRecord) {

			if (err)
				res.send(err);

			//dairy-record.updatedOn = Date.now;
			dairyRecord.deleted = true;

			dairyRecord.save(function (err) {
				if (err)
					res.send(err);

				res.json({ message: 'DairyRecord deleted!' });
			});

		});
	});

module.exports = router;