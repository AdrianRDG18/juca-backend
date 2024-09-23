/**
 * Path /api/login
 */

const { Router } = require('express');
const { loginMethod } = require('../controllers/auth.controller');
const { check } = require('express-validator');
const { fieldsValidation } = require('../middlewares/fields-validation');

const router = Router();

router.post('/', [
    check('email', 'The Email is required').not().isEmpty(),
    check('password', 'The password is required').not().isEmpty(),
    fieldsValidation
], loginMethod);

module.exports = router;