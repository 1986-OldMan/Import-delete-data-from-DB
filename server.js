const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({
    path: './config.env'
});
const app = require('./app');

/**
 * Connect the project to online database.Not use local database!
 */
const DB = process.env.DATABASE.replace('<PASSWORD>' , process.env.DATABASE_PASSWORD);

mongoose.connect(DB , {
    useNewUrlParser: true,
    // useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => {console.log('DB connection succesful! 🧮');
});

/**
 * Connect server!
 */
const port = process.env.PORT || 5000;
const server = app.listen(port , () => {
    console.log(`App running on port ${port} 🗄️....`);
});