const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

const studentModel=mongoose.Schema({
    firstname:{
      type:String,
      required:[true,"firstname is required"],
      minLength:[4,"First name shouls we at Least "]
    },
    lastname:{
       type:String,     
       required:[true,"lastname is required"]
    },
    city:{
        type:String,
        required:[true,"City is required"],
        minLength:[3,"City should we atleast 3 character long"]
    },
    contact:{
       type:String,
       required:[true,"contact is required"],
       maxLength:[10,"Contact should not exceed 10 character"],
       minLength:[10,"Contact should we atleast 10 character long"]
    },
    gender:{
        type:String,
        enum:["Male","Female","others"]
    },
    email:{
        type:String,
        unique:true,
        required:[true,"Email is required"],
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password:{
        type:String,
        select:false,
        maxLength:[15,'password should not exceed from 15 character'],
        minLength:[6,"password should aleast 6 character"],
        //match:[/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/,"Please fill a valid password"]
    },
    resetPasswordToken:{
        type:String,
        default:"0"
    },
    avatar:{
       type:Object,
       default:{
         fileId:"",
         url:"https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
       }
    },
    resume:{
        education:[],
        jobs:[],
        internships:[],
        responsibility: [],
        courses:[],
        projects:[],
        skills:[],
        accomplishments:[]
    },
    internships:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"internShip"
     }],
     jobs:[{
       type:mongoose.Schema.Types.ObjectId,
      ref:"job"
     }],
},
{timestamps:true}
);
studentModel.pre("save",function(){

  if(!this.isModified("password")){
    return;
  }
   let salt =bcrypt.genSaltSync(10);
   this.password=bcrypt.hashSync(this.password,salt);
})

// function for comparing the password
studentModel.methods.comparepassword=function(password){
    return bcrypt.compareSync(password,this.password);
}

studentModel.methods.generatedJwtToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
         expiresIn:process.env.JWT_EXPIRE
    });
}
 const student=mongoose.model("student",studentModel);
 module.exports=student;