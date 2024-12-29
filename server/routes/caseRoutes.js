// server/routes/caseRoutes.js

const express = require('express');
const caseController = require('../controllers/caseController');
const router = express.Router();

// Case routes
router.route('/').get(caseController.getCases).post(caseController.createCase);

router
    .route('/:id')
    .get(caseController.getCase)
    .patch(caseController.updateCase)
    .delete(caseController.deleteCase);

// Custom fields routes
router
    .route('/custom-fields')
    .get(caseController.getCustomFields)
    .post(caseController.addCustomField);

router.route('/custom-fields/:id').delete(caseController.deleteCustomField);

module.exports = router;
