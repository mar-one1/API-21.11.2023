const { MongoClient, ObjectId } = require('mongodb');
const url = 'mongodb://127.0.0.1:27017/';
// Create a new MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true });
const mongoose = require('mongoose');
// Assuming User is defined in User.js
//const User = require('../Model/User');
const User = require('../Schema/user_Schema');  // Adjust the path based on your file structure
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

/*const client = new MongoClient(uri, { useUnifiedTopology: true });
class UserRepository {
  static async getUserById(id, callback) {
  

    try {
      await client.connect();

      const databaseName = 'db_note';
      const database = client.db(databaseName);

      // Check if the database exists, and create it if not
      const dbList = await client.db().admin().listDatabases();
      const databaseExists = dbList.databases.some(db => db.name === databaseName);

      if (!databaseExists) {
        // Create collections, indexes, or perform any initial setup if needed
        // You may not need to explicitly create a collection as MongoDB creates it on demand
        // database.createCollection('users');

        console.log(`Database '${databaseName}' created.`);
      }

      const usersCollection = database.collection('users');

      const user = await usersCollection.findOne({ _id: new ObjectId(id) });

      if (!user) {
        callback(null, null); // User not found
        return;
      }

      const userModel = new User(
        user._id.toString(),
        user.username,
        user.Firstname_user,
        user.Lastname_user,
        user.Birthday_user,
        user.Email_user,
        user.Phonenumber_user,
        user.Icon_user,
        user.password,
        user.Grade_user,
        user.Status_user
      );

      callback(null, userModel);
    } catch (err) {
      callback(err, null);
    } finally {
      await client.close();
    }
  
  }
  static async insertData() {

  try {
    await client.connect();
    console.log('Connected to the database');

    const databaseName = 'db_note';
    const database = client.db(databaseName);
    console.log(`Using database: ${databaseName}`);

    const collectionName = 'users'; // Replace with your actual collection name
    const collection = database.collection(collectionName);

    // Example data to insert
    const userData = {
      username: 'john_doe',
      Firstname_user: 'John',
      Lastname_user: 'Doe',
      Birthday_user: '1990-01-01',
      Email_user: 'john.doe@example.com',
      Phonenumber_user: '123-456-7890',
      Icon_user: null,
      password: 'hashed_password', // Replace with a secure hashed password
      Grade_user: 'A',
      Status_user: 'Active'
    };

    // Insert one document
    const result = await collection.insertOne(userData);
    console.log(`Inserted ${result.insertedCount} document into the collection`);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
    console.log('Connection closed');
  }
}

// Call the insertData function



}
UserRepository.insertData((err, user) => {
if (err) {
  console.error('Error:', err);
} else if (!user) {
  console.log('User not found');
} else {
  console.log('User found:', user);
}
});

// Example usage:
const userId = 2; // Replace with the actual user ID
UserRepository.getUserById(userId, (err, user) => {
  if (err) {
    console.error('Error:', err);
  } else if (!user) {
    console.log('User not found');
  } else {
    console.log('User found:', user);
  }
});*/
