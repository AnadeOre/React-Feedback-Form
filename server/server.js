const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()
const feedbackRoutes = require('./routes/feedback');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(morgan('tiny'));
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));


app.use('/api', feedbackRoutes)

app.listen(PORT, console.log(`Server starting at ${PORT}`))

