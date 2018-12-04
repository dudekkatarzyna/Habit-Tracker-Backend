const express = require('express');
const router = express.Router();

const category_controller = require('../controllers/category');

router.get('/details/:id', category_controller.category_details);
router.post('/create', category_controller.category_create);

module.exports = router;