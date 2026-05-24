const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');

// GET /api/news/:countryCode
router.get('/:countryCode', newsController.getNews);

module.exports = router;
