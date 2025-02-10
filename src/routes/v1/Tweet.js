import express from "express";
import { createTweet, deleteTweet, getTweetById, getTweets, updateTweet } from "../../controllers/tweetController.js";
//import { createTweetManualValidator } from "../../validators/tweetManualValidator.js";
import { validate } from "../../validators/zodValidators.js";
import { tweetZodSchema } from "../../validators/tweetZodSchema.js";
import { s3Uploader } from "../../config/multerConfig.js";
import { getTweetByIdManualValidator } from "../../validators/tweetManualValidator.js";
import { authenticateToken } from "../../middlewares/authMiddleware.js";


const router = express.Router();

router.get('/', authenticateToken, getTweets);

router.get('/:id',getTweetByIdManualValidator , getTweetById);

router.post('/', s3Uploader.single('tweetImage'), validate(tweetZodSchema), createTweet);

router.delete('/:id',getTweetByIdManualValidator, deleteTweet);

router.put('/:id',getTweetByIdManualValidator, updateTweet);


export default router; 