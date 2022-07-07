const mongoose = require('mongoose');
const config = require('config');
const cors = require('cors');
const user = require('./routes/users');
const auth = require('./routes/auth');
const express = require('express');
const app = express();

if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1);
}

app.use(express.json());
app.use(cors());
app.use('/api/user', user)
app.use('/api/login', auth)


mongoose.connect("mongodb://localhost/Article")
    .then(console.log("Database Connected."))
    .catch(error => console.log(error.message))

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App working on port ${port}...`)
})