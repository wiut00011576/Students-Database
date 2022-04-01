const mysql = require('mysql');

// Connection Pool
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// View Users
exports.view = (req, res) => {
  // User the connection
  connection.query('SELECT * FROM student WHERE status = "active"', (err, rows) => {
    // When done with the connection, release it
    if (!err) {
      let removedStudent = req.query.removed;
      res.render('home', { rows, removedStudent });
    } else {
      console.log(err);
    }
    console.log('The data from student table: \n', rows);
  });
}

// Find User by Search
exports.find = (req, res) => {
  let searchTerm = req.body.search;
  // User the connection
  connection.query('SELECT * FROM student WHERE first_name LIKE ? OR last_name LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
    if (!err) {
      res.render('home', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from student table: \n', rows);
  });
}

exports.form = (req, res) => {
  res.render('add-student');
}

// Add new user
exports.create = (req, res) => {
  const { first_name, last_name, email, phone, comments } = req.body;
  let searchTerm = req.body.search;

  // User the connection
  connection.query('INSERT INTO student SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?', [first_name, last_name, email, phone, comments], (err, rows) => {
    if (!err) {
      res.render('add-student', { alert: 'Student added successfully.' });
    } else {
      console.log(err);
    }
    console.log('The data from student table: \n', rows);
  });
}


// Edit user
exports.edit = (req, res) => {
  // User the connection
  connection.query('SELECT * FROM student WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.render('edit-student', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from student table: \n', rows);
  });
}


// Update User
exports.update = (req, res) => {
  const { first_name, last_name, email, phone, comments } = req.body;
  // User the connection
  connection.query('UPDATE student SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ? WHERE id = ?', [first_name, last_name, email, phone, comments, req.params.id], (err, rows) => {

    if (!err) {
      // User the connection
      connection.query('SELECT * FROM student WHERE id = ?', [req.params.id], (err, rows) => {
        // When done with the connection, release it
        
        if (!err) {
          res.render('edit-student', { rows, alert: `${first_name} has been updated.` });
        } else {
          console.log(err);
        }
        console.log('The data from student table: \n', rows);
      });
    } else {
      console.log(err);
    }
    console.log('The data from student table: \n', rows);
  });
}


exports.delete = (req, res) => {

 

  connection.query('UPDATE student SET status = ? WHERE id = ?', ['removed', req.params.id], (err, rows) => {
    if (!err) {
      let removedStudent = encodeURIComponent('Student successeflly removed.');
      res.redirect('/?removed=' + removedStudent);
    } else {
      console.log(err);
    }
    console.log('The data from beer table are: \n', rows);
  });

}

// View Users
exports.viewall = (req, res) => {

  // User the connection
  connection.query('SELECT * FROM student WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.render('view-student', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from student table: \n', rows);
  });

}