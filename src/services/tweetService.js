import { Filter } from "bad-words"
import { createTweet as createTweetRepository, 
         getTweets as getTweetsRepository,
         getTweetById as getTweetByIdRepository,
         deleteTweet as deleteTweetRepository,
         updateTweet as updateTweetRepository
       } from "../repositories/tweetRepository.js";

export const createTweet = async ({ body, image }) => {
    //try to find blocked words in the tweet
    //if any don`t create the tweet and return an error

    const filter = new Filter();

    if(filter.isProfane(body)){
        console.log(body);
        console.log(filter.clean(body));
        throw {
            message: "Tweet contains blocked words",
            status: 400
        }
    }

    const tweet = await createTweetRepository({ body, image });

    return tweet;

}

export const getTweets = async () => {
    const tweets = await getTweetsRepository();
    return tweets;
}

export const getTweetById = async (id) => {
    //try to find the tweet
    const tweet = await getTweetByIdRepository(id);
    //if not found return an error

    if(!tweet){
        throw {
            message: "Tweet not found",
            status: 404
        };
    }
    return tweet;
}

export const deleteTweet = async (id) => {
    //try to find the tweet
    const response = await deleteTweetRepository(id);
    

    //if not found return an error

    if(!response){
        throw {
            message: "Tweet not found",
            status: 404
        };
    }
    return response;
}

export const updateTweet = async (id, body) => {
    //try to find the tweet
    const response = await updateTweetRepository(id, body);
    //if not found return an error

    if(!response){
        throw {
            message: "Tweet not found",
            status: 404
        };
    }

    // const updatedTweet = await Tweet.findByIdAndUpdate(id, {body}, { new: true });
    return response;
}