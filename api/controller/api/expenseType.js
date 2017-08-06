var express = require('express');
var router = express.Router();

var ExpenseType = require('../../models/ExpenseType');

// on routes that end in /expenseTypes
// ----------------------------------------------------
router.route('/company/:id/expense-type')

	// create a expenseType (accessed at POST http://localhost:8080/expenseTypes)
	.post(function(req, res) {
		
		var expenseType = new ExpenseType();		// create a new instance of the ExpenseType model
		expenseType.expenseTypeName = req.body.expenseTypeName;  // set the expenseTypes name (comes from the request)
		expenseType.companyId = req.body.companyId;  // set the expenseTypes name (comes from the request)

		expenseType.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'ExpenseType created!' });
		});

		
	})

	// get all the expenseTypes (accessed at GET http://localhost:8080/api/expenseTypes)
	.get(function(req, res) {
		ExpenseType.find({deleted:false,companyId:req.params.id},function(err, expenseTypes) {
			if (err)
				res.send(err);

			res.json({ "aaData":expenseTypes});
		});
	});

// on routes that end in /expenseTypes/:expenseType_id
// ----------------------------------------------------
router.route('/company/:id/expense-type/:expenseType_id')

	// get the expenseType with that id
	.get(function(req, res) {
		ExpenseType.findById(req.params.expenseType_id, function(err, expenseType) {
			if (err)
				res.send(err);
			res.json(expenseType);
		});
	})

	// update the expenseType with this id
	.put(function(req, res) {
		ExpenseType.findById(req.params.expenseType_id, function(err, expenseType) {

			if (err)
				res.send(err);

		expenseType.expenseTypeName = req.body.expenseTypeName;  // set the expenseTypes name (comes from the request)
		expenseType.companyId = req.body.companyId;  // set the expenseTypes name (comes from the request)
            //expenseType.updatedOn = Date.now;

            if (req.body.active !== null  && req.body.active !== undefined ) {
                expenseType.active = req.body.active;         
            }
            if (req.body.deleted !== null && req.body.deleted !== undefined) {
                expenseType.deleted = req.body.deleted;         
            } 

			expenseType.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'ExpenseType updated!' });
			});

		});
	})

	// delete the expenseType with this id
	.delete(function(req, res) {
		ExpenseType.findById(req.params.expenseType_id, function(err, expenseType) {

			if (err)
				res.send(err);

            //expenseType.updatedOn = Date.now;
            expenseType.deleted = true;         
             
			expenseType.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'ExpenseType deleted!' });
			});

		});
    });
    
    module.exports  = router;