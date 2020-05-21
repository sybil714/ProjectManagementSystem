const mongo = require('../lib/mongo');
const project = mongo.projects;


module.exports = {

    getAllProject: function getAllProject() {
        return project
            .find()
            .exec();
    },

    getProjectByProjectID: function getProjectByProjectID(id) {
        return project
            .findById(id)
            .populate("publisherID")
            .exec();
    },

    getProjectByPublishID: function (id) {
        return project
            .find({publisherID: id})
            .populate("publisherID")
            .exec();
    }
};