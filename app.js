const express = require("express");
const expressLayouts = require('express-ejs-layouts');
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');

// DB Config


// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

app.listen(PORT, console.log(`SERVER started on  port: ${PORT}`));

// >npm run dev         {FOR RUNNING SERVER}
// visit http://localhost:5000   {FOR WEBSITE}
