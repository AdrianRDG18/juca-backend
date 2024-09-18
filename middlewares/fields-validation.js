const { validationResult } = require('express-validator');

const fieldsValidation = (request, response, next ) => {
    const  errorsValidation = validationResult(request);
    if(!errorsValidation.isEmpty()){
        return response.status(400).json({
            ok: false,
            errors: errorsValidation.mapped()
        });
    }
    next();
}

module.exports = { fieldsValidation }