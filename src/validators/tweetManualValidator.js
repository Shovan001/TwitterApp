import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";

export const createTweetManualValidator = (req, res, next) => {
    if (!req.body.tweet) {
        return res.status(400).json({
            error: 'tweet is required'
        });
    }

    if (req.body.tweet.length > 280) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: 'tweet cannot be more than 280 characters',
            success: false
        });
    }
    next();
}

export const getTweetByIdManualValidator = (req, res, next) => {
  const isValidId = mongoose.Types.ObjectId.isValid(req.params.id); 
    if (!isValidId) {
        return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Invalid tweet id"
        });
    } 

    next();
}
