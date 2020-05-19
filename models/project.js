const mongo = require('../lib/mongo');
const project = mongo.projects;


module.exports = {

    getAllUsers: function getAllUsers() {
        return project
            .find()
            .exec();
    },


    getProjectByProjectID: function getProjectByProjectID(id) {
        return project
            .findById(id)
            .populate("publisherID")
            .exec();
    }
};