const express = require('express');
const mongoose = require('mongoose');
const PORT = 4000;
var bodyParser = require('body-parser')
const app = express();
const Employee = require("./models/employee_schema")
app.use(bodyParser())

mongoose.set('useFindAndModify', false);
mongoose
    .connect('mongodb://localhost:27017/EmployeeDb', {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then(() => {
        console.log('Connected to the Database successfully');
    });

app.post("/AddData",(req,res)=>{
    const {
        name,
        Mobile,
        Address,
        Salary,
        Department,
        JobTitle,
        JoiningDate,
        BirthDate,
        Pincode
    }=req.body;
    var randomID = (Math.random()+1).toString(36).substring(2)
    const newUser = new Employee({
        name: name,
        EmployeeId: randomID,
        Mobile:Mobile,
        Address: Address, 
        Salary: Salary,
        Department: Department,
        JobTitle: JobTitle,
        JoiningDate: JoiningDate,
        BirthDate: BirthDate,
        Pincode: Pincode
    });
    let response = new Employee(newUser)
    response.save()
    .then((result)=>{
        res.send(result)
    }).catch((err)=>{
        res.send(err)
    })
})
app.get("/getData",(req,res)=>{
    Employee.find().then((data)=>{
        res.send(data)
    }).catch((err)=>{
        console.log(err)
    })
})
app.get("/sortedBySalary",(req,res)=>{
    Employee.find().sort({Salary: 1}).then((data)=>{
        console.log(data)
        res.send(data)
    }).catch((err)=>{
        console.log(err)
    })
})
app.get("/sortedByName",(req,res)=>{
    Employee.find({ "name": { "$exists": true } }).sort({name: 1})
    .then((data)=>{
        console.log(data)
        res.send(data)
    }).catch((err)=>{
        console.log(err)
    })
})
app.get("/sortedByJoiningDate",(req,res)=>{
    Employee.find().sort({JoiningDate: -1})
    .then((data)=>{
        console.log(data)
        res.send(data)
    }).catch((err)=>{
        console.log(err)
    })
})
app.get("/sortedByBirthDate",(req,res)=>{
    Employee.find().sort({JoiningDate: -1})
    .then((data)=>{
        console.log(data)
        res.send(data)
    }).catch((err)=>{
        console.log(err)
    })
})
app.post("/updateData",(req,res)=>{
    const {
        name,
        Mobile,
        Address,
        Salary,
        Department,
        JobTitle,
        JoiningDate,
        BirthDate,
        Pincode,
        user_id
    }=req.body;
    Employee.updateOne({_id:user_id},
    {$set:{
        name:name,Mobile:Mobile,
        Address: Address, 
        Salary:Salary, 
        Department:Department, 
        JobTitle:JobTitle,
        JoiningDate:JoiningDate,
        BirthDate:BirthDate,
        Pincode:Pincode}})
    .then(result =>{
        res.send({data:"Record has been Updated..!!"});  
        //res.json({statusCode:"200",statusMsj:"Successfuly Update", data:result})
    }).catch(err =>{
        res.send(err)
    })
})

app.post("/deleteData",function(req,res){   
    Employee.remove({ _id: req.body.user_id }, function(err) {  
            if(err){  
                res.send(err);  
            }  
            else{    
                    res.send({data:"Record has been Deleted..!!"});             
                }  
        });  
   })  

app.listen(PORT, () => {
    console.log('Server is listening on Port:', PORT)
})