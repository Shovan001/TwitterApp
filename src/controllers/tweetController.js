import { createTweet as createTweetService } from "../services/tweetService.js";

export const getTweets = async (req, res) => {
    return res.json({ 
        message: "Welcome to tweet router" 
    });
}

export const getTweetById = async (req, res) => {
    return res.json({ 
        message: "Tweet with id ",
        id: req.params.id 
    });
};

export const imageTweet = async (req, res) => {
    upload.single('image')(req, res, (err) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }
        next();
    });
    return res.status(200).json({
        success: true,
        message: "Image uploaded successfully"
    });
};
 

export const createTweet = async (req, res) => {
    console.log(req.file);
    try {
        const response = await createTweetService({
            body: req.body.body,
            image: req.file?.location
        });
        return res.status(201).json({
            success: true,
            data: response,
            message: "Tweet created successfully"

        });
        
    } catch (error) {
        console.log(error);
        if(error.status){
            return res.status(error.status).json({ 
                message: error.message,
                success: false

            });
        }
        return res.status(500).json({ 
            message: "Internal server error",
            success: false

        });
    }
}