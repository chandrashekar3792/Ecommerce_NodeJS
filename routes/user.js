 var router = require(express).Router();
 vr User=require('../models/user');

 router.post('/signup',function(req,res){
   var user=new User();

   user.profile.name=req.body.name;
   user.email=req.body.email;
   user.password=req.body.password;
   User.findOne({email:req.body.email},function (err,existingUser) {
     if(existingUser){
       console.log('Entered email is already exists');
       return res.redirect('/ ' );
     }
     else{
       user.save(function(err) {
         if (!err) {
             res.json('Successfully created the user');
         }
       });
     }
   });
 });



module.exports=router;
