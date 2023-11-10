// controllers/generateImageController.js
const { modules } = require('../config/modulesData');
const { openai } = require('../config/openAi');
const generateImageService = require('../services/generateImageService');
const axios = require('axios');
const fs = require('fs');

exports.generateImage = async (req, res) => {
    const { prompt , n , size , model,dallev } = req.body;
    try{
        const image = await openai.images.generate({ 
            model: dallev, 
            prompt: modules[model].prompt.replace(/PROMPT/g, prompt), 
            n: n,
            size: size
        });

        // // console.log(image.data);
        // const image = {
        //     data:[
        //         {
        //           revised_prompt: 'CCreate an illustration inspired by the vibrant energy of Japanese manga, featuring a charming feline with soft fur and sparkling eyes cheerfully leaping to engage in playful dynamics with a lively avian creature. The scene is set against a backdrop of an enchanting forest brimming with lush foliage. In the air, soft pink sakura petals are gently swirling, adding to the ethereal atmosphere. The cat and the bird are showing a playful camaraderie, their actions filled with mutual respect and care, capturing a beautiful interaction often seen in friendships of unusual pairs.reate an illustration inspired by the vibrant energy of Japanese manga, featuring a charming feline with soft fur and sparkling eyes cheerfully leaping to engage in playful dynamics with a lively avian creature. The scene is set against a backdrop of an enchanting forest brimming with lush foliage. In the air, soft pink sakura petals are gently swirling, adding to the ethereal atmosphere. The cat and the bird are showing a playful camaraderie, their actions filled with mutual respect and care, capturing a beautiful interaction often seen in friendships of unusual pairs.',
        //           url: 'https://firebasestorage.googleapis.com/v0/b/alamiphotography-b75a1.appspot.com/o/img-wPP4vtqYZf6qOnJVM5ABFOHa.png?alt=media&token=e617b941-c62b-43e8-9036-9f446138541e'    
        //         },
        //       ]
        // }
        
        
        image.data.forEach(element => {
            downloadImage(element.url,"./demo/"+Math.floor(Math.random()*10000000)+".png");
        });

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



async function downloadImage(imageUrl,outputPath) {
    try {
      const response = await axios({
        method: 'GET',
        url: imageUrl,
        responseType: 'stream',
      });
  
      // Pipe the image data to a file stream
      response.data.pipe(fs.createWriteStream(outputPath));
  
      // Wait for the file stream to finish writing
      await new Promise((resolve, reject) => {
        response.data.on('end', resolve);
        response.data.on('error', reject);
      });
  
      console.log(`Image downloaded to ${outputPath}`);
    } catch (error) {
      console.error('Error downloading image:', error.message);
    }
  }
  