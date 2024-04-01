
Install MySQL based on this youtube link: https://www.youtube.com/watch?v=Sfvpgu9ID2Q&ab_channel=AmitThinks 

Install PHP based on this youtube link: https://www.youtube.com/watch?v=Mip_RuSEoso&ab_channel=GeekyScript

In MySQL Set up a username and password during installation

Steps for creating a database needed for this projec:
1. Open comnnad prompt
2. Type "mysql -u username -p"
3. Enter your password when prompted.
4. Create new database by typing "CREATE DATABASE new_database_name;"
5. Select the database by typing "SELECT new_database_name;"
6. Create Tables by the following:

CREATE TABLE users (
  id INT(11) NOT NULL AUTO_INCREMENT,
  fullName VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE tasks (
  id INT(11) NOT NULL AUTO_INCREMENT,
  userId INT(11) NOT NULL,
  text VARCHAR(255) NOT NULL,
  date VARCHAR(255),
  isChecked INT(11) NOT NULL,
  isPriority INT(11) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

8. To exit type "EXIT;"

To use the newly created database in the code:
1. Navagate to the auth.php, signup.php, save_tasks.php and laod_tasks.php and change the $username, $password and $dbname accordingly

To run the code:
1. Open command prompt
2. Type "cd file_directory"
3. type "php -S localhost:8000"
4. Use the link to open up the project: http://localhost:8000/main.php