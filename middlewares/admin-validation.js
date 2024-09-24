const User = require('../models/user.model');

const isAdmin = async (request, response, next) => {
    try {

        const user = await User.findById(request.uid);

        if(!user){
            return response.status(404).json({
                ok: false,
                msg: 'User not found'
            });
        }

        if(user.role !== 'ADMIN_ROLE'){
            return response.status(403).json({
                ok: 'false',
                msg: 'The user must be admin'
            });
        }

        next();

    } catch (error) {
        console.log(error);
        response.status(500).json({
            ok: false,
            error
        });
    }
}

module.exports = { isAdmin };