const mongo = require('../lib/mongo');
const user = mongo.users;

module.exports = {

    getAllUsers: function getAllUsers() {
        return user
            .find()
            .exec();
    },

};




//test test  test testasd


