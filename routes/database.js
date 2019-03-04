const express = require('express');
const router = express.Router();

const database_controller = require('../controllers/database');

router.get('/stats', database_controller.database_stats);
router.get('/userCount', database_controller.user_count);
router.get('/habitCount', database_controller.habit_count);
router.get('/categoryCount', database_controller.category_count);

module.exports = router;