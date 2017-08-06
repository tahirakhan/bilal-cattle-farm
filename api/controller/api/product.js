var express = require('express');
var router = express.Router();

var Product = require('../../models/Product');

// on routes that end in /products
// ----------------------------------------------------
router.route('/company/:id/product')

	// create a product (accessed at POST http://localhost:8080/products)
	.post(function(req, res) {
		
		var product = new Product();		// create a new instance of the Product model
		product.productName = req.body.productName;  // set the products name (comes from the request)
		product.productDescription = req.body.productDescription;
		product.productPrice = req.body.productPrice;
		product.productPer = req.body.productPer;
		product.companyId = req.body.companyId;  // set the products name (comes from the request)

		product.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Product created!' });
		});

		
	})

	// get all the products (accessed at GET http://localhost:8080/api/products)
	.get(function(req, res) {
		Product.find({deleted:false,companyId:req.params.id},function(err, products) {
			if (err)
				res.send(err);

			res.json({ "aaData":products});
		});
	});

// on routes that end in /products/:product_id
// ----------------------------------------------------
router.route('/company/:id/product/:product_id')

	// get the product with that id
	.get(function(req, res) {
		Product.findById(req.params.product_id, function(err, product) {
			if (err)
				res.send(err);
			res.json(product);
		});
	})

	// update the product with this id
	.put(function(req, res) {
		Product.findById(req.params.product_id, function(err, product) {

			if (err)
				res.send(err);

		product.productName = req.body.productName;  // set the products name (comes from the request)
		product.productDescription = req.body.productDescription;
		product.productPrice = req.body.productPrice;
		product.productPer = req.body.productPer;
		product.companyId = req.body.companyId;  // set the products name (comes from the request)
            //product.updatedOn = Date.now;

            if (req.body.active !== null  && req.body.active !== undefined ) {
                product.active = req.body.active;         
            }
            if (req.body.deleted !== null && req.body.deleted !== undefined) {
                product.deleted = req.body.deleted;         
            } 

			product.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Product updated!' });
			});

		});
	})

	// delete the product with this id
	.delete(function(req, res) {
		Product.findById(req.params.product_id, function(err, product) {

			if (err)
				res.send(err);

            //product.updatedOn = Date.now;
            product.deleted = true;         
             
			product.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Product deleted!' });
			});

		});
    });
    
    module.exports  = router;