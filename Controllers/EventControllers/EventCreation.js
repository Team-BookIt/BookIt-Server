const cloudinary = require('cloudinary').v2;
const { createEvent } = require('../../SQL/EventQueries/CreateEvent');
const { findByAttribute } = require('../../SQL/AuthQueries/FindExistingEntity');
const { addEventCategories } = require('../../SQL/EventQueries/AddEventCategories');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports.EventCreation = async (req, res) => {
    try {
        const { eventDetails, organizerID, eventCategories } = req.body;

        const existingOrganizer = await findByAttribute("organizer", "id", organizerID);

        if (!existingOrganizer.length) {
            console.log("Organizer not found", organizerID);
            res.send({ message: "No organizer found" });
            return;
        }

        // Handle image uploading
        const image = req.file;
        if (!image) {
            res.status(400).send({ message: 'Image file is required' });
            return;
        }

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

        const uploadedImageData = await uploadImageToCloudinary(image);
        
        let eventData = JSON.parse(eventDetails);
        eventData.additionalEventDetails.image = uploadedImageData.url;

        console.log("Event data: ", eventData);

        const successfulEventCreation = await createEvent(eventData, organizerID);

        console.log("Event creation successful", successfulEventCreation);


        if (eventCategories) {
            let parsedEventCategories = eventCategories;

            if(!Array.isArray(eventCategories)) {
                parsedEventCategories = JSON.parse(eventCategories);
            }

            const eventID = successfulEventCreation.id;
            const response = await addEventCategories(eventID, parsedEventCategories);

            console.log(response);
        }

        res.status(200).send({
            message: "Event created successfully",
            event: successfulEventCreation
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal server error' });
        throw error;
    }
}
