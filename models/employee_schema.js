const mongoose = require("mongoose")
//const autoIncrement = require("mongodb-autoincrement");
//var MongoClient = require("mongodb").MongoClient;
// mongoose.plugin(autoIncrement.mongoosePlugin);

const schema = mongoose.Schema
const employee_schema = new schema({
    name: {
        type: String
    },
    EmployeeId: {
        type: Number
    },
    Mobile:{
        type: Number
    },
    Address:{
        type: String
    },
    Salary:{
        type: Number
    },
    Department:{
        type: String
    },
    JobTitle:{
        type: String
    },
    JoiningDate:{
        type: Date
    },
    BirthDate:{
        type: Date
    },
    Pincode:{
        type:Number
    }
}, { strict: false });
// var detail = mongoose.model("Employee", employee_schema)
// module.exports = detail
// autoIncrement.getNextSequence(db, collection, function(err,autoIndex){
//     var collection = EmployeeDb.collection(employee_schema);
//     collection.insert({
//         EmployeeId: autoIndex,
// });
// })
module.exports = mongoose.model('Employee', employee_schema)


// MongoClient.connect(url, function (err, db) {

//     autoIncrement.getNextSequence(db, collectionName, function (err, autoIndex) {
    
//     var collection = db.collection(collectionName);
// var connection = mongoose.createConnection("mongodb://localhost:27017/EmployeeDb");
// autoIncrement.initialize(connection);
// employee_schema.plugin(autoIncrement.plugin,{
//     module: 'employee_schema',
//     field: 'EmployeeId',
//     type: Number,
//     startAt: 1
// })
// autoIncrement.setDefaults({
//     collection: employee_schema,     
//     field: EmployeeId,               
//     step: integerNumber           
// });
//schema.plugin(autoIncrement.mongoosePlugin);
//module.exports = mongoose.model('Employee', employee_schema)
