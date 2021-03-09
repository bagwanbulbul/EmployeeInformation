const mongoose = require("mongoose")
const schema = mongoose.Schema
const employee_schema = new schema({
    name: {
        type: String
    },
    EmployeeId: {
        type: String
    },
    Mobile:{
        type: String
    },
    Address:{
        type: String
    },
    Salary:{
        type: String
    },
    Department:{
        type: String
    },
    JobTitle:{
        type: String
    },
    JoiningDate:{
        type: String
    },
    BirthDate:{
        type: String
    },
    Pincode:{
        type:Number
    }
}, { strict: false });
var detail = mongoose.model("Employee", employee_schema)
module.exports = detail