const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadImageToCloudinary = (image) => {
    return new Promise((resolve, reject) => {
        const { originalname, mimetype, buffer } = image;

        cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
            if (error) return reject(error);

            const { public_id, secure_url } = result;
            const url = cloudinary.url(public_id, {
                width: 650,
                height: 450,
                crop: "fill"
            });

            resolve({
                name: originalname,
                type: mimetype,
                url: secure_url,
                public_id: public_id
            });
        }).end(buffer);
    });
};

module.exports = uploadImageToCloudinary;
