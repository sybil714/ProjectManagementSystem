const mongo = require('../lib/mongo');
const project = mongo.projects;
const groupModel= require('../models/group');


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
    },

    getProjectByLimitedNum:function getProjectByLimitedNum(){
        var listResult=[];
        var counter=0;
      return Promise.all([
            groupModel.getAllGroups(),
            this.getAllProject()
        ]).then(function (result) {
          if(!result[1]){
              return null;
          }
          for(var i=0;i<result[1].length;i++){
              var pCounter=0;
              for(var j=0;j<result[0].length;j++) {
                  if (pCounter > 3) {
                      break;
                  }
                  if (result[1][i]._id.equals(result[0][j].project._id) ) {
                      pCounter++;
                  }
              }
              if(pCounter<3){
                  listResult[counter]=result[1][i];
                  counter++;
              }
          }
          return listResult;
        })
}
};