const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

const createUser = async (request, response) =>{
    try{
        const { email, password } = request.body;
        
        const userExist = await User.findOne({email});

        if(userExist){
            return response.status(500).json({
                ok: false,
                msg: "The user already exists"
            });
        }

        const user = await new User(request.body);

        // Encrypt pw
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt)

        // Save new pw
        await user.save();
        
        // Generate JWT
        const token = await generateJWT(user.id)

        return response.status(200).json({
            ok: true,
            msg: "User created successfully",
            user,
            token
        });

    }catch(error){
        console.log(error);
        response.status(500).json({
            ok: false,
            msg: error
        });
    }
}
module.exports = {
    createUser
}