const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

const loginMethod = async (request, response) => {

    const {email, password} = request.body;
    const badResp = {
        ok: false,
        msg: 'Credentials are not valid'
    }

    try {
        const user = await User.findOne({email});
        if(!user){
            return response.status(404).json(badResp);
        }
        const validPW = bcrypt.compareSync(password, user.password);
        if(!validPW){
            return response.status(404).json(badResp);
        }

        const token = await generateJWT(user.id);

        response.status(200).json({
            ok: true,
            token
        });

    } catch (error) {
        console.log(error);
        response.status(500).json({
            ok: false,
            error
        });
    }

}

module.exports = {loginMethod};