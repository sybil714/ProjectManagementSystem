const mongo = require('../lib/mongo');
const studentmarking = mongo.StudentMarking;


module.exports = {

    getstudentmarkingByGroupID: function getstudentmarkingByGroupID(id) {
        return studentmarking
            //.findById(id)
            .find({
                mumberID:id
            })
            .populate("mumberID")
            .exec();
    }

};