import express from "express";
import { createTweet, getTweetById, getTweets } from "../../controllers/tweetController.js";
//import { createTweetManualValidator } from "../../validators/tweetManualValidator.js";
import { validate } from "../../validators/zodValidators.js";
import { tweetZodSchema } from "../../validators/tweetZodSchema.js";
import { s3Uploader } from "../../config/multerConfig.js";


const router = express.Router();

router.get('/', getTweets);

router.get('/:id', getTweetById);

router.post('/', s3Uploader.single('tweetImage'), validate(tweetZodSchema), createTweet);


export default router;