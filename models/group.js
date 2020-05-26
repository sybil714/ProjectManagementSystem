const mongo = require('../lib/mongo');
const group = mongo.groups;

module.exports = {

    getAllGroups: function getAllGroups() {
        return group
            .find()
            .populate('member1ID')
            .populate('member2ID')
            .populate('member3ID')
            .populate('member4ID')
            .populate('member5ID')
            .populate('member6ID')
            .populate('project')
            .populate('facilitator')
            .sort({'groupName':1})
            .exec();
    },

    getgroupsByGroupID: function getgroupsByGroupID(id) {
        return group
            .findById(id)
            .populate('member1ID')
            .populate('member2ID')
            .populate('member3ID')
            .populate('member4ID')
            .populate('member5ID')
            .populate('member6ID')
            .populate('project')
            .populate('facilitator')
            .exec();
    },

    getGroupsByObjectId1:function getGroupsByObjectId(ObjectId) {
        return group
            .findOne({member1ID:ObjectId})
            .populate("member1ID")
            .populate("member2ID")
            .populate("member3ID")
            .populate("member4ID")
            .populate("member5ID")
            .populate("member6ID")
            .populate("project")
            .populate("facilitator")
            .exec()
    },
    getGroupsByObjectId2:function getGroupsByObjectId(ObjectId) {
        return group
            .findOne({member2ID:ObjectId})
            .populate("member1ID")
            .populate("member2ID")
            .populate("member3ID")
            .populate("member4ID")
            .populate("member5ID")
            .populate("member6ID")
            .populate("project")
            .populate("facilitator")
            .exec()
    },
    getGroupsByObjectId3:function getGroupsByObjectId(ObjectId) {
        return group
            .findOne({member3ID:ObjectId})
            .populate("member1ID")
            .populate("member2ID")
            .populate("member3ID")
            .populate("member4ID")
            .populate("member5ID")
            .populate("member6ID")
            .populate("project")
            .populate("facilitator")
            .exec()
    },
    getGroupsByObjectId4:function getGroupsByObjectId(ObjectId) {
        return group
            .findOne({member4ID:ObjectId})
            .populate("member1ID")
            .populate("member2ID")
            .populate("member3ID")
            .populate("member4ID")
            .populate("member5ID")
            .populate("member6ID")
            .populate("project")
            .populate("facilitator")
            .exec()
    },
    getGroupsByObjectId5:function getGroupsByObjectId(ObjectId) {
        return group
            .findOne({member5ID:ObjectId})
            .populate("member1ID")
            .populate("member2ID")
            .populate("member3ID")
            .populate("member4ID")
            .populate("member5ID")
            .populate("member6ID")
            .populate("project")
            .populate("facilitator")
            .exec()
    },
    getGroupsByObjectId6:function getGroupsByObjectId(ObjectId) {
        return group
            .findOne({member6ID:ObjectId})
            .populate("member1ID")
            .populate("member2ID")
            .populate("member3ID")
            .populate("member4ID")
            .populate("member5ID")
            .populate("member6ID")
            .populate("project")
            .populate("facilitator")
            .exec()
    },

    getGroupsByFId:function getGroupsByFId(ObjectId) {
        return group
            .findOne({facilitator:ObjectId})
            .populate("member1ID")
            .populate("member2ID")
            .populate("member3ID")
            .populate("member4ID")
            .populate("member5ID")
            .populate("member6ID")
            .populate("project")
            .populate("facilitator")
            .exec()
    },


}


