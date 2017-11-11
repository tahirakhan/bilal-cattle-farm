var express = require('express');
var router = express.Router();

var Stock = require('../../models/Stock');

// on routes that end in /stocks
// ----------------------------------------------------
router.route('/company/:id/stock')

	// create a stock (accessed at POST http://localhost:8080/stocks)
	.post(function (req, res) {

		var stock = new Stock();		// create a new instance of the Stock model
		stock.productId = req.body.productId;  // set the stocks name (comes from the request)
		stock.quantity = req.body.quantity;  // set the stocks name (comes from the request)
		stock.companyId = req.body.companyId;  // set the stocks name (comes from the request)

		stock.save(function (err) {
			if (err)
				res.send(err);

			res.json({ message: 'Stock created!' });
		});


	})

	// get all the stocks (accessed at GET http://localhost:8080/api/stocks)
	.get(function (req, res) {
		Stock.find({ deleted: false, companyId: req.params.id }, function (err, stocks) {
			if (err)
				res.send(err);

			res.json({ "aaData": stocks });
		});
	});

// on routes that end in /stocks/:stock_id
// ----------------------------------------------------
router.route('/company/:id/stock/:stock_id')

	// get the stock with that id
	.get(function (req, res) {
		Stock.findById(req.params.stock_id, function (err, stock) {
			if (err)
				res.send(err);
			res.json(stock);
		});
	})

	// update the stock with this id
	.put(function (req, res) {
		Stock.findById(req.params.stock_id, function (err, stock) {

			if (err)
				res.send(err);

			stock.productId = req.body.productId;  // set the stocks name (comes from the request)
			stock.quantity = req.body.quantity;  // set the stocks name (comes from the request)

			stock.companyId = req.body.companyId;  // set the stocks name (comes from the request)
			//stock.updatedOn = Date.now;

			if (req.body.active !== null && req.body.active !== undefined) {
				stock.active = req.body.active;
			}
			if (req.body.deleted !== null && req.body.deleted !== undefined) {
				stock.deleted = req.body.deleted;
			}

			stock.save(function (err) {
				if (err)
					res.send(err);

				res.json({ message: 'Stock updated!' });
			});

		});
	})

	// delete the stock with this id
	.delete(function (req, res) {
		Stock.findById(req.params.stock_id, function (err, stock) {

			if (err)
				res.send(err);

			//stock.updatedOn = Date.now;
			stock.deleted = true;

			stock.save(function (err) {
				if (err)
					res.send(err);

				res.json({ message: 'Stock deleted!' });
			});

		});
	});

module.exports = router;