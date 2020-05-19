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
    role:String,

});

const users = mongoose.model('Users', userSchema, 'Users');

/*****GroupDB*****/
const groupSchema = new Schema({
    member1: {type: Schema.Types.ObjectId, ref: 'Users'},
    groupName: String,
});

const groups = mongoose.model('Groups', groupSchema, 'Groups');

/*****MessageDB*****/
const messageSchema = new Schema({
    projectID:{type: Schema.Types.ObjectId, ref: 'Project'},
    senderID: {type: Schema.Types.ObjectId, ref: 'Users'},
    receiverID:{type: Schema.Types.ObjectId, ref: 'Users'},
    content: String,
    date:Date,
});


const messages = mongoose.model('MessagePrintout', messageSchema, 'MessagePrintout');

/*****ProjectDB*****/
const projectSchema = new Schema({
    projectName:String,
    projectContent:String,
    publisherID: {type: Schema.Types.ObjectId, ref: 'Users'},
});

const projects = mongoose.model('Project', projectSchema, 'Project');

/*****ClientFeedbackDB*****/
const feedbackSchema = new Schema({
    groupName: {type: Schema.Types.ObjectId, ref: 'Groups'},
    mark1:String,
    ReasonQ1:String,
    mark2:String,
    ReasonQ2:String,
    mark3:String,
    ReasonQ3:String,
    mark4:String,
    ReasonQ4:String,
    Comments:String,
});

const feedbacks = mongoose.model('ClientFeedback', feedbackSchema, 'ClientFeedback');

//123
module.exports={
    users,
    groups,
    messages,
    projects,
    feedbacks,
};
