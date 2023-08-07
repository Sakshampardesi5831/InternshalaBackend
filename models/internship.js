const mongoose=require("mongoose");

const internModel=new mongoose.Schema(
{
 employee:{type:mongoose.Schema.Types.ObjectId,ref:"employee"},
 student:[{type:mongoose.Schema.Types.ObjectId,ref:"student"}],
 profile:String,
 skill:String,
 internshiptype:{
    type:String,
    enum:["In office" ,"Remote"]
 },
 opening:Number,
 from:String,
 to:String,
 duration:String,
 responsibility: String,
 stipend:{
   status:{
      type:String,
      enum:["Fixed","Negotiable","Performance Based","Unpaid"]
   },
   amount:Number
 },
 perks:String,
 assessments:String
},{timestamps:true});

const InternShip=mongoose.model("internShip",internModel);

module.exports=InternShip;