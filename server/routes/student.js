const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentcontroller');

// Routes
router.get('/', studentController.view);
router.post('/', studentController.find);
router.get('/addstudent', studentController.form);
router.post('/addstudent', studentController.create);
router.get('/editstudent/:id', studentController.edit);
router.post('/editstudent/:id', studentController.update);
router.get('/viewstudent/:id', studentController.viewall);
router.get('/:id',studentController.delete);
  
module.exports = router;