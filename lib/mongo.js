const config = require('config-lite')(__dirname);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect(config.mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    dbName: 'ProjectManagementDB',
});
/*****UserDB*****/
const userSchema = new Schema({
    userName: String,
    password: String,
    email: String,
    phoneNumber: String,
});

const users = mongoose.model('Users', userSchema, 'Users');

/*****GroupDB*****/
const groupSchema = new Schema({
    member1: {type: Schema.Types.ObjectId, ref: 'User'},
    groupName: String,
});

const groups = mongoose.model('Groups', groupSchema, 'Groups');

/*****MessageDB*****/
const messageSchema = new Schema({
    sender: {type: Schema.Types.ObjectId, ref: 'User'},
    receiver:{type: Schema.Types.ObjectId, ref: 'User'},
    content: String,
    date:Date,
});

const messages = mongoose.model('MessagePrintout', messageSchema, 'MessagePrintout');

//123
module.exports={
    users,
    groups,
    messages
};
