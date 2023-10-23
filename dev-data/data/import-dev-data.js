/**
    * @author Alexandru Ivanescu <ivanescu.alexandru01@gmail.com>
    * IMPORTANT, THIS JS FILE IS ONLY FOR IMPORT/DELETE DATA FROM DB(DATABASE), FROM YOUR JSON FILE WITHIN THE PROJECT!
*/
const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Require the model of your DB and location to be specified
const Product = require('./../../models/productModel');

dotenv.config({
    path: './config.env'
})

//Connect the project to online database.
const DB = process.env.DATABASE.replace('<PASSWORD>' , process.env.DATABASE_PASSWORD);

mongoose.connect(DB , {
    useNewUrlParser: true,
    useUnifiedTopology: true
    
}).then(() => {console.log('DB connection successful!')});

//<------Start to implement how to import/delete your data from DB(DATABASE)------>
// Read json file with fs
const products = JSON.parse(fs.readFileSync(`${__dirname}/products.json` , 'utf-8'));

// Import Data into DB
const importData = async() => {
    try {
        await Product.create(products)
        console.log('Data successfully loaded in DB!');
    } catch (err) {
        console.log(err);
    }
    /**
     * The process.exit() function is a method in Node.js that terminates the current process and exits the program. 
     * When called, it immediately stops the execution of the program and returns the control back to the operating system.
   */
    process.exit();
};

//Delete all data from DB
const deleteData = async () => {
    try {
        await Product.deleteMany();
        console.log('Data successfully deleted from DB!');
    }catch (err) {
        console.log(err);
    }
    process.exit();
};

// First write this in code console.log(process.argv);
   console.log(process.argv);
/**
   * process. argv is a property that holds an array of command-line values provided when the current process was initiated.
   * The first element in the array is the absolute path to the Node, 
   * followed by the path to the file that's running and finally any command-line arguments provided when the process was initiated.

   * After to see in terminal the proccess of argv in array, write node dev-data/data/import-dev-data.js,
   * [0] , [1] , [2] : position or each element in array.
   * After in terminal will see this : 
   [
    'C:\\PROGRAM_FILES\\nodejs\\node.exe' , [0]
    'C:\\USERS\\USER_NAME_PC\\FOLDER_NAME\\LOCATION_PROJECT\\PROJECT_NAME\\pro\\dev-data\\data\\import-dev-data.js' , [1]
   ]

   * and added a new position in array with write this in terminal: node dev-data/data/import-dev-data.js --import and in terminal will see this

  [
    'C:\\PROGRAM_FILES\\nodejs\\node.exe', [0]
    'C:\\USERS\\USER_NAME_PC\\FOLDER_NAME\\LOCATION_PROJECT\\PROJECT_NAME\\pro\\dev-data\\data\\import-dev-data.js' , [1]
    '--import' , [2]
   ]
*/

if (process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete') {
    deleteData();
}
/**
  * After that two types of commands will be used in the terminal :
  * node dev-data/data/import-dev-data.js --delete = to delete data from DB   
  * node dev-data/data/import-dev-data.js --import = to import data into DB
*/