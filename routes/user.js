const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user');

router.post('/create', user_controller.user_create);

router.get('/userList', user_controller.user_list);

router.get('/:id', user_controller.user_details);

router.put('/:id/update', user_controller.user_update);

router.delete('/:id/delete', user_controller.user_delete);

router.delete('/deleteHabit/:id', user_controller.user_deleteHabit);

module.exports = router;