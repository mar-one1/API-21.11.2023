const fs = require("fs");
const path = require("path");
const RecipeModel = require("../Model/Recipe"); // Import the Recipe model
const UserModel = require("../Model/User"); // Import the User model

const IMAGE_DIR_RECIPE = path.join(__dirname, "../../public/data/uploads"); // Adjust path to image directory
const IMAGE_DIR_USER = path.join(__dirname, "../../public/uploads"); // Adjust path to image directory

async function getAllImagePathsOnDevice(dirImage) {
  return new Promise((resolve, reject) => {
    fs.readdir(dirImage, (err, files) => {
      if (err) {
        return reject(err);
      }
      // Optionally, filter out non-image files if necessary
      const imageExtensions = [".jpg", ".jpeg", ".png", ".gif"];
      const imageFiles = files.filter((file) =>
        imageExtensions.includes(path.extname(file).toLowerCase())
      );
      resolve(imageFiles);
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
          console.error("Error getting recipe image paths from database:", err);
          return reject(err);
        }
        resolve(paths);
      });
    });

    const dbImagePathsUser = await new Promise((resolve, reject) => {
      UserModel.getAllImagePathsFromDatabase((err, paths) => {
        if (err) {
          console.error("Error getting user image paths from database:", err);
          return reject(err);
        }
        resolve(paths);
      });
    });

    const deviceImagePathsRecipe = await getAllImagePathsOnDevice(
      IMAGE_DIR_RECIPE
    );
    const deviceImagePathsUser = await getAllImagePathsOnDevice(IMAGE_DIR_USER);

    // Extract filenames from the full paths for recipes
    const deviceFilenamesRecipe = deviceImagePathsRecipe.map((imagePath) => {
      if (typeof imagePath === "string") {
        return path.basename(imagePath);
      } else {
        return ""; // Or handle appropriately if imagePath is null or undefined
      }
    });

    const dbFilenamesRecipe = dbImagePathsRecipe.map((imagePath) => {
      if (typeof imagePath === "string") {
        return path.basename(imagePath);
      } else {
        return ""; // Or handle appropriately if imagePath is null or undefined
      }
    });

    // Filter out unused images based on filenames for recipes
    const unusedImagesRecipe = deviceFilenamesRecipe.filter(
      (filename) => !dbFilenamesRecipe.includes(filename)
    );

    // Extract filenames from the full paths for users
    const deviceFilenamesUser = deviceImagePathsUser.map((imagePath) => {
      if (typeof imagePath === "string") {
        return path.basename(imagePath);
      } else {
        return ""; // Or handle appropriately if imagePath is null or undefined
      }
    });

    const dbFilenamesUser = dbImagePathsUser.map((imagePath) => {
      if (typeof imagePath === "string") {
        return path.basename(imagePath);
      } else {
        return ""; // Or handle appropriately if imagePath is null or undefined
      }
    });

    // Filter out unused images based on filenames for users
    const unusedImagesUser = deviceFilenamesUser.filter(
      (filename) => !dbFilenamesUser.includes(filename)
    );

    for (const imagePath of unusedImagesRecipe) {
      //await deleteImageFile(IMAGE_DIR_RECIPE + "\\" +imagePath);
      console.log(`Deleted unused recipe image: ${imagePath}`);
    }

    for (const imagePath of unusedImagesUser) {
      await deleteImageFile(IMAGE_DIR_USER + "\\" + imagePath);
      console.log(`Deleted unused user image: ${imagePath}`);
    }

    return { message: "Unused images deleted successfully" };
  } catch (err) {
    console.error(err);
    throw new Error("Error deleting unused images");
  }
}

module.exports = {
  deleteUnusedImages,
};
