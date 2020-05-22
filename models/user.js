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

    getUserbyID:function getUserbyID(id) {
        return user
            .findById(id)
            .exec();
    },



    getUserNameById:function getUserNameById(ObjectId) {
        return user.Username
            .findOne({ObjectId:ObjectId})
            .exec()
    },



}




//test test  test testasd


