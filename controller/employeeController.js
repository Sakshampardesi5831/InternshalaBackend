const { CatchAsyncError } = require("../middleware/CatchAsyncError");
const employeeModel = require("../models/employeeModel");
const internshipModel=require("../models/internship");
const jobsModel=require("../models/jobModel");
const ErrorHandler=require("../utils/ErrorHandler");
const { sendMail } = require("../utils/NodeMailer");
const { sendToken,sendEmployeeToken } = require("../utils/SendToken");
const imagekit=require("../utils/ImageKit").initImageKit();
const path=require("path");
exports.homepage = CatchAsyncError(async (req, res, next) => {
  res.status(200).json({
    message: "Secure Employee HomePage",
  });
});
exports.currentEmployee=CatchAsyncError(async(req,res,next)=>{
   const employee=await employeeModel.findById(req.id).exec();
   res.status(200).json({employee});

})
exports.employeeSignup = CatchAsyncError(async (req, res, next) => {
  //   res.json(req.body);
  const employee = await new employeeModel(req.body).save();
 const result= sendToken(employee,201,res);
  res.status(200).json(result);
});
exports.employeeSignin = CatchAsyncError(async (req, res, next) => {
  const employee = await employeeModel
    .findOne({ email: req.body.email })
    .select("+password")
    .exec();
 if(!employee){
   return next(new ErrorHandler("User Not Found with this email address"),404);
 }
 const isMatch= employee.comparepassword(req.body.password);

 if(!isMatch){
   return next(new ErrorHandler("wrong credentials",500));
 }
  // sendToken(employee,201,res);
  sendEmployeeToken(employee,200,res);
  //res.json(student);
});
exports.employeeSignout = CatchAsyncError(async (req, res, next) => {
    res.clearCookie("token");
    res.json({message:"successFully sign out !!!!"});
});
exports.employeeSendMail=CatchAsyncError(async (req,res,next)=>{
     const employee=await employeeModel.findOne({email:req.body.email});
     if(!employee){
      return next(new ErrorHandler("User Not Found with this email address"),404);
    }
    const url=`${req.protocol}://${req.get("host")}/employee/forget-link/${employee._id}`
  const mailResult= await sendMail(req,res,next,url);
  employee.resetPasswordToken="1"
   await employee.save();
    res.json({message:"working",employee,url,mailResult});
})
exports.employeesForgetLink=CatchAsyncError(async (req,res,next)=>{
   const employee=await employeeModel.findById(req.params.id).exec();
   if(!employee){
    return next(new ErrorHandler("User Not Found with this email address"),404);
  }
  if(employee.resetPasswordToken==="1"){
    employee.resetPasswordToken="0"
    employee.password=req.body.password;
    await employee.save();
  }else{
      return next(new ErrorHandler("Invalid reset Password Link Please Try again",500));
  }
 
  res.json({message:"Password is successfully change"});
})
exports.employeeUpdate=CatchAsyncError(async (req,res,next)=>{
    const employee=await employeeModel.findByIdAndUpdate(req.params.id,req.body).exec();
    await employee.save();
    res.status(200).json({
       success:true,
       message:"employee details Update",
       employee:employee
    })
})
exports.employeeResetPassword=CatchAsyncError(async (req,res,next)=>{
   const employee =await employeeModel.findById(req.params.id).exec();
   employee.password=req.body.password;
   await employee.save();
   sendToken(employee,201,res);
  //  res.status(200).json({message:"password is changed"});
})

exports. employeeAvatar=CatchAsyncError(async (req,res,next)=>{
      
     const employee=await employeeModel.findById(req.params.id).exec();
     const file=req.files.avatar;
     const modifiedName=`resumebuider-${Date.now()}${path.extname(file.name)}`;
 
      if(employee.avatar.fileId!==""){
        await imagekit.deleteFile(employee.avatar.fileId);
      }
      const {fileId,url}=await imagekit.upload({
         file:file.data,
         fileName:modifiedName
      })
    employee.avatar={fileId,url};
   await employee.save();
   res.status(200).json({
     success:true,
     message:"Avatar uploaded Successfully",
   })
});


/**-------------------------------INTERNSHIP-FUNCTIONALITY------------------------------------------------**/
exports.createInternship=CatchAsyncError(async (req,res,next)=>{
  const employe=await employeeModel.findById(req.id).exec();
  const internship = await new internshipModel (req.body);
  internship.employee=employe._id;
  employe.internships.push(internship._id);
  await internship.save();
  await employe.save();
  res.status(201).json({
    success:true,
    internship:internship
  });
});
exports.readInternship=CatchAsyncError(async (req,res,next)=>{
  //  const read=await internshipModel.find().exec();
  const employee=await employeeModel.findById(req.id).populate("internships").exec();
   res.status(200).json({
    success:true,
    internships:employee
   });
});

exports.readSingleInternship=CatchAsyncError(async (req,res,next)=>{
   const readSingle=await internshipModel.findById(req.params.readId).exec();
   if(!readSingle){
    return new ErrorHandler("InternShip Not Found !! ");
   };
   res.status(200).json({
    success:true,
    readSingle:readSingle
   });
});
/**--------------------------------JOBS-FUNCTIONALITY------------------------------------------------------- */
exports.createJobs=CatchAsyncError(async (req,res,next)=>{
  const employe=await employeeModel.findById(req.id).exec();
  const jobs = await new jobsModel (req.body);
  jobs.employee=employe._id;
  employe.jobs.push(jobs._id);
  await jobs.save();
  await employe.save();
  res.status(201).json({
    success:true,
    jobs:jobs
  });
});
exports.readJobs=CatchAsyncError(async (req,res,next)=>{
  //  const read=await internshipModel.find().exec();
  const employee=await employeeModel.findById(req.id).populate("jobs").exec();
   res.status(200).json({
    success:true,
    jobs:employee
   });
});

exports.readSingleJobs=CatchAsyncError(async (req,res,next)=>{
   const readSingle=await internshipModel.findById(req.params.readId).exec();
   if(!readSingle){
    return new ErrorHandler("Jobs Not Found !!");
   };
   res.status(200).json({
    success:true,
    readSingle:readSingle
   });
});