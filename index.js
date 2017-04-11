 const express = require('express');
 const morgan=require('morgan');
 var mongoose=require('mongoose');
 var bodyParser=require('body-parser');
 // const mongoose=require('mongoose');
var User = require('./models/user');
 const app =express();

 mongoose.connect('mongodb://localhost:27017/ecommerce',function(err){
   if(err){
     console.log('error while connecting to the databse',err);
   }else{
     console.log('Conected to databse');
   }
 });
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.post('/create-user',function(req,res){
  var user = new User();
  user.profile.name=req.body.name;
  user.email=req.body.email;
  user.password=req.body.password;
  user.save(function(err){
    if(!err){
      res.json('Successfully created the user');
    }
  })
})
app.get('/',function(req,res) {
  var name='Chandru';
  res.json('my name is'+name);
});
 app.listen(3000,function(err){
   if(!err){
     console.log('Server is running at localhost:3000');
   }
 });
