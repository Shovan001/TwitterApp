import { StatusCodes } from "http-status-codes";
import { createTweet as createTweetService,
         getTweets as getTweetsService, 
         getTweetById as getTweetByIdService,
         deleteTweet as deleteTweetService,
         updateTweet as updateTweetService
         } from "../services/tweetService.js";


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
        return res.status(StatusCodes.CREATED).json({
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
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
            message: "Internal server error",
            success: false

        });
    }
}

export const getTweets = async (req, res) => {
    try {
        const response = await getTweetsService();
        return res.status(StatusCodes.OK).json({
            success: true,
            data: response,
            message: "Tweets fetched successfully"

        });
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
            message: "Internal server error",
            success: false
        });
    }
}

export const getTweetById = async (req, res) => {
    try {
        const response = await getTweetByIdService(req.params.id);
        return res.status(StatusCodes.OK).json({
            success: true,
            data: response,
            message: "Tweet fetched successfully"

        });
    } catch (error) {
        console.log(error);
        if(error.status){
            return res.status(error.status).json({ 
                message: error.message,
                success: false

            });
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
            message: "Internal server error",
            success: false

        });
    }
}

export const deleteTweet = async (req, res) => {
    try{
        const response = await deleteTweetService(req.params.id);
        return res.status(StatusCodes.OK).json({
            success: true,
            data: response,
            message: "Tweet deleted successfully"
        });

    }catch(error){
        if(error.status){
            return res.status(error.status).json({ 
                message: error.message,
                success: false

            });
        }
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
            message: "Internal server error",
            success: false
        });
    }
};

export const updateTweet = async (req, res) => {
    try{
        const response = await updateTweetService(req.params.id, req.body.body);
        return res.status(StatusCodes.OK).json({
            success: true,
            data: response,
            message: "Tweet updated successfully"
        });

    }catch(error){
        if(error.status){
            return res.status(error.status).json({ 
                message: error.message,
                success: false

            });
        }
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
            message: "Internal server error",
            success: false
        });
    }
};