const config = require('config-lite')(__dirname);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


mongoose.connect(config.mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    dbName: 'ProjectManagementDB'
});

/*****UserDB*****/
const userSchema = new Schema({
    userName: String,
    password: String,
    email: String,
    role:String
});

const users = mongoose.model('Users', userSchema, 'Users');

/*****GroupDB*****/
const groupSchema = new Schema({
    groupName:String,
    project:{type: Schema.Types.ObjectId, ref: 'Project'},
    facilitator: {type: Schema.Types.ObjectId, ref: 'Users'},
    member1ID: {type: Schema.Types.ObjectId, ref: 'Users'},
    member2ID: {type: Schema.Types.ObjectId, ref: 'Users'},
    member3ID: {type: Schema.Types.ObjectId, ref: 'Users'},
    member4ID: {type: Schema.Types.ObjectId, ref: 'Users'},
    member5ID: {type: Schema.Types.ObjectId, ref: 'Users'},
    member6ID: {type: Schema.Types.ObjectId, ref: 'Users'},
});

const groups = mongoose.model('Groups', groupSchema, 'Groups');

/*****MessageDB*****/
const messageSchema = new Schema({
    projectID:{type: Schema.Types.ObjectId, ref: 'Project'},
    senderID: {type: Schema.Types.ObjectId, ref: 'Users'},
    content: String,
    date:String
});


const messages = mongoose.model('MessagePrintout', messageSchema, 'MessagePrintout');

/*****ProjectDB*****/
const projectSchema = new Schema({
    projectName:String,
    projectContent:String,
    publisherID: {type: Schema.Types.ObjectId, ref: 'Users'},
    grade:String,
    status:String
});

const projects = mongoose.model('Project', projectSchema, 'Project');

/*****ClientFeedbackDB*****/
const feedbackSchema = new Schema({
    clientID:{type: Schema.Types.ObjectId, ref: 'Users'},
    groupID: {type: Schema.Types.ObjectId, ref: 'Groups'},
    mark1:String,
    ReasonQ1:String,
    mark2:String,
    ReasonQ2:String,
    mark3:String,
    ReasonQ3:String,
    mark4:String,
    ReasonQ4:String,
    Comments:String
});

const feedbacks = mongoose.model('ClientFeedback', feedbackSchema, 'ClientFeedback');

/*****FacilitatorAssessmentDB*****/
const assessmentSchema = new Schema({
    facilitatorID:{type: Schema.Types.ObjectId, ref: 'Users'},
    groupID: {type: Schema.Types.ObjectId, ref: 'Groups'},
    meeting:String,
    mark1:String,
    reason1:String,
    mark2:String,
    reason2:String,
    Comments:String
});

const assessments = mongoose.model('FacilitatorAssessment', assessmentSchema, 'FacilitatorAssessment');


/*****ModuleLeaderMarkingDB*****/
const markingSchema = new Schema({
    moduleLeaderID:{type: Schema.Types.ObjectId, ref: 'Users'},
    groupID: {type: Schema.Types.ObjectId, ref: 'Groups'},
    mark1:String,
    reason1:String,
    mark2:String,
    reason2:String,
    mark3:String,
    reason3:String,
    mark4:String,
    reason4:String,
    Comments:String
});

const markings = mongoose.model('ModuleLeaderMarking', markingSchema, 'ModuleLeaderMarking');



const StudentMarkingSchema=new Schema({
    mark:Array,
    mumberID:{type: Schema.Types.ObjectId, ref: 'Users'},
    groupID:{type: Schema.Types.ObjectId, ref: 'Groups'},
    comment:Array
});

const StudentMarking=mongoose.model('StudentMarks', StudentMarkingSchema, 'StudentMarks');




module.exports={
    users,
    groups,
    messages,
    projects,
    feedbacks,
    assessments,
    markings,
    StudentMarking,
};
