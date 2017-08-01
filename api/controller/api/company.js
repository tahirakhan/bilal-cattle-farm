var express = require('express');
var router = express.Router();

var Company = require('../../models/Company');

// on routes that end in /companys
// ----------------------------------------------------
router.route('/company')

	// create a company (accessed at POST http://localhost:8080/companys)
	.post(function(req, res) {
		
		var company = new Company();		// create a new instance of the Company model
		company.companyName = req.body.companyName;  // set the companys name (comes from the request)

		company.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Company created!' });
		});

		
	})

	// get all the companys (accessed at GET http://localhost:8080/api/companys)
	.get(function(req, res) {
		Company.find(function(err, companys) {
			if (err)
				res.send(err);

			res.json(companys);
		});
	});

// on routes that end in /companys/:company_id
// ----------------------------------------------------
router.route('/company/:company_id')

	// get the company with that id
	.get(function(req, res) {
		Company.findById(req.params.company_id, function(err, company) {
			if (err)
				res.send(err);
			res.json(company);
		});
	})

	// update the company with this id
	.put(function(req, res) {
		Company.findById(req.params.company_id, function(err, company) {

			if (err)
				res.send(err);

            company.companyName = req.body.companyName;
            //company.updatedOn = Date.now;

            if (req.body.active !== null  && req.body.active !== undefined ) {
                company.active = req.body.active;         
            }
            if (req.body.deleted !== null && req.body.deleted !== undefined) {
                company.deleted = req.body.deleted;         
            } 

			company.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Company updated!' });
			});

		});
	})

	// delete the company with this id
	.delete(function(req, res) {
		Company.findById(req.params.company_id, function(err, company) {

			if (err)
				res.send(err);

            //company.updatedOn = Date.now;
            company.deleted = true;         
             

			company.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Company deleted!' });
			});

		});
    });
    
    module.exports  = router;