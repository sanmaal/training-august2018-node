const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	if(req.session.user){
		let data = {
			title: 'Express',
			user : req.session.user
		}
		res.render('index', data);
	} else {
		let data = {
		  	title: 'Express',
		}
		res.render('index', data);
	}
});

module.exports = router;