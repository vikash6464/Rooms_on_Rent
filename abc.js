
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
	db.close();

});
app.post('/',(req,res)=>{
var data = req.body;
console.log(data);

            dbo.collection("user").insertOne(data,function(err,result){
		    if (err){
			    console.log("Error");
			    res.sendStatus(400);
		    }
		    else{
				console.log("Succesfully Inserted");
				res.sendStatus(200);
	            
				
			}
				
});
});


app.listen(8081,(req,res)=>{
    console.log("port");
});

