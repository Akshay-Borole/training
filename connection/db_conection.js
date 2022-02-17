const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://api-testing-rd:Pe2AHAA8zeh0Rgtc@api-testing.0isbw.mongodb.net/userDB?retryWrites=true&w=majority')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB'));

