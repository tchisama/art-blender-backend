const { openai } = require('../config/openAi');
exports.createPrompt = async (req, res) => {
    try {
    const completion = await openai.chat.completions.create({
        messages: [{"role": "system", "content": "Generate an engaging prompt for the AI image generator based on the given module name. Craft a creative and intriguing request within 40 words."},
        {"role": "user", "content": req.body.module},
     ],
     model:"gpt-3.5-turbo",
    })
    res.stats(200).json({prompt: completion.choices[0].message.content??""})
    }catch(err){
        console.log(err);
        res.status(500).json({prompt:""})
    }
}