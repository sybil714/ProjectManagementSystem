const mongo = require('../lib/mongo');
const messages = mongo.messages;


module.exports = {


    getAll: function getAllmessages() {
        return messages.find().exec();
    },

    getCommentByUserID: function getCommentByUserID(id) {
        return messages
            .findById(id)
            .exec();
    },

}