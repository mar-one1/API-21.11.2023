const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const fs = require('fs');
    const path = require('path');
const { isNull } = require('util');


class User
{
    constructor(
      id,
      username,
      firstname,
      lastname,
      birthday,
      email,
      phoneNumber,
      icon,
      password,
      grade,
      status
    ) {
      this.id = id;
      this.username = username;
      this.firstname = firstname;
      this.lastname = lastname;
      this.birthday = birthday;
      this.email = email;
      this.phoneNumber = phoneNumber;
      this.icon = icon;
      this.password = password;
      this.grade = grade;
      this.status = status;
    }
  
    
    static createUser(
      username,
      firstname,
      lastname,
      birthday,
      email,
      phoneNumber,
      icon,
      password,
      grade,
      status,
      callback
    ) {
      
      
      const db = new sqlite3.Database('DB_Notebook.db');
      db.run(
        'INSERT INTO User (username,Firstname_user, Lastname_user, Birthday_user, Email_user, Phonenumber_user, Icon_user, password, Grade_user, Status_user) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)',
        [username,firstname, lastname, birthday, email, phoneNumber, icon, password, grade, status],
        function (err) {
          if (err) {
            callback(err);
            return;
          }

        
        // If the user doesn't exist, add them to the database
      
          const newUser = new User(
            this.lastID,
            username,
            firstname,
            lastname,
            birthday,
            email,
            phoneNumber,
            icon,
            password,
            grade,
            status
          );
          callback(null, newUser);
        });
      db.close();
    }

    static getUserById(id, callback) {
      const db = new sqlite3.Database('DB_Notebook.db');
      db.get(
        'SELECT * FROM User WHERE Id_user = ?',
        [id],
        (err, row) => {
          if (err) {
            callback(err, null);
            return;
          }
          if (!row) {
            callback(null, null); // User not found
            return;
          }
          const user = new User(
            row.Id_user,
            row.username,
            row.Firstname_user,
            row.Lastname_user,
            row.Birthday_user,
            row.Email_user,
            row.Phonenumber_user,
            row.Icon_user=null,
            row.password,
            row.Grade_user,
            row.Status_user
          );
          callback(null, user);
        }
      );
      db.close();
    }
  

    static async UpdateUserImage(
      username,
      imagebyte,
      callback
    ) {
      const db = new sqlite3.Database('DB_Notebook.db');
      db.run(
        'UPDATE User SET Icon_user = ? WHERE username = ?',
        [imagebyte,username],
        function (err) {
          if (err) {
            callback(err);
            return;
          }

        // If the user doesn't exist, add them to the database
          callback(null, username);
        });
      db.close();
    }

    static getUserImage(username, callback) {
      const db = new sqlite3.Database('DB_Notebook.db');
      db.get(
          'SELECT Icon_user FROM User WHERE username = ?',
          [username],
          (err, row) => {
              if (err) {
                  db.close();
                  callback(err, null);
                  return;
              }
              if (!row) {
                  db.close();
                  callback(null, null); // User not found
                  return;
              }
              db.close();
              // Pass the retrieved image URL or binary data to the callback
              callback(null, row.Icon_user);
          }
      );
    
    }
  
    static getUserByUsername(usernameUser, callback) {
      const db = new sqlite3.Database('DB_Notebook.db');
      db.get(
        'SELECT * FROM User WHERE username = ?',
        [usernameUser],
        (err, row) => {
          if (err) {
            callback(err, null);
            db.close(); // Close the database connection in case of an error
            return;
          }
          if (!row) {
            callback(null, null); // User not found
            db.close(); // Close the database connection if the user is not found
            return;
          }
          
          const byteArray = Buffer.from(row.Icon_user , 'utf8');
          const str = byteArray.toString('utf8'); // For UTF-8 encoding
          console.log("str: " + str);

          let yourString = row.Icon_user ;
          let byteArray1 = Buffer.from(yourString, 'utf8');
          const user = new User(
            row.Id_user,
            row.username,
            row.Firstname_user,
            row.Lastname_user,
            row.Birthday_user,
            row.Email_user,
            row.Phonenumber_user,
            row.Icon_user=null,
            row.password,
            row.Grade_user,
            row.Status_user
          );
          callback(null, user);
          db.close(); // Close the database connection after the operation is completed
        }
      );
      // db.close() should not be placed here; it should be inside the callback function
    }
    
