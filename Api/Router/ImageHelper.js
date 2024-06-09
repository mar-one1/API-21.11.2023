const fs = require('fs');
const path = require('path');
const RecipeModel = require('../Model/Recipe'); // Import the Recipe model
const UserModel = require('../Model/User'); // Import the User model

const IMAGE_DIR_RECIPE = path.join(__dirname, '../../public/data/uploads'); // Adjust path to image directory
const IMAGE_DIR_USER = path.join(__dirname, '../../public/uploads'); // Adjust path to image directory

async function getAllImagePathsOnDevice(dirImage) {
    return new Promise((resolve, reject) => {
        fs.readdir(dirImage, (err, files) => {
            if (err) {
                return reject(err);
            }
            const filePaths = files.map(file => path.join(dirImage, file));
            resolve(filePaths);
        });
    });
}

async function deleteImageFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.unlink(filePath, (err) => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
}

async function deleteUnusedImages() {
    try {
        const dbImagePathsRecipe = await new Promise((resolve, reject) => {
            RecipeModel.getAllImagePathsFromDatabase((err, paths) => {
                if (err) {
                    console.error('Error getting recipe image paths from database:', err);
                    return reject(err);
                }
                resolve(paths);
            });
        });

        const dbImagePathsUser = await new Promise((resolve, reject) => {
            UserModel.getAllImagePathsFromDatabase((err, paths) => {
                if (err) {
                    console.error('Error getting user image paths from database:', err);
                    return reject(err);
                }
                resolve(paths);
            });
        });

        const deviceImagePathsRecipe = await getAllImagePathsOnDevice(IMAGE_DIR_RECIPE);
        const deviceImagePathsUser = await getAllImagePathsOnDevice(IMAGE_DIR_USER);

        const unusedImagesRecipe = deviceImagePathsRecipe.filter(imagePath => !dbImagePathsRecipe.includes(imagePath));
        const unusedImagesUser = deviceImagePathsUser.filter(imagePath => !dbImagePathsUser.includes(imagePath));

        for (const imagePath of unusedImagesRecipe) {
            await deleteImageFile(imagePath);
            console.log(`Deleted unused recipe image: ${imagePath}`);
        }

        for (const imagePath of unusedImagesUser) {
            await deleteImageFile(imagePath);
            console.log(`Deleted unused user image: ${imagePath}`);
        }

        return { message: 'Unused images deleted successfully' };
    } catch (err) {
        console.error(err);
        throw new Error('Error deleting unused images');
    }
}

module.exports = {
    deleteUnusedImages,
};
