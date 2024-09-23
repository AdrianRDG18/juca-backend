const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateJWT = ( uid ) => {

    //Create a promise to handle the async process
    return new Promise( (resolve, reject) => {

        //The info that want to save in JWT
        const payload = { uid };

        jwt.sign( payload, process.env.JWT_SECRET, {
            expiresIn: '12h'
        }, (err, token) => {
            if(err){
                console.log(err);
                reject("Something was wrong to JWT generation");
            }else{
                resolve(token);
            }
        });
    });
}

module.exports = {
    generateJWT
}