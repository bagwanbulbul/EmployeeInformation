const express = require('express');
const mongoose = require('mongoose');
const PORT = 4000;
var bodyParser = require('body-parser')
const app = express();
const Employee = require("./models/employee_schema")
app.use(bodyParser())

// var MongoClient = require("mongodb").MongoClient;
// const autoIncrement = require('mongodb-autoincrement')
// MongoClient.connect(url, function (err, db) {
//     autoIncrement.getNextSequence(db, collectionName, function (err, autoIndex) {
//         var collection = db.collection(collectionName);
//         collection.insert({
//             EmployeeId: autoIndex
//     });
// });

mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost:27017/EmployeeDb', {
        useUnifiedTopology: false,
        useNewUrlParser: true
    })
    .then(() => {
        console.log('Connected to the Database successfully');
    });

    function getSequenceNextValue(seqName) {
        var seqDoc = Employee.findByIdAndUpdate({
          query: { EmployeeId: seqName },
          update: { $inc: { seqValue: 1 } },
          new: true
        });     
        return seqDoc.seqValue;
      }

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
    // var randomID = Math.floor((Math.random() * 100) + 1);
    const newUser = new Employee({
        name: name,
        //EmployeeId: getSequenceNextValue("EmployeeId"),
        EmployeeId: getSequenceNextValue("EmployeeId"),
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
        // console.log(result)
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
    Employee.find().sort({BirthDate: -1})
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

app.get("/searchName",function(req,res){
    const name = req.body.name;
    Employee.find({'name': {$regex:name, $options:'i'}})
    .then(result=>{
        if(result.length == 0){
            res.send("Name Not Found !!")
        }
        res.send(result)
    }).catch(err=>{
        console.log(err)
        res.send(err)
    })
})
app.get("/EmployiesFromIndore",function(req,res){
    Employee.find().then((data)=>{
        var result = []
        for(var i in data){
            if(data[i].Address === "Indore"){
                result.push(data[i])
            }
        } 
        res.send(result)
    }).catch(err=>{
        console.log(err)
        res.send(err)
    })
})

app.get("/salaryByRange",function(req,res){
    var num1 = req.body.num1;
    var num2 = req.body.num2;
    Employee.find({Salary:{$gt :num1, $lt : num2}})
    .then(data=>{
        res.send(data)
    }).catch(err=>{
        console.log(err)
        res.send(err)
    })
})

app.get("/neededBuses",function(req,res){
    Employee.find().then(data=>{
        var count = 1
        for(var i=1; i<=data.length-1; i++){
            if(data[i].key!= data[i-1].key){
              count = count+1
            }
            res.json({totalBus: count})
        }
        // data.forEach(item=>{
        //     console.log(data[j].Pincode)
        //     const d1 = item.Pincode
        //     const d2 = data[j].Pincode
        //     if(d1 != d2){
        //         count = count+1
        //     }
        //     j++
        //     res.json({totalBus: count})

        // })
        
    }).catch(err=>{
        console.log(err)
        res.send("SOMETHING WENT WRONG")
    })
})

app.get("/TotalEmployiesSalary",function(req,res){
    Employee.find().then(data=>{
        console.log(data)
        var sum = 0
        data.forEach(item=>{
            const employeeSalary = item.Salary
            sum = sum+employeeSalary
        })
        res.json({ToatalSalary: sum})
    }).catch(err=>{
        console.log(err)
        res.send(err)
    })
})

app.get("/googleSearch",function(req,res){
    var searchName = req.body.searchName
    var searchNameList = []
    Employee.find().then(data=>{
            data.forEach(item=>{
                if(searchName[0] == item.name[0]){
                    console.log(item)
                    searchNameList.push(item)
                }
            })
            res.send(searchNameList)   
    }).catch(err=>{
        console.log(err)
        res.send(err)
    })
});

app.get("/replacecity",function(req,res){
    const Address = req.body.Address
    const replaceCityName = req.body.replaceCityName
    Employee.find({'Address': {$regex:Address, $options:'i'}})
    .then((data)=>{
       data.forEach(item=>{
           console.log(item)
           if(item.Address === Address){
               item.Address=replaceCityName
               console.log(item)
           }
       })
    })
})
app.listen(PORT, () => {
    console.log('Server is listening on Port:', PORT)
})