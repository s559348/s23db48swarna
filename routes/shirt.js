var express = require('express');
var router = express.Router();



// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('Shirt', { title: 'Search Results Shirts' });
// });

// module.exports = router;



const shirt_controlers= require('../controllers/shirt');

/* GET costumes */
router.get('/', shirt_controlers.shirt_view_all_Page );

module.exports = router;