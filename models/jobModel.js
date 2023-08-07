const mongoose=require("mongoose");

const jobModel=new mongoose.Schema(
{
 student:[{type:mongoose.Schema.Types.ObjectId,ref:"student"}],
 employee:{type:mongoose.Schema.Types.ObjectId,ref:"employee"},
 title:String,
 skill:String,
 jobtype:{
    type:String,
    enum:["In office" ,"Remote"]
 },
 opening:Number,
 description:String,
 preference:String,
//  duration:String,
 responsibility: String,
 salary:Number,
 perks:String,
 assessments:String
},{timestamps:true});

const Job=mongoose.model("job",jobModel);

module.exports=Job;