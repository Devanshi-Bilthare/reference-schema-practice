const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log('database connected'))
.catch(err => console.log(err))