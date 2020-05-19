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
            .find({email:email})

    },



}




//test test  test testasd


