const { MongoClient, ObjectId } = require('mongodb');
const uri = 'mongodb://127.0.0.1:27017/';
const client = new MongoClient(uri, { useNewUrlParser: true });
const mongoose = require('mongoose');
// Assuming User is defined in User.js
//const User = require('../Model/User');
const User = require('../Schema/user_Schema');  // Adjust the path based on your file structure
const { param } = require('../Router/usersRouter');
class UserRepository {
  // Create a new user
  static async createUser(userData) {
    try {
      const user = new User(userData);
      return await user.save();
    } catch (error) {
      throw error;
    }
  }

  // Get all users
  static async getAllUsers() {
    try {
      return await User.find();
    } catch (error) {
      throw error;
    }
  }

  // Get a user by their ID
  static async getUserById(userId) {
    try {
      return await User.findOne({ id: userId });
    } catch (error) {
      throw error;
    }
  }

  // Update a user
  static async updateUser(userId, updatedData) {
    try {
      return await User.findOneAndUpdate({ id: userId }, updatedData, { new: true });
    } catch (error) {
      throw error;
    }
  }

  // Delete a user
  static async deleteUser(userId) {
    try {
      return await User.findOneAndDelete({ id: userId });
    } catch (error) {
      throw error;
    }
  }
}
module.exports = UserRepository;