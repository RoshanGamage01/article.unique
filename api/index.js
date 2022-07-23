const mongoose = require('mongoose');
const config = require('config');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const path = require('path')
const user = require('./routes/users');
const auth = require('./routes/auth');
const article = require('./routes/article');
const express = require('express');
const app = express();


if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1);
}else if(!config.get('databasePassword')){
    console.error('FATAL ERROR: databasePassword is not defined');
    process.exit(1);
}

require('./startup/prod')(app);

app.use(express.json());
app.use(cors());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, 'tmp')
}))
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));
app.use('/api/user', user);
app.use('/api/login', auth);
app.use('/api/article', article);

const dbCluster = `mongodb+srv://RoshanGamage01:${config.get('databasePassword')}@unique.gve3jxs.mongodb.net/?retryWrites=true&w=majority`
const dbLocal = "mongodb://localhost/Article"

mongoose.connect(dbLocal)
    .then(console.log("Database Connected."))
    .catch(error => console.log(error.message));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App working on port ${port}...`);
})

app.post('/upload', function(req, res) {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files.profileImage;
  uploadPath = __dirname + '/images/' + sampleFile.name;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!'+uploadPath);
  });
});