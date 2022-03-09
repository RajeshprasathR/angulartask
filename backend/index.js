const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const mysql = require('mysql2');
const e = require('express');


const app = express();

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Cloud@123',
    database:'prasath',
    port:3306

})
db.connect(err=>{
    // if(err) {console.log(err,'dberr');}
    console.log('Database Connected..');
})

// get data
app.get('/user',(req,res) => {
    let qr = `select * from user`;
    db.query(qr,(err,result)=> {
        if(err){console.log(err,'errs');}
        if(result.length > 0){
            res.send({
                message: 'all user data',
                data: result
            });
        }
    });
});

// get single data
app.get('/user/:id',(req,res)=>{
    let gID = req.params.id;
    let qr = `select * from user where id = ${gID}`;
    db.query(qr,(err,result)=>{
        if(err){console.log(err);}
        if(result.length > 0)
        {
            res.send({
                message: 'get single data',
                data: result
            });
        }
        else{
            res.send({
                message: 'data not found'
            });
        }
    });
});

// create data
app.post('/user',(req,res)=>{
    console.log(req.body,'createdata');
    let uniqueId = uuidv4();
    let firstName = req.body.firstname;
    let lastName = req.body.lastname;
    let eMail = req.body.email;
    let dOb = req.body.dob;
    let mobileNo = req.body.mobileno;

    let qr = `insert into user(uniqueid,firstname,lastname,email,dob,mobileno)
    values('${uniqueId}','${firstName}','${lastName}','${eMail}','${dOb}','${mobileNo}')`;
    console.log(qr,'qr')
    db.query(qr,(err,result)=>{
        if(err){console.log(err);}
        console.log(result,'result')
        res.send({
            message:'data inserted'
        });
    
    });
});


//update data
app.put('/user/:id',(req,res)=>{
    console.log(req.body,'updatedata');

    let gID = req.params.id;
    let firstName = req.body.firstname;
    let lastName = req.body.lastname;
    let eMail = req.body.email;
    let dOb = req.body.dob;
    let mobileNo = req.body.mobileno;

    let qr = `update user set firstname = '${firstName}', lastname ='${lastName}', email ='${eMail}', dob ='${dOb}', mobileno ='${mobileNo}'
    where id = ${gID}`;

    db.query(qr,(err,result)=>{
        if(err){console.log(err);}
        res.send({
            message: 'data updated'
        });
    });
});

// delete data
app.delete('/user/:id',(req,res)=>{
    let gID = req.params.id;
    let qr = `delete from user where id = '${gID}'`;
    db.query(qr,(err,result)=>{
        if(err){console.log(err);}
        res.send({
            message: 'data deleted'
        });
    });
});

app.listen(3000,()=>{
    console.log("Server running....");
})