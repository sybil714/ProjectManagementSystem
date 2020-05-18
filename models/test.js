const mongo = require('../lib/mongo');
const test = mongo.groups;

module.exports = {

    /**
     * @return {Promise<Document[]>}
     */
    getAllUsers: function getAllUsers() {
        return test.find().exec();
    },
};


