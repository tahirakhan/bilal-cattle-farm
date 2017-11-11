var express = require('express');
var router = express.Router();

var ExpenseDetail = require('../../models/ExpenseDetail');

// on routes that end in /expense-details
// ----------------------------------------------------
router.route('/company/:id/expense-detail')

	// create aexpenseDetail (accessed at POST http://localhost:8080/expense-details)
	.post(function (req, res) {

		var expenseDetail = new ExpenseDetail();		// create a new instance of the ExpenseDetail model
		
		expenseDetail.expenseDescription = req.body.expenseDescription;
		expenseDetail.productId = req.body.productId;
		expenseDetail.animalId = req.body.animalId;
		expenseDetail.expenseId = req.body.expenseId;
		expenseDetail.expenseTypeId = req.body.expenseTypeId;
		expenseDetail.quantity = req.body.quantity;
		expenseDetail.amount = req.body.amount;
		expenseDetail.total = req.body.total;
		expenseDetail.companyId = req.body.companyId;  // set theexpenseDetails name (comes from the request)

		expenseDetail.save(function (err) {
			if (err)
				res.send(err);

			res.json({ message: 'ExpenseDetail created!' });
		});


	})

	// get all theexpenseDetails (accessed at GET http://localhost:8080/api/expense-details)
	.get(function (req, res) {
		ExpenseDetail.find({ deleted: false, companyId: req.params.id }, function (err,expenseDetails) {
			if (err)
				res.send(err);

			res.json({ "aaData":expenseDetails });
		});
	});

// on routes that end in /expense-details/:expense_id
// ----------------------------------------------------
router.route('/company/:id/expense-detail/:expense_id')

	// get theexpenseDetail with that id
	.get(function (req, res) {
		ExpenseDetail.findById(req.params.expense_id, function (err,expenseDetail) {
			if (err)
				res.send(err);
			res.json(expenseDetail);
		});
	})

	// update theexpenseDetail with this id
	.put(function (req, res) {
		ExpenseDetail.findById(req.params.expense_id, function (err,expenseDetail) {

			if (err)
				res.send(err);

			console.log('test '+ expenseDetail.amount);
				expenseDetail.expenseDescription = req.body.expenseDescription;
				expenseDetail.productId = req.body.productId;
				expenseDetail.animalId = req.body.animalId;
				expenseDetail.expenseId = req.body.expenseId;
				expenseDetail.expenseTypeId = req.body.expenseTypeId;
				expenseDetail.quantity = req.body.quantity;
				expenseDetail.amount = req.body.amount;
				expenseDetail.total = req.body.total;	

				expenseDetail.companyId = req.body.companyId;  // set theexpenseDetails name (comes from the request)
			//expense-detail.updatedOn = Date.now;

			if (req.body.active !== null && req.body.active !== undefined) {
				expenseDetail.active = req.body.active;
			}
			if (req.body.deleted !== null && req.body.deleted !== undefined) {
				expenseDetail.deleted = req.body.deleted;
			}

			expenseDetail.save(function (err) {
				if (err)
					res.send(err);

				res.json({ message: 'ExpenseDetail updated!' });
			});

		});
	})

	// delete theexpenseDetail with this id
	.delete(function (req, res) {
		ExpenseDetail.findById(req.params.expense_id, function (err,expenseDetail) {

			if (err)
				res.send(err);

			//expense-detail.updatedOn = Date.now;
			expenseDetail.deleted = true;

			expenseDetail.save(function (err) {
				if (err)
					res.send(err);

				res.json({ message: 'ExpenseDetail deleted!' });
			});

		});
	});

	router.route('/company/:id/expense-detail/expense/:expense_id')

	// get theexpenseDetail with that id
	.get(function (req, res) {
		ExpenseDetail.find({ deleted: false, companyId: req.params.id, expenseId: req.params.expense_id }, function (err,expenseDetail) {
			if (err)
				res.send(err);
			res.json({ "aaData":expenseDetail });
		});
	})
module.exports = router;