    static deleteimage(pathimage, callback) {    
    const filePathToDelete = './public/uploads/' +pathimage; // Replace with the path to the file you want to delete
    // Check if the file exists
    fs.access(filePathToDelete, fs.constants.F_OK, (err) => {
      if (err) {
        console.error('File does not exist or cannot be accessed.');
        return;
      }

      // File exists, proceed to delete
      fs.unlink(filePathToDelete, (unlinkErr) => {
        if (unlinkErr) {
          console.error('Error deleting file:', unlinkErr);
          return;
        }
        console.log('File deleted successfully.');
      });
    });
}
    static getAllUsers(callback) {
      const db = new sqlite3.Database('DB_Notebook.db');
      db.all('SELECT * FROM User', (err, rows) => {
        if (err) {
          callback(err, null);
          return;
        }
        const users = rows.map((row) => {
          return new User(
            row.Id_user,
            row.username,
            row.Firstname_user,
            row.Lastname_user,
            row.Birthday_user,
            row.Email_user,
            row.Phonenumber_user,
            row.Icon_user,
            row.password,
            row.Grade_user,
            row.Status_user
          );
        });
        callback(null, users);
      });
      db.close();
    }
  

    static updateUser(UserId,username,firstname,lastname,birthday,email,phoneNumber,icon,password,grade,status, callback) {
      const db = new sqlite3.Database('DB_Notebook.db');
      db.run(
        'UPDATE User SET Firstname_user = ?, Lastname_user = ?, Birthday_user = ?, Email_user = ?, Phonenumber_user = ?, Icon_user = ?, password = ?, Grade_user = ?, Status_user = ? WHERE Id_user = ?',
        [firstname, lastname, birthday, email, phoneNumber, icon, password, grade, status,UserId],
        function (err) {
          if (err) {
            callback(err);
            return;
          }
          if (this.changes === 0) {
            callback(null, null); // User not found or not updated
            return;
          }
          const updatedUser = new User(
            UserId,
            username,
            firstname,
            lastname,
            birthday,
            email,
            phoneNumber,
            icon,
            password,
            grade,
            status
            );
          callback(null, updatedUser);
          });
      db.close();
    }
  
    static updateUserByUsername(username,firstname,lastname,birthday,email,phoneNumber,icon,password,grade,status, callback) {
      const db = new sqlite3.Database('DB_Notebook.db');
      db.run(
        'UPDATE User SET Firstname_user = ?, Lastname_user = ?, Birthday_user = ?, Email_user = ?, Phonenumber_user = ?, Icon_user = ?, password = ?, Grade_user = ?, Status_user = ? WHERE username = ?',
        [firstname, lastname, birthday, email, phoneNumber, icon, password, grade, status, username],
        function (err) {
          if (err) {
            callback(err);
            return;
          }
          if (this.changes === 0) {
            const error = new Error('User not found or not updated');
            callback(error, null);
            return;
          }
          const updatedUser = new User(
            username,
            firstname,
            lastname,
            birthday,
            email,
            phoneNumber,
            icon,
            password,
            grade,
            status
            );
          callback(null, updatedUser);
          });
      db.close();
    }

    static updateImageUserByUsername(username,icon, callback) {
      const db = new sqlite3.Database('DB_Notebook.db');
      db.run(
        'UPDATE User SET  Icon_user = ? WHERE username = ?',
        [ icon, username],
        function (err) {
          if (err) {
            callback(err);
            return;
          }
          if (this.changes === 0) {
            const error = new Error('User not found or not updated');
            callback(error, null);
            return;
          }
          const updatedUser = new User(
            username,
            firstname,
            lastname,
            birthday,
            email,
            phoneNumber,
            icon,
            password,
            grade,
            status
            );
          callback(null, updatedUser);
          });
      db.close();
    }

    static deleteUser(UserId, callback) {
      const db = new sqlite3.Database('DB_Notebook.db');
      db.run(
        'DELETE FROM User WHERE Id_user = ?',
        [UserId],
        function (err) {
          if (err) {
            callback(err);
            return;
          }
          if (this.changes === 0) {
            callback(null, false); // User not found or not deleted
            return;
          }
          callback(null, true); // User deleted successfully
        }
      );
      db.close();
    }

    
    // ... (Other methods)
  
    // Add more methods as needed (e.g., update, delete, get all users)
  }
  
  module.exports = User;
  