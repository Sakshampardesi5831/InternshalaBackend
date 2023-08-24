const express = require("express");
const router = express.Router();
const {
  resumehomepage,
  addEducation,
  editEducation,
  deleteEducation,
  addJobs,
  editJobs,
  deleteJobs,
  addInternship,
  editInternship,
  deleteInternship,
  addResponsiblity,
  editResponsibilty,
  deleteResponsibility,
  addCourses,
  editCourses,
  deleteCourses,
  addAccomplishment,editAccomplishment,deleteAccomplishment,
  addSkill,editSkill,deleteSkill,
  addProject,editProject,deleteProject
} = require("../controller/resumeController");
const { currentUser } = require("../controller/indexController");
const { isAuthenticated } = require("../middleware/auth");

//GET /student current Login student
router.get("/student", isAuthenticated, currentUser);
//POST /resume Accessing the current Student resume
router.get("/", isAuthenticated, resumehomepage);

//POST /add-edu Add education for the current Login user
router.post("/add-edu", isAuthenticated, addEducation);



//POST /edit-edu/:ediid Edit Education for the Current Login user

router.post("/edit-edu/:eduid", isAuthenticated, editEducation);

//POST /delete-edu/:delid
router.post("/delete-edu/:delid", isAuthenticated, deleteEducation);

/*---------------------------JOBS ROUTES---------------------------------------------*/
//POST /add-jobs  Add jobs for the current Login user

router.post("/add-jobs", isAuthenticated, addJobs);

//POST /edit-jobs/:jobsId Edit the Current jobs of current Login User

router.post("/edit-jobs/:jobsId", isAuthenticated, editJobs);

//POST /delete-jobs/:delId Delete the Current Jobs of the Current Login User

router.post("/delete-jobs/:delId", isAuthenticated, deleteJobs);

/*---------------------------InternShips Routes-----------------------------------*/

//POST /add-internship Add InternShip for the Current Login User
router.post("/add-internship", isAuthenticated, addInternship);

//POST /edit-intern/:internId Edit InternShip for the Current Login User

router.post("/edit-intern/:internId", isAuthenticated, editInternship);

//POST /delete-intern/:delId Delete InternShip for the Current Login User

router.post("/delete-intern/:delId", isAuthenticated, deleteInternship);

/*----------------------Responsibility Routes-------------------------------------**/
 
//  POST /add-responsibility  Add Responsibility for the current User
  
router.post("/add-responsibility", isAuthenticated,addResponsiblity);

//POST /edit-responsibility/:editId Edit Responsibility for the current User

router.post("/edit-responsibility/:responsibilityId",isAuthenticated,editResponsibilty);

//POST /delete-responsibility/delId Delete Responsibility for the Current User

router.post("/delete-responsibility/:responsibilityId",isAuthenticated,deleteResponsibility);

/**--------------------Courses Routes-----------------------------------------------------------*/

//POST /add-courses Add Courses for the Current User

router.post("/add-courses",isAuthenticated,addCourses);

//POST /edit-courses/:coursesId Edit Course for the Current user
router.post("/edit-courses/:coursesId",isAuthenticated,editCourses);

//POST /delete-courses/:coursesId Delete Courses for the Current User
router.post("/delete-courses/:coursesId",isAuthenticated,deleteCourses);

/**---------------Accomplishment Routes---------------------------------------------------------- */


//POST /resume/add-accomplishment
router.post("/add-accomplishment",isAuthenticated,addAccomplishment);

//POST /resume/edit-accomplishment/:accomplishmentsId
router.post("/edit-accomplishment/:accomplishmentsId",isAuthenticated,editAccomplishment);

//POST /resume/delete-accomplishment/:accomplishmentsId
router.post("/edit-accomplishment/:accomplishmentsId",isAuthenticated,deleteAccomplishment);
/**----------------SKILLS ROUTES--------------------------------------------------------------------------- */

//POST /resume/add-skill
router.post("/add-skill",isAuthenticated,addSkill);

//POST /resume/edit-skill/:skillsId
router.post("/edit-skill/:skillsId",isAuthenticated,editSkill);

//POST /resume/delete-skill/:skillId
router.post("/delete-skill/:skillId",isAuthenticated,deleteSkill);

/**----------------PROJECTS ROUTES----------------------------------------------------------- */
//POST /resume/add-project
router.post("/add-project",isAuthenticated,addProject);

//POST /resume/edit-project/:projectsId
router.post("/edit-project/:projectsId",isAuthenticated,editProject);

//POST /resume/delete-project/:projectsId
router.post("/delete-project/:projectsId",isAuthenticated,deleteProject);
/**--------------------------------------------------------------------------------------------- */





module.exports = router;
