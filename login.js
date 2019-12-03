
var express = require('express');
var app= express();
var bodyParser= require('body-parser');
app.use(bodyParser.json());
var cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({
	extended:true
}));

//MongoDB Connection
var MongoClient=require('mongodb').MongoClient;
var url="mongodb://localhost:27017/";
var dbo;
MongoClient.connect(url,{ useNewUrlParser: true,useUnifiedTopology: true},function(err,db){
	if(err){
	console.log("Not Connected To MongoDB!!!!");

	}
	else{
		dbo = db.db("customer");
		console.log("Connected To MongoDB!!!!");
	}
	//db.close();

});
app.post('/',(req,res)=>{
	
var data = req.body;



            dbo.collection("user").findOne(data,function(err,result){

		    if (err){
			    console.log("Error");
			    res.status(400).send({"message":"Error in Inserting"});
		    }
		    else{
				console.log(data);
			   // console.log(""User Exists");
				res.sendStatus(200);
			}
				
});
});


app.listen(8080,(req,res)=>{
    console.log("port");
});

