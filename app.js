const express = require('express');
const exphbs = require('express-handlebars');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;


app.use(express.urlencoded({ extended: true })); // New


app.use(express.json()); // New

// Static Files
app.use(express.static('public'));

// Templating Engine
const handlebars = exphbs.create({ extname: '.hbs', });
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');




const routes = require('./server/routes/student');
app.use('/', routes);

app.listen(port, () => console.log(`Listening on port ${port}`));