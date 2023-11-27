const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const saltRounds = 10;

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

    static UpdateUserImage(
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
            row.Icon_user,
            row.password,
            row.Grade_user,
            row.Status_user
          );
          callback(null, user);
        }
      );
      db.close();
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
  