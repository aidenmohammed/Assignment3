const mongoose = require("mongoose");

let assignmentModel = mongoose.Schema({
    Name: String,
    Description: String,
    Duedate: String,
    Class: String
},
{
    collection:"Assignment"
});
module.exports =mongoose.model('Assignment',assignmentModel);
