const mongo = require('../lib/mongo');
const feedback = mongo.feedbacks;

module.exports = {
    getAllGroups: function getAllGroups() {
        return feedback
            .find()
            .exec();
    },

};