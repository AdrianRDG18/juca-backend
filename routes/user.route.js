/**
 * Route: /api/users
 */

const { Router } = require('express');
const { createUser, getUsers } = require('../controllers/user.controller');
const { fieldsValidation } = require('../middlewares/fields-validation');
const { check } = require('express-validator');
const { jwtValidation } = require('../middlewares/jwt-validation');
const { isAdmin } = require('../middlewares/admin-validation');

const router = Router();

//User routes
router.post('/', [
    check('name', 'The name is required').not().isEmpty(),
    check('email', 'The email is required').not().isEmpty(),
    check('password', 'The password is required').not().isEmpty(),
    check('role', 'The role is required').not().isEmpty(),
    fieldsValidation
], createUser);

router.get('/', [
    jwtValidation,
    isAdmin
], getUsers)

module.exports = router;