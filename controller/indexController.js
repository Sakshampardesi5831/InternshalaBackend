const { CatchAsyncError } = require("../middleware/CatchAsyncError");
const studentModel = require("../models/studentModel");
const ErrorHandler=require("../utils/ErrorHandler");
const { sendMail } = require("../utils/NodeMailer");
const { sendToken } = require("../utils/SendToken");
const internshipModel=require("../models/internship");
const jobsModel=require("../models/jobModel");
const imagekit=require("../utils/ImageKit").initImageKit();
const path=require("path");
exports.homepage = CatchAsyncError(async (req, res, next) => {
  res.status(200).json({
    message: "HomePage only can access",
  });
});
exports.currentUser=CatchAsyncError(async(req,res,next)=>{
   const student=await studentModel.findById(req.id).populate("internships").populate("jobs").exec();
   res.status(200).json({student});

})
exports.studentSignup = CatchAsyncError(async (req, res, next) => {
  //   res.json(req.body);
  const student = await new studentModel(req.body).save();
 const result= sendToken(student,201,res);
  res.status(200).json(result);
});
exports.studentSignin = CatchAsyncError(async (req, res, next) => {
  const student = await studentModel
    .findOne({ email: req.body.email })
    .select("+password")
    .exec();
 if(!student){
   return next(new ErrorHandler("User Not Found with this email address"),404);
 }
 const isMatch= student.comparepassword(req.body.password);

 if(!isMatch){
   return next(new ErrorHandler("wrong credentials",500));
 }
  sendToken(student,201,res);
  //res.json(student);
});
exports.studentSignout = CatchAsyncError(async (req, res, next) => {
    res.clearCookie("token");
    res.json({message:"successFully sign out !!!!"});
});
exports.studentSendMail=CatchAsyncError(async (req,res,next)=>{
     const student=await studentModel.findOne({email:req.body.email});
     if(!student){
      return next(new ErrorHandler("User Not Found with this email address"),404);
    }
    const url=`${req.protocol}://${req.get("host")}/student/forget-link/${student._id}`
  const mailResult= await sendMail(req,res,next,url);
  student.resetPasswordToken="1"
   await student.save();
    res.json({message:"working",student,url,mailResult});
})
exports.studentsForgetLink=CatchAsyncError(async (req,res,next)=>{
   const student=await studentModel.findById(req.params.id).exec();
   if(!student){
    return next(new ErrorHandler("User Not Found with this email address"),404);
  }
  if(student.resetPasswordToken==="1"){
    student.resetPasswordToken="0"
    student.password=req.body.password;
    await student.save();
  }else{
      return next(new ErrorHandler("Invalid reset Password Link Please Try again",500));
  }
 
  res.json({message:"Password is successfully change"});
})
exports.studentUpdate=CatchAsyncError(async (req,res,next)=>{
    const student=await studentModel.findByIdAndUpdate(req.params.id,req.body).exec();
    await student.save();
    res.status(200).json({
       success:true,
       message:"Student details Update",
       student:student
    })
})
exports.studentResetPassword=CatchAsyncError(async (req,res,next)=>{
   const student =await studentModel.findById(req.params.id).exec();
   student.password=req.body.password;
   await student.save();
   sendToken(student,201,res);
  //  res.status(200).json({message:"password is changed"});
})

exports. studentAvatar=CatchAsyncError(async (req,res,next)=>{
      
     const student=await studentModel.findById(req.params.id).exec();
     const file=req.files.avatar;
     const modifiedName=`resumebuider-${Date.now()}${path.extname(file.name)}`;
 
      if(student.avatar.fileId!==""){
        await imagekit.deleteFile(student.avatar.fileId);
      }
      const {fileId,url}=await imagekit.upload({
         file:file.data,
         fileName:modifiedName
      })
    student.avatar={fileId,url};
   await student.save();
   res.status(200).json({
     success:true,
     message:"Avatar uploaded Successfully",
   })
});

exports.studentAppliedInternship=CatchAsyncError(async(req,res,next)=>{
  const student=await studentModel.findById(req.id).exec();
  const internship=await internshipModel.findById(req.params.internshipId).exec();
  internship.student.push(student._id);
  student.internships.push(internship._id);
  await student.save();
  await internship.save();
  res.status(200).json({student});

})

exports.studentAppliedJobs=CatchAsyncError(async (req,res,next)=>{
  const student=await studentModel.findById(req.id).exec();
  const jobs=await jobsModel.findById(req.params.jobsId).exec();
  jobs.student.push(student._id);
  student.jobs.push(jobs._id);
  await student.save();
  await jobs.save();
  res.status(200).json({student});
})


/**---------------------------------READ ALL JOBS------------------------------------------------- */

exports.studentAllJobs=CatchAsyncError(async (req,res,next)=>{
  const jobs=await jobsModel.find();
  res.status(200).json({jobs});
})

exports.studentAllInternships=CatchAsyncError(async (req,res,next)=>{
  const internship=await internshipModel.find();
  res.status(200).json({internship});
})

/**------------------------------------------------------------------------- */

exports.studentAllContent=CatchAsyncError(async (req,res,next)=>{
   const myvalue=req.params.category;
   if(myvalue==='internship'){
    const internship=await internshipModel.find();
    res.status(200).json({internship});
   }else if(myvalue==='jobs'){
    const jobs=await jobsModel.find();
    res.status(200).json({jobs});
   }else{
    res.json({myvalue});
   }
})