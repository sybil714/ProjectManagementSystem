const mongo = require('../lib/mongo');
const user = mongo.users;
const groupModel= require('../models/group');

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

    getUsersByRole:function getUsersByRole(role){
     return  user
            .find({role:role})
            .sort({'userName':1})
            .sort({'email':1})
            .exec();
    },


    getNoGroupUsersByRole:function getUsersByrole(role) {
        return  Promise.all([
            groupModel.getAllGroups(),
            this.getUsersByRole(role)
        ]).then(function (result) {
            var listResult=[]
           // console.log(result[1][7])
          // console.log(result[1][7]===result[0][0].member1ID)
           // console.log(result[0][0].member1ID)
            var counter=0
            if(role==='Student'){

                for(var i=0;i<result[1].length;i++){
                    var queryResult=true
                    for(var j=0;j<result[0].length;j++){
                        var judge=result[1][i]._id.equals(result[0][j].member1ID._id)||result[1][i]._id.equals(result[0][j].member2ID._id)||result[1][i]._id.equals(result[0][j].member3ID._id)||result[1][i]._id.equals(result[0][j].member4ID._id)||result[1][i]._id.equals(result[0][j].member5ID._id)||result[1][i]._id.equals(result[0][j].member6ID._id);
                        // console.log(result[1][i].email)
                        // console.log(result[0][j].member1ID.email)
                        // console.log(result[1][8]._id.equals(result[0][0].member1ID._id))
                        // console.log(judge)
                        if(judge){
                            queryResult=queryResult&&false;
                            break
                        }
                    }

                    if(queryResult){
                        listResult[counter]=result[1][i];

                        counter++;
                    }

                }

            }

            if(role==='Facilitator'){
                for(var i=0;i<result[1].length;i++){
                    var fCounter=0;
                    for(var j=0;j<result[0].length;j++) {
                        if (fCounter > 4) {
                            break;
                        }
                        if (result[1][i]._id.equals(result[0][j].facilitator._id) ) {
                            fCounter++;
                        }
                    }
                    if(fCounter<4){
                        listResult[counter]=result[1][i];
                        counter++;
                    }
                }
            }
            console.log('over')
            return listResult
        })




},

}




//test test  test testasd


