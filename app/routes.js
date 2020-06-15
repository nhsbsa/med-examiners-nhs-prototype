// External dependencies
const express = require('express');
const router = express.Router();


// Start folder specific routes
router.use('/alpha', require('./views/alpha/_routes'));
// current sprint, remember to add older sprint when adding a new folder!
router.use('/current', require('./views/current/_routes'));

// Add your routes here - above the module.exports line
module.exports = router;
