var express = require('express');
var router = express.Router();



// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('Shirt', { title: 'Search Results Shirts' });
// });

// module.exports = router;



const shirt_controlers= require('../controllers/shirt');

// A little function to check if we have an authorized user and continue on
//or
// redirect to login.
const secured = (req, res, next) => {
if (req.user){
return next();
}
req.session.returnTo = req.originalUrl;
res.redirect("/login");
}

/* GET costumes */
router.get('/', shirt_controlers.shirt_view_all_Page );

/* GET detail costume page */
router.get('/detail', shirt_controlers.shirt_view_one_Page);

/* GET create costume page */
router.get('/create', shirt_controlers. shirt_create_Page);

/* GET create update page */
router.get('/update',secured ,shirt_controlers.shirt_update_Page);

/* GET delete costume page */
router.get('/delete', shirt_controlers.shirt_delete_Page);

module.exports = router;