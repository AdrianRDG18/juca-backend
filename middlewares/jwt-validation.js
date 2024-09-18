const jwt = require('jsonwebtoken');

const jwtValidation = ( request, response, next ) => {

    const token = request.header('x-token');

    if(!token){
        return response.status(401).json({
            ok: false,
            msg: 'Token is required'
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        request.uid = uid;
        next();
    } catch(error) {
        return response.status(401).json({
            ok: false,
            msg: 'Invalid token'
        });
    }
};

module.exports = {
    jwtValidation
}