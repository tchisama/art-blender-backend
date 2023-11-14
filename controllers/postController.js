// making the post controller

const Post = require('../models/PostSchema');

const createPost = async (req, res) => {
    const { results, description: description, likes, prompt, userId, model, size, n, dallev } = req.body;

    const newPost = new Post({
        results,
        description,
        likes,
        prompt,
        userId,
        model,
        size,
        n,
        dallev
    })

    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    }catch(err){
        res.status(500).json(err);
    }
}