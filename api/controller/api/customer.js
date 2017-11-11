var express = require('express');
var router = express.Router();

var Customer = require('../../models/Customer');

// on routes that end in /customers
// ----------------------------------------------------
router.route('/company/:id/customer')

	// create a customer (accessed at POST http://localhost:8080/customers)
	.post(function(req, res) {
		
		var customer = new Customer();		// create a new instance of the Customer model
		customer.customerName = req.body.customerName;  // set the customers name (comes from the request)
		customer.address = req.body.address;
		customer.phone = req.body.phone;
		customer.cnic = req.body.cnic;
		customer.lastRate = req.body.lastRate;
		customer.totalPaymentDue = req.body.totalPaymentDue;
		customer.companyId = req.body.companyId;  // set the customers name (comes from the request)

		customer.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Customer created!' });
		});

		
	})

	// get all the customers (accessed at GET http://localhost:8080/api/customers)
	.get(function(req, res) {
		Customer.find({deleted:false,companyId:req.params.id},function(err, customers) {
			if (err)
				res.send(err);

			res.json({ "aaData":customers});
		});
	});

// on routes that end in /customers/:customer_id
// ----------------------------------------------------
router.route('/company/:id/customer/:customer_id')

	// get the customer with that id
	.get(function(req, res) {
		Customer.findById(req.params.customer_id, function(err, customer) {
			if (err)
				res.send(err);
			res.json(customer);
		});
	})

	// update the customer with this id
	.put(function(req, res) {
		Customer.findById(req.params.customer_id, function(err, customer) {

			if (err)
				res.send(err);

		customer.customerName = req.body.customerName;  // set the customers name (comes from the request)
		customer.address = req.body.address;
		customer.phone = req.body.phone;
		customer.cnic = req.body.cnic;
		customer.lastRate = req.body.lastRate;
		customer.totalPaymentDue = req.body.totalPaymentDue;
		customer.companyId = req.body.companyId;  // set the customers name (comes from the request)
            //customer.updatedOn = Date.now;

            if (req.body.active !== null  && req.body.active !== undefined ) {
                customer.active = req.body.active;         
            }
            if (req.body.deleted !== null && req.body.deleted !== undefined) {
                customer.deleted = req.body.deleted;         
            } 

			customer.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Customer updated!' });
			});

		});
	})

	// delete the customer with this id
	.delete(function(req, res) {
		Customer.findById(req.params.customer_id, function(err, customer) {

			if (err)
				res.send(err);

            //customer.updatedOn = Date.now;
            customer.deleted = true;         
             
			customer.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Customer deleted!' });
			});

		});
    });
    
    module.exports  = router;