var express = require('express');
var router = express.Router();

var Expense = require('../../models/Expense');

// on routes that end in /expenses
// ----------------------------------------------------
router.route('/company/:id/expense')

	// create a expense (accessed at POST http://localhost:8080/expenses)
	.post(function (req, res) {

		var expense = new Expense();		// create a new instance of the Expense model
		
		expense.expenseDescription = req.body.expenseDescription;
		expense.expenseDate = req.body.expenseDate;
		expense.expenseTotal = req.body.expenseTotal;
		expense.companyId = req.body.companyId;  // set the expenses name (comes from the request)

		expense.save(function (err) {
			if (err)
				res.send(err);

			res.json({ message: 'Expense created!',expenseId: expense.expenseId});
		});


	})

	// get all the expenses (accessed at GET http://localhost:8080/api/expenses)
	.get(function (req, res) {
		Expense.find({ deleted: false, companyId: req.params.id }, function (err, expenses) {
			if (err)
				res.send(err);

			res.json({ "aaData": expenses });
		});
	});

// on routes that end in /expenses/:expense_id
// ----------------------------------------------------
router.route('/company/:id/expense/:expense_id')

	// get the expense with that id
	.get(function (req, res) {
		Expense.findById(req.params.expense_id, function (err, expense) {
			if (err)
				res.send(err);
			res.json(expense);
		});
	})

	// update the expense with this id
	.put(function (req, res) {
		Expense.findById(req.params.expense_id, function (err, expense) {

			if (err)
				res.send(err);

				expense.expenseDescription = req.body.expenseDescription;
				expense.expenseDate = req.body.expenseDate;
				expense.expenseTotal = req.body.expenseTotal;
				expense.companyId = req.body.companyId;  // set the expenses name (comes from the request)
			//expense.updatedOn = Date.now;

			if (req.body.active !== null && req.body.active !== undefined) {
				expense.active = req.body.active;
			}
			if (req.body.deleted !== null && req.body.deleted !== undefined) {
				expense.deleted = req.body.deleted;
			}

			expense.save(function (err) {
				if (err)
					res.send(err);

				res.json({ message: 'Expense updated!' });
			});

		});
	})

	// delete the expense with this id
	.delete(function (req, res) {
		Expense.findById(req.params.expense_id, function (err, expense) {

			if (err)
				res.send(err);

			//expense.updatedOn = Date.now;
			expense.deleted = true;

			expense.save(function (err) {
				if (err)
					res.send(err);

				res.json({ message: 'Expense deleted!' });
			});

		});
	});

module.exports = router;