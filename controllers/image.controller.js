const { uploadImageAWS, getImageAWS, deleteImageAWS } = require('../helpers/aws');
const User = require('../models/user.model');
const { v4: uuidv4 } = require('uuid');

const uploadImage = async(request, response) =>{

    const { collection, element_id } = request.params;

    try {
        // Collection must be a valid collection
        validCollection(collection);

        // Get collection data
        const collectionDB = await getCollectionData(collection, element_id);

        // The request must have a file
        imageOnRequest(request);
        const file = request.files.image;

        // Extract file type & The file must be a valid image type
        const fileType = validFileType(file);

        // Generate image id
        const fileName = `${uuidv4()}.${fileType}`;

        // Get binary data image
        const fileContent = await Buffer.from(file.data, 'binary')

        // If the collection has a image, delete it on s3
        await deleteActualImage(collectionDB);

        // Send the binary data image to s3
        const fileUploaded = await uploadImageAWS(fileContent, fileName);

        collectionDB.image = fileUploaded.key;
        await collectionDB.save();

        response.json({
            ok: true,
            key: fileUploaded.key
        });

    } catch (error) {
        console.log(error);
        response.status(400).json({
            ok: false,
            error
        });
    }
};

function validCollection(collection){

    const validCollections = ['users'];

    if(!validCollections.includes(collection)){
        throw('Collection must be a valid collection');
    }
}

function imageOnRequest(request){

    if(!request.files || Object.keys(request.files).length === 0){
        throw ('The request must have a file');
    }
}

function validFileType(file){

    const shortNames = file.name.split('.');
    const fileType = shortNames[shortNames.length -1];
    const validTypes = ['png', 'jpeg', 'jpg'];

    if(!validTypes.includes(fileType)){
        throw('The file must be a valid image type: png, jpeg, jpg');
    }
    return fileType;
}

async function getCollectionData(collection, element_id){

    let dataDB = {};

    switch(collection){

        case 'users':
            dataDB = await User.findById(element_id);
            if(!dataDB){
                throw('User not found');
            }
            return dataDB;

        default:
            throw('Collection not valid');
    }
}

async function deleteActualImage(collection){
    if(collection.image !== undefined && collection.image !== ''){
        return await deleteImageAWS(collection.image);
    }
}

const getImage = async(request, response) =>{

    const { key } = request.params;

    try {

        const result = await getImageAWS(key);

        // Handle errors
        result.on('error', (error) => {
            console.log(error);
            response.status(500).send({
                ok: false,
                msg: error.message
            });
        });

        result.pipe(response);

    } catch (error) {
        console.log(error);
        return response.status(500).json({
            ok: false,
            error
        });
    }
};

module.exports = {
    uploadImage,
    getImage
};