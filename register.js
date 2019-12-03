var express = require('express');
var router = express.Router();

//MongoDb Connection
var MongoClient=require('mongodb').MongoClient;
var url="mongodb://127.0.0.1:27017";
var dbo;
MongoClient.connect(url,{ useNewUrlParser: true,useUnifiedTopology: true},function(err,db){
	if(err)
	console.log("Not Connected To MongoDB!!!!");
	else{
		console.log("Connected To MongoDB!!!!");
		dbo= db.db("generix");
	}
	db.close();
});

//Hashing
const bcrypt=require('bcryptjs');
const saltRounds=10;

//Email
var nodemailer=require('nodemailer');
var transporter=nodemailer.createTransport({
	service:'gmail',
	auth:{
		user:'generixteam2019@gmail.com',
		pass:'Lifeisgud'
	}
});

//Request Handler
router.post('/', (req, res) =>{
	var data=req.body;

	bcrypt.hash(req.body.password,saltRounds,function(error,hash){
		if(error){
			console.log("Hashing Error");
			res.status(400).send({"message":"Some Error Occured"});
		}
		else{
			req.body.password=hash;
			dbo.collection("user").insertOne(data,function(err,result){
			   	 if (err){
					console.log("Error");
					res.status(400).send({"message":"Username Exist"});
				}
				else{
					var mailOptions={
						from:'generixteam2019@gmail.com',
						to:req.body.email_id,
						subject:'Generix Team',
						text:'Testing Nodemailer'
					};
					transporter.sendMail(mailOptions,function(error,info){
						if(error){
							console.log(error);
						}
						else{
						console.log('Email sent:'+ info.response);
						}
					});
			    		console.log("Succesfully Inserted");
					res.status(200).send({"message":"Succesfully Inserted"});
				}
			});
		}
	});
});

module.exports=router;
