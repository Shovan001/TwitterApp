import { StatusCodes } from "http-status-codes";
import { createTweet as createTweetService,
         getTweets as getTweetsService, 
         getTweetById as getTweetByIdService,
         deleteTweet as deleteTweetService,
         updateTweet as updateTweetService
         } from "../services/tweetService.js";
import { errorResponse, successResponse } from "../utils/responses.js";


export const createTweet = async (req, res) => {
    console.log(req.file);
    try {
        const response = await createTweetService({
            body: req.body.body,
            image: req.file?.location
        });
        return successResponse(res, response, StatusCodes.CREATED, "Tweet created successfully");
        
    } catch (error) {
        return errorResponse(error);
    }
}

export const getTweets = async (req, res) => {
    try {
        const response = await getTweetsService();
        return successResponse (res, response, StatusCodes.OK, "Tweets fetched successfully");
    } catch (error) {
        return errorResponse(error);
    }
}

export const getTweetById = async (req, res) => {
    try {
        const response = await getTweetByIdService(req.params.id);
        return successResponse (res, response, StatusCodes.OK, "Tweet fetched successfully");
    } catch (error) {
        return errorResponse(error);
    }
}

export const deleteTweet = async (req, res) => {
    try{
        const response = await deleteTweetService(req.params.id);
        return successResponse(res, response, StatusCodes.OK, "Tweet deleted successfully");

    }catch(error){
        return errorResponse(error);
    }
};

export const updateTweet = async (req, res) => {
    try{
        const response = await updateTweetService(req.params.id, req.body.body);
        return successResponse(res, response, StatusCodes.OK, "Tweet updated successfully");

    }catch(error){
        return errorResponse(error);
    }
};