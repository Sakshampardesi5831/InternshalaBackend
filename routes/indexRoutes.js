const express = require("express");
const router = express.Router();
const {
  homepage,
  studentSignup,
  studentSignin,
  studentSignout,
  currentUser,
  studentSendMail,
  studentsForgetLink,
  studentResetPassword,
  studentUpdate,
  studentAvatar,
  studentAppliedInternship,
  studentAppliedJobs,
  studentAllInternships,
  studentAllJobs,
  studentAllContent
} = require("../controller/indexController");
const { isAuthenticated } = require("../middleware/auth");

router.get("/", homepage);
//NOW MAKING THE MIDDLEWARE
//Current User
router.get("/student", isAuthenticated, currentUser);
// post sign up
router.post("/student/signup", studentSignup);

//post sign in
router.post("/student/signin", studentSignin);
//get sign out
router.get("/student/signout", isAuthenticated, studentSignout);

// POST /student/send-mail

router.post("/student/send-mail", studentSendMail);

//GET / student/forget-link

router.get("/student/forget-link/:id", studentsForgetLink);

// GET /student/reset-Password

router.post(
  "/student/reset-password/:id",
  isAuthenticated,
  studentResetPassword
);

// POST /student/studentUpdate

router.post("/student/student-update/:id", isAuthenticated, studentUpdate);

// POST /student/avatar/student ID

router.post("/student/student-avatar/:id", isAuthenticated, studentAvatar);


router.post("/student/allinternships",isAuthenticated,studentAllInternships);

//POST /student/apply/:internshipId

router.post("/student/apply/:internshipId",isAuthenticated,studentAppliedInternship);

//POST /student/apply/:jobsId

router.post("/student/apply/job/:jobsId",isAuthenticated,studentAppliedJobs);

//POST /student/alljobs

router.post("/student/alljobs",isAuthenticated,studentAllJobs);

//POST /student/:category

router.post("/student/:category",isAuthenticated,studentAllContent)

module.exports = router;
