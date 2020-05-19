const mongo = require('../lib/mongo');
const user = mongo.users;

module.exports = {

    getAllUsers: function getAllUsers() {
        return user
            .find()
            .exec();
    },

    getUsersByEmail:function getUsersByEmail(email) {
        return user
            .findOne({email:email})
            .exec()
    },



}




//test test  test testasd


