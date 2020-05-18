const mongo = require('../lib/mongo');
const user = mongo.users;

module.exports = {

    getAllUsers: function getAllUsers() {
        return user
            .find()
            .exec();
    },


    getUserByID: function getNameByID(id) {
        return user
            .find(id)
            .populate("userName")
    }
};




//test test  test testasd


