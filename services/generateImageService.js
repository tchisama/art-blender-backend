exports.generateImage = async (imageData) => {
         const image = await openai.images.generate({ 
             model: "dall-e-3", 
             prompt: "Immerse me in a fantasy world by generating an image that includes [ a big tree in the background with a lot of flowers and a huge clouds in the sky].", 
         });

        console.log(image.data);
    return image.data;
};