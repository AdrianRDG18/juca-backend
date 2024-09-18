const { Schema, model } = require('mongoose');
const mongosePaginate = require('mongoose-paginate-v2');

const UserSchema = Schema({
    name: {
        type: String,
        required: [
            true, 'The email is required'
        ]
    },
    email: {
        type: String,
        required: [
            true, 'The email is required'
        ]
    },
    password: {
        type: String,
        required: [
            true, 'The password is required'
        ]
    },
    image: {
        type: String
    },
    role: {
        type: String,
        required: [
            true, 'The role is required'
        ],
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: 'ACTIVE'
    }
});

// Remove __v and password from the object & convert _id to uid
UserSchema.method('toJSON', function(){
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

UserSchema.plugin(mongosePaginate);

module.exports = model('User', UserSchema);
