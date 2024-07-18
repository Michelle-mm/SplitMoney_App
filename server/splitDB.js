require('dotenv').config({path:"./config.env"});
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const router = require('./router');
const mongoose = require('mongoose');
const app = express();

mongoose.connect(process.env.MONGOATLAS_URL, { dbName: 'splitDB', useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(`${err} can't connect`));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use('/', router);



const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});