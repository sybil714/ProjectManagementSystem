const mongo = require('../lib/mongo');
const user = mongo.users;

module.exports = {

    /**
     * @return {Promise<Document[]>}
     */
    getAllUsers: function getAllUsers() {
        return user.find().exec();
    },
}