const { CatchAsyncError } = require("../middleware/CatchAsyncError");
const studentModel = require("../models/studentModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { v4: uuidv4 } = require("uuid");
exports.resumehomepage = CatchAsyncError(async (req, res, next) => {
  const { resume } = await studentModel.findById(req.id).exec();
  res.status(200).json({
    message: "Secure resume page",
    resume: resume,
  });
});
/*----------------EDUCATION CRUD OPERATION SECTION---------------------------------------------------------*/
exports.addEducation = CatchAsyncError(async (req, res, next) => {
  const student = await studentModel.findById(req.id).exec();
  student.resume.education.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.status(200).json({
    message: "Education Added !!",
  });
});

// exports.getSingleEducation=CatchAsyncError(async (req,res,next)=>{
//   const student = await studentModel.findById(req.id).exec();

// });

exports.editEducation = CatchAsyncError(async (req, res, next) => {
  const student = await studentModel.findById(req.id).exec();
   const eduIndex=  student.resume.education.findIndex(i=>i.id==req.params.eduid);
   student.resume.education[eduIndex]={...student.resume.education[eduIndex],...req.body};
  await student.save();
  res.status(200).json({
    message: "Education Updated !!",
  });
});
exports.deleteEducation = CatchAsyncError(async (req, res, next) => {
  const student = await studentModel.findById(req.id).exec();
   const filterededucation=  student.resume.education.filter((i)=>i.id !== req.params.delid);
   student.resume.education=filterededucation;
  await student.save();
  res.status(200).json({
    message: "Education Deleted !!",
  });
});
/*---------------JOBS CURD OPERATION SECTION----------------------------------------------------------------*/
exports.addJobs=CatchAsyncError(async (req,res,next)=>{
  const student=await studentModel.findById(req.id).exec();
  student.resume.jobs.push({...req.body,id:uuidv4()});
  await student.save();
  res.status(200).json({
     message:"New Jobs Added !!!"
  });
});
exports.editJobs=CatchAsyncError(async (req,res,next)=>{
  const student =await studentModel.findById(req.id).exec();
  const jobsIndex=student.resume.jobs.findIndex(i=>i.id==req.params.jobsId);
  student.resume.jobs[jobsIndex]={...student.resume.jobs[jobsIndex],...req.body};
  await student.save();
  res.status(200).json({
    message:"Jobs Updated !!!"
  })
});

exports.deleteJobs=CatchAsyncError(async (req,res,next)=>{
  const student=await studentModel.findById(req.id).exec();
  const filterJobs=student.resume.jobs.filter((i)=>i.id!==req.params.delId);
  student.resume.jobs=filterJobs;
  await student.save();
  res.status(200).json({
    message:"Jobs is Deleted"
  });
});
/*--------------INTERNSHIP CURD OPERATION SECTION------------------------------------------------------------*/
exports.addInternship=CatchAsyncError(async (req,res,next)=>{
  const student=await studentModel.findById(req.id).exec();
  student.resume.internships.push({...req.body,id:uuidv4()});
  await student.save();
  res.status(200).json({
     message:"New InternShips Added !!!"
  });
});
exports.editInternship=CatchAsyncError(async (req,res,next)=>{
  const student =await studentModel.findById(req.id).exec();
  const internIndex=student.resume.internships.findIndex(i=>i.id==req.params.internId);
  student.resume.internships[internIndex]={...student.resume.internships[internIndex],...req.body};
  await student.save();
  res.status(200).json({
    message:"InternShip Updated !!!"
  });
});

exports.deleteInternship=CatchAsyncError(async (req,res,next)=>{
  const student=await studentModel.findById(req.id).exec();
  const filterIntern=student.resume.internships.filter((i)=>i.id!==req.params.delId);
  student.resume.internships=filterIntern;
  await student.save();
  res.status(200).json({
    message:"InternShip is Deleted !!!"
  });
});

/*--------------RESPONSIBILITY CURD OPERATION SECTION--------------------------------------------------------------------**/
exports.addResponsiblity=CatchAsyncError(async (req,res,next)=>{
   const student=await studentModel.findById(req.id).exec();
   student.resume.responsibility.push({...req.body,id:uuidv4()});
   await student.save();
   res.status(200).json({
      message:"New Responsibility Added !!!"
   });
})

exports.editResponsibilty=CatchAsyncError(async (req,res,next)=>{
  const student =await studentModel.findById(req.id).exec();
  const responsibilityIndex=student.resume.responsibility.findIndex(i=>i.id==req.params.responsibilityId);
  student.resume.responsibility[responsibilityIndex]={...student.resume.responsibility[responsibilityIndex],...req.body};
  await student.save();
  res.status(200).json({
    message:"Responsibility Updated"
  })
})

exports.deleteResponsibility=CatchAsyncError(async (req,res,next)=>{
  const student=await studentModel.findById(req.id).exec();
  const fitlerResponsibilty=student.resume.responsibility.filter((i)=>i.id!==req.params.responsibilityId);
  student.resume.responsibility=fitlerResponsibilty;
  await student.save();
  res.json(200).json({
    message:"Responsibility Deleted !!!!"
  })
})
/*-----------------COURSES CURD OPERATION SECTION----------------------------------------------------------------------------**/
exports.addCourses=CatchAsyncError(async (req,res,next)=>{
  const student=await studentModel.findById(req.id).exec();
  student.resume.courses.push({...req.body,id:uuidv4()});
  await student.save();
  res.status(200).json({
     message:"New Courses Added !!!"
  });
});

exports.editCourses=CatchAsyncError(async (req,res,next)=>{
  const student =await studentModel.findById(req.id).exec();
  const coursesIndex=student.resume.courses.findIndex(i=>i.id==req.params.coursesId);
  student.resume.courses[coursesIndex]={...student.resume.courses[coursesIndex],...req.body};
  await student.save();
  res.status(200).json({
    message:"courses Updated !!!"
  })
});

exports.deleteCourses=CatchAsyncError(async (req,res,next)=>{
  const student=await studentModel.findById(req.id).exec();
  const filterCourses=student.resume.courses.filter((i)=>i.id!==req.params.coursesId);
  student.resume.courses=filterCourses;
  await student.save();
  res.json(200).json({
    message:"Courses Deleted !!!!"
  })
})

/*---------------ACCOMPLISHMENT CURD OPERATION SECTION---------------------------------------------------------------------------------------*/
exports.addAccomplishment=CatchAsyncError(async (req,res,next)=>{
  const student=await studentModel.findById(req.id).exec();
  student.resume.accomplishments.push({...req.body,id:uuidv4()});
  await student.save();
  res.status(200).json({
    message:"New accomplishments Added !!!"
  })
});

exports.editAccomplishment=CatchAsyncError(async (req,res,next)=>{
  const student =await studentModel.findById(req.id).exec();
  const accomplishmentsIndex=student.resume.accomplishments.findIndex(i=>i.id==req.params.accomplishmentsId);
  student.resume.accomplishments[accomplishmentsIndex]={...student.resume.accomplishments[accomplishmentsIndex],...req.body};
  await student.save();
  res.status(200).json({
    message:"Accomplishments Updated !!!"
  })
});

exports.deleteAccomplishment=CatchAsyncError(async (req,res,next)=>{
  const student=await studentModel.findById(req.id).exec();
  const filterAccomplishment=student.resume.accomplishments.filter((i)=>i.id!==req.params.accomplishmentsId);
  student.resume.accomplishments=filterAccomplishment;
  await student.save();
  res.json(200).json({
    message:"Accomplishments  Deleted !!!!"
  })
});
/**--------------SKILLS CRUD OPERATION SECTION--------------------------------------------------------------------------------------- */
exports.addSkill=CatchAsyncError(async (req,res,next)=>{
  const student=await studentModel.findById(req.id).exec();
  student.resume.skills.push({...req.body,id:uuidv4()});
  await student.save();
  res.status(200).json({
    message:"New Skill Added !!!"
  })
});

exports.editSkill=CatchAsyncError(async (req,res,next)=>{
  const student =await studentModel.findById(req.id).exec();
  const skillsIndex=student.resume.skills.findIndex(i=>i.id==req.params.skillsId);
  student.resume.skills[skillsIndex]={...student.resume.skills[skillsIndex],...req.body};
  await student.save();
  res.status(200).json({
    message:"Skills Updated !!!"
  })
});

exports.deleteSkill=CatchAsyncError(async (req,res,next)=>{
  const student=await studentModel.findById(req.id).exec();
  const filterSkill=student.resume.skills.filter((i)=>i.id!==req.params.skillsId);
  student.resume.skills=filterSkill;
  await student.save();
  res.json(200).json({
    message:"Skills  Deleted !!!!"
  })
});

/**--------------PROJECTS CRUD OPERATION SECTION------------------------------------------------------------------ */

exports.addProject=CatchAsyncError(async (req,res,next)=>{
  const student=await studentModel.findById(req.id).exec();
  student.resume.projects.push({...req.body,id:uuidv4()});
  await student.save();
  res.status(200).json({
    message:"New Skill Added !!!"
  })
})

exports.editProject=CatchAsyncError(async (req,res,next)=>{
  const student =await studentModel.findById(req.id).exec();
  const projectIndex=student.resume.projects.findIndex(i=>i.id==req.params.projectsId);
  student.resume.projects[projectIndex]={...student.resume.projects[projectIndex],...req.body};
  await student.save();
  res.status(200).json({
    message:"Project Updated !!!"
  })
});

exports.deleteProject=CatchAsyncError(async (req,res,next)=>{
  const student=await studentModel.findById(req.id).exec();
  const filterProject=student.resume.projects.filter((i)=>i.id!==req.params.projectsId);
  student.resume.projects=filterProject;
  await student.save();
  res.json(200).json({
    message:"Skills  Deleted !!!!"
  })
});

/**--------------ALL RESUME ROUTES FINISH------------------------------------------------------------------------------------------------------- */