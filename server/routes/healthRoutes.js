const express = require('express');
const router = express.Router();
const healthController = require('../controllers/healthController');

router.get('/', healthController.getAllHealthRecords);
router.get('/:id', healthController.getHealthRecordById);
router.post('/', healthController.createHealthRecord);
router.delete('/:id', healthController.deleteHealthRecord);

module.exports = router;
