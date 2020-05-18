const mongo = require('../lib/mongo');
const messages = mongo.messages;

module.exports = {


    getAll: function getAllmessages() {
        return messages
            .find()
            .populate("senderID")
            .populate("receiverID")
            .exec()
    },


}