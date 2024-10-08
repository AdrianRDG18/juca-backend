/**
 * Path: /api/images
 */

const { Router } = require('express');
//Middleware to validate if there are files in the request
const fileUpload = require('express-fileupload');

const { jwtValidation } = require('../middlewares/jwt-validation');
const { check } = require('express-validator');
const { fieldsValidation } = require('../middlewares/fields-validation');
const { uploadImage, getImage } = require('../controllers/image.controller')

const router = Router();
router.use(fileUpload());

router.post('/:collection/:element_id', [
    jwtValidation,
    check('element_id', 'The element_id mus be a valid id').isMongoId(),
    fieldsValidation
], uploadImage);

router.get('/:key',[
    jwtValidation,
    check('key', 'The file key is required').notEmpty(),
    fieldsValidation
], getImage);

module.exports = router;