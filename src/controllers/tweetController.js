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

export const createTweet = async (req, res) => {
    return res.json({ 
        message: "Tweet created" ,
        body: req.body
    });
}