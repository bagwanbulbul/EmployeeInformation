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
var detail = mongoose.model("Employee", employee_schema)
module.exports = detail