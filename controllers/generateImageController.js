// controllers/generateImageController.js
const { modules } = require('../config/modulesData');
const { openai } = require('../config/openAi');
const generateImageService = require('../services/generateImageService');

exports.generateImage = async (req, res) => {
    const { prompt , n , size , model } = req.body;
    try{
        const image = await openai.images.generate({ 
            model: "dall-e-3", 
            prompt: modules[model].prompt.replace(/PROMPT/g, prompt), 
            n: n,
            size: size
        });

        // console.log(image.data);
        // const image = {
        //     data:[
        //         {
        //           revised_prompt: 'Create an illustration inspired by the vibrant energy of Japanese manga, featuring a charming feline with soft fur and sparkling eyes cheerfully leaping to engage in playful dynamics with a lively avian creature. The scene is set against a backdrop of an enchanting forest brimming with lush foliage. In the air, soft pink sakura petals are gently swirling, adding to the ethereal atmosphere. The cat and the bird are showing a playful camaraderie, their actions filled with mutual respect and care, capturing a beautiful interaction often seen in friendships of unusual pairs.',
        //           url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-t2T3bCUZ8VwAm1Lm5NcM6Bxh/user-Lr31KHMo54KeQfi75qTyr2BL/img-TcCOhIFx9h3aJaF1XpN9tvzI.png?st=2023-11-10T10%3A25%3A30Z&se=2023-11-10T12%3A25%3A30Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-11-10T08%3A20%3A53Z&ske=2023-11-11T08%3A20%3A53Z&sks=b&skv=2021-08-06&sig=nE%2B6DHsFxMfUj05xj7xFLrD18JTOzgN0G573gHWH4Do%3D'    
        //         },
        //       ]
        // }
        
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