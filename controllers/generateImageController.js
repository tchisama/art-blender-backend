// controllers/generateImageController.js
const { modules } = require('../config/modulesData');
const { openai } = require('../config/openAi');
const generateImageService = require('../services/generateImageService');

exports.generateImage = async (req, res) => {
    const { prompt , n , size , model } = req.body;
    try{
        // const image = await openai.images.generate({ 
        //     model: "dall-e-3", 
        //     prompt: modules[model].prompt.replace(/PROMPT/g, prompt), 
        //     n: n,
        //     size: size
        // });

        // console.log(image.data);
        const image = {
            data:[
                {
                  revised_prompt: 'CCreate an illustration inspired by the vibrant energy of Japanese manga, featuring a charming feline with soft fur and sparkling eyes cheerfully leaping to engage in playful dynamics with a lively avian creature. The scene is set against a backdrop of an enchanting forest brimming with lush foliage. In the air, soft pink sakura petals are gently swirling, adding to the ethereal atmosphere. The cat and the bird are showing a playful camaraderie, their actions filled with mutual respect and care, capturing a beautiful interaction often seen in friendships of unusual pairs.reate an illustration inspired by the vibrant energy of Japanese manga, featuring a charming feline with soft fur and sparkling eyes cheerfully leaping to engage in playful dynamics with a lively avian creature. The scene is set against a backdrop of an enchanting forest brimming with lush foliage. In the air, soft pink sakura petals are gently swirling, adding to the ethereal atmosphere. The cat and the bird are showing a playful camaraderie, their actions filled with mutual respect and care, capturing a beautiful interaction often seen in friendships of unusual pairs.',
                  url: 'https://firebasestorage.googleapis.com/v0/b/alamiphotography-b75a1.appspot.com/o/img-UjKsI6nFA6il3dOwvkFysQXZ.png?alt=media&token=d0ead8e2-915f-4bd5-808c-d74e67e25566'    
                },
                {
                  revised_prompt: 'CCreate an illustration inspired by the vibrant energy of Japanese manga, featuring a charming feline with soft fur and sparkling eyes cheerfully leaping to engage in playful dynamics with a lively avian creature. The scene is set against a backdrop of an enchanting forest brimming with lush foliage. In the air, soft pink sakura petals are gently swirling, adding to the ethereal atmosphere. The cat and the bird are showing a playful camaraderie, their actions filled with mutual respect and care, capturing a beautiful interaction often seen in friendships of unusual pairs.reate an illustration inspired by the vibrant energy of Japanese manga, featuring a charming feline with soft fur and sparkling eyes cheerfully leaping to engage in playful dynamics with a lively avian creature. The scene is set against a backdrop of an enchanting forest brimming with lush foliage. In the air, soft pink sakura petals are gently swirling, adding to the ethereal atmosphere. The cat and the bird are showing a playful camaraderie, their actions filled with mutual respect and care, capturing a beautiful interaction often seen in friendships of unusual pairs.',
                  url: 'https://firebasestorage.googleapis.com/v0/b/alamiphotography-b75a1.appspot.com/o/img-UjKsI6nFA6il3dOwvkFysQXZ.png?alt=media&token=d0ead8e2-915f-4bd5-808c-d74e67e25566'    
                },
              ]
        }
        
        res.json(
            {
                data:image.data.map(img=>{
                    return ({url:img.url,prompt:img.revised_prompt})
                })
            }
        );

    }catch(err){
        console.log(err);
    }
};