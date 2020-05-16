const config = require('config-lite')(__dirname);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect(config.mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    dbName: 'ProjectManagementDB',
});

const userSchema = new Schema({
    userName: String,
    password: String,
    Email: String,
    phoneNumber: String,
});

const users = mongoose.model('Users', userSchema, 'Users');

module.exports={
    users,
};
