// controllers/generateImageController.js
const { modules } = require('../config/modulesData');
const { openai } = require('../config/openAi');
const generateImageService = require('../services/generateImageService');
const axios = require('axios');
const fs = require('fs');
const { uploadImage } = require('../services/uploadToGoogleCloudStorage');
const { GeneratedImage } = require('../models/generatedImageSchema');
const test = false

exports.generateImage = async (req, res) => {
    const { prompt , n , size , model,dallev,userId } = req.body;
    try{
        var image;
        if(test){
          image = {
              data:[
                  {
                    revised_prompt: 'CCreate an illustration inspired by the vibrant energy of Japanese manga, featuring a charming feline with soft fur and sparkling eyes cheerfully leaping to engage in playful dynamics with a lively avian creature. The scene is set against a backdrop of an enchanting forest brimming with lush foliage. In the air, soft pink sakura petals are gently swirling, adding to the ethereal atmosphere. The cat and the bird are showing a playful camaraderie, their actions filled with mutual respect and care, capturing a beautiful interaction often seen in friendships of unusual pairs.reate an illustration inspired by the vibrant energy of Japanese manga, featuring a charming feline with soft fur and sparkling eyes cheerfully leaping to engage in playful dynamics with a lively avian creature. The scene is set against a backdrop of an enchanting forest brimming with lush foliage. In the air, soft pink sakura petals are gently swirling, adding to the ethereal atmosphere. The cat and the bird are showing a playful camaraderie, their actions filled with mutual respect and care, capturing a beautiful interaction often seen in friendships of unusual pairs.',
                    url: 'https://firebasestorage.googleapis.com/v0/b/alamiphotography-b75a1.appspot.com/o/img-wPP4vtqYZf6qOnJVM5ABFOHa.png?alt=media&token=e617b941-c62b-43e8-9036-9f446138541e'    
                  },
                ]
          }
        }else{

          image = await openai.images.generate({ 
              model: dallev, 
              prompt: modules[model].prompt.replace(/PROMPT/g, prompt), 
              n: n,
              size: size
          });

        }

        // // console.log(image.data);
        new Promise(async (resolve, reject) => {
          const imagesUrls = [];
          try {
              await Promise.all(image.data.map(async (element) => {
                  const id = Math.floor(Math.random() * 1000000000);
                  await downloadImage(element.url, "./demo/" + id + ".png");
                  const url = await uploadImage("./demo/" + id + ".png", id + ".png");
                  imagesUrls.push(url);
              }));
      
              resolve(imagesUrls);
          } catch (error) {
              reject(error);
          }
      }).then((ress) => {
          console.log(ress);
          const newGeneratedImage = new GeneratedImage({
              results: image.data.map((img, i) => ({
                  prompt: img.revised_prompt,
                  url: ress[i]
              })),
              userId,
              model,
              prompt,
              size,
              n,
              dallev,
          });
      
          newGeneratedImage.save().then((saved) => {
              res.json({
                  data: saved.results
              });
          });
      }).catch((error) => {
          // Handle errors here
          console.error(error);
      });



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
 
  

  exports.getGeneratedImages = async (req, res) => {
    const { userId } = req.body;
    try {
      const generatedImages = await GeneratedImage.find({ userId }).sort({
        createdAt: -1,
      });
      res.status(200).json(generatedImages);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }