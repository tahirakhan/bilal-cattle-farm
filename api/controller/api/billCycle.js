var express = require('express');
var router = express.Router();

var BillCycle = require('../../models/BillCycle');

// on routes that end in /billCycles
// ----------------------------------------------------
router.route('/company/:id/bill-cycle')

	// create a billCycle (accessed at POST http://localhost:8080/billCycles)
	.post(function(req, res) {
		
		var billCycle = new BillCycle();		// create a new instance of the BillCycle model
		billCycle.billCycleName = req.body.billCycleName;  // set the billCycles name (comes from the request)
		billCycle.billCycleDescription = req.body.billCycleDescription;
		billCycle.billCycleDays = req.body.billCycleDays;
		billCycle.companyId = req.body.companyId;  // set the billCycles name (comes from the request)

		billCycle.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'BillCycle created!' });
		});

		
	})

	// get all the billCycles (accessed at GET http://localhost:8080/api/billCycles)
	.get(function(req, res) {
		BillCycle.find({deleted:false,companyId:req.params.id},function(err, billCycles) {
			if (err)
				res.send(err);

			res.json({ "aaData":billCycles});
		});
	});

// on routes that end in /billCycles/:billCycle_id
// ----------------------------------------------------
router.route('/company/:id/bill-cycle/:billCycle_id')

	// get the billCycle with that id
	.get(function(req, res) {
		BillCycle.findById(req.params.billCycle_id, function(err, billCycle) {
			if (err)
				res.send(err);
			res.json(billCycle);
		});
	})

	// update the billCycle with this id
	.put(function(req, res) {
		BillCycle.findById(req.params.billCycle_id, function(err, billCycle) {

			if (err)
				res.send(err);
		
		billCycle.billCycleName = req.body.billCycleName;  // set the billCycles name (comes from the request)
		billCycle.billCycleDescription = req.body.billCycleDescription;
		billCycle.billCycleDays = req.body.billCycleDays;
		billCycle.companyId = req.body.companyId;  // set the billCycles name (comes from the request)
            //billCycle.updatedOn = Date.now;

            if (req.body.active !== null  && req.body.active !== undefined ) {
                billCycle.active = req.body.active;         
            }
            if (req.body.deleted !== null && req.body.deleted !== undefined) {
                billCycle.deleted = req.body.deleted;         
            } 

			billCycle.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'BillCycle updated!' });
			});

		});
	})

	// delete the billCycle with this id
	.delete(function(req, res) {
		BillCycle.findById(req.params.billCycle_id, function(err, billCycle) {

			if (err)
				res.send(err);

            //billCycle.updatedOn = Date.now;
            billCycle.deleted = true;         
             
			billCycle.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'BillCycle deleted!' });
			});

		});
    });
    
    module.exports  = router;