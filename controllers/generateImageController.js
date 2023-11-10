// controllers/generateImageController.js
const generateImageService = require('../services/generateImageService');

exports.generateImage = async (req, res) => {
    try{
        // const image = await openai.images.generate({ 
        //     model: "dall-e-3", 
        //     prompt: "Immerse me in a fantasy world by generating an image that includes [ a big tree in the background with a lot of flowers and a huge clouds in the sky].", 
        // });

        // console.log(image.data);
        
        console.log("it's working fine")
        res.json({message:req.body});
    }catch(err){
        console.log(err);
    }
};