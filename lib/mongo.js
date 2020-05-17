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
    email: String,
    phoneNumber: String,
});

const users = mongoose.model('Users', userSchema, 'Users');


const groupSchema = new Schema({
    member1: {type: Schema.Types.ObjectId, ref: 'User'},
    groupName: String,

});


const groups = mongoose.model('Groups', groupSchema, 'Groups');


module.exports={
    users,
    groups,
};
