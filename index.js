require('dotenv').config();
const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5050;

app.use(cors({ origin: true }));

app.set("views", "./views")
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(express.static("audio"));
app.use(express.static(__dirname + 'audio'))



app.get('/', async (req, res) => {
    res.render('index');
});

const audioRoute = require('./routes/audio.route');
const paragraphRoute = require('./routes/paragraph.route');
app.use("/audio", audioRoute);
app.use("/paragraph", paragraphRoute);

//app.listen(port, () => console.log('Server listening on port ' + port));
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(port, () => console.log('Server listening on port ' + port)))
    .catch(error => console.log(error.message))

mongoose.set('useFindAndModify', false);