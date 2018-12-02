const express = require('express');
const router = express.Router();

const hpu_controller = require('../controllers/habitsPerUser');

module.exports = router;

router.post('/create', hpu_controller.hpu_create);

router.get('/details/:id', hpu_controller.hpu_details);

router.get('/habitsList', hpu_controller.hpu_list);

router.put('/:id/update', hpu_controller.hpu_update);

router.delete('/:id/delete', hpu_controller.hpu_delete);