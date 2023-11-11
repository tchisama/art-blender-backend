const { Storage } = require('@google-cloud/storage');
const path = require('path');

// Replace 'your-project-id' and 'your-bucket-name' with your actual project ID and bucket name
const projectId = 'artblender-404811';
const bucketName = 'aiblenderstorage';
const keyFilename = "mykey.json"

// Create a new instance of the Storage class
const storage = new Storage({ projectId , keyFilename });

// Function to upload an image to Google Cloud Storage
async function uploadImage(filePath, destinationFileName) {


  try {
    const bucket = storage.bucket(bucketName);

    // Upload options
    const options = {
      destination: destinationFileName,
      metadata: {
        contentType: 'image/jpeg', // Set the content type based on your image type
      },
    };

    // Upload the file
    await bucket.upload(filePath, options);

    console.log(`Image uploaded to: https://storage.googleapis.com/${bucketName}/${destinationFileName}`);
    return `https://storage.googleapis.com/${bucketName}/${destinationFileName}`;
  } catch (error) {
    console.error('Error uploading image:', error);
  }
}

// Example usage
// const imagePath = path.join(__dirname, '188112.png'); // Replace with the path to your image file
// const destinationFileName = '188112.png'; // Replace with the desired destination file name

// uploadImage(imagePath, destinationFileName);

module.exports = {uploadImage}