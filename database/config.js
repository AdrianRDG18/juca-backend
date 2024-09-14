const { default: mongoose } = require("mongoose");

const dbConnection = async() => {
    try {
        await mongoose.connect( process.env.DB_HOST + process.env.DB_NAME, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('DB online');
    } catch (error) {
        console.log(error);
        throw new Error('Something went wrong trying connect DB');
    }
}

module.exports = {
    dbConnection
}