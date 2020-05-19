const mongo = require('../lib/mongo');
const messages = mongo.messages;

module.exports = {


    getAllMessages: function getAllMessages() {
        return messages
            .find()

            .exec()
    },

    getMessageByProjectID:function getMessageByProjectID(id) {
        return messages
            .find({projectID:id})
            .populate("projectID")
            .populate("senderID")
            .populate("receiverID")
    }


}