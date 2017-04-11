var mongoose=require('mongoose');
var bcrypt=require('bcrypt-nodejs');
var Schema=mongoose.Schema;

//bcrypt is Library to hash the password
/* The user schema attributes */

var userSchema = new mongoose.Schema({
  email:{type:String,unique:true,lowercase:true},
  password:{type:String},

  profile:{
    name:{type:String,default:''},
    picture:{type:String,default:''}
  },
  address:{type:String},
  history:[{
    date:{type:Date},
    paid:{type:Number,default:0},
  }]
});

/* Hash the password before we even save to the databse  */
userSchema.pre('save',function(next) {
  var user = this;
  if(!user.isModified('password')) return next();
  bcrypt.genSalt(10,function(err,salt){
    if(err){
      return next(err);
    }
    bcrypt.hash(user.password,salt,null,function (err,hash) {
      if(err){
        return next(err);
      }
      user.password=hash;
      next();
    });
  });
})

//Campare password in the databse with the user provided one
userSchema.methods.camparePassword=function(password){
  return bcrypt.compareSync(password,this.password);
}

module.exports= mongoose.model('User',userSchema);
