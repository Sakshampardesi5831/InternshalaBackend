const express = require("express");
const router = express.Router();
const {
  homepage,
  employeeSignup,
  employeeSignin,
  employeeSignout,
  currentEmployee,
  employeeSendMail,
  employeesForgetLink,
  employeeResetPassword,
  employeeUpdate,
  employeeAvatar,
  createInternship,
  readInternship,
  readSingleInternship,
  createJobs,
  readJobs,
  readSingleJobs
} = require("../controller/employeeController");
const { isAuthenticated } = require("../middleware/auth");
router.get("/", homepage);
//Current User
router.get("/employee", isAuthenticated, currentEmployee);
// POST /employee/signup
router.post("/signup", employeeSignup);

//POST /employee/signin
router.post("/signin", employeeSignin);
//GET /employee/signout
router.get("/signout", isAuthenticated, employeeSignout);

// POST /employee/send-mail

router.post("/send-mail", employeeSendMail);

//GET / employee/forget-link

router.get("/forget-link/:id", employeesForgetLink);

// GET /employee/reset-Password

router.post(
  "/reset-password/:id",
  isAuthenticated,
  employeeResetPassword
);

// POST /employee/employeeUpdate

router.post("/employee-update/:id", isAuthenticated, employeeUpdate);

// POST /employee/avatar/employee ID

router.post("/employee-avatar/:id", isAuthenticated, employeeAvatar);
/** -------------------------------EMPLOYEE CREATED INTERNSHIP---------------------------------------------------------*/
//POST /employee/internship/create

router.post("/internship/create",isAuthenticated,createInternship);

//POST /employee/internship/read

router.post("/internship/read",isAuthenticated,readInternship);

//POST /employee/internship/readSingle/:id

router.post("/internship/readSingle/:readId",isAuthenticated,readSingleInternship);

//POST /employee/jobs/create

router.post("/jobs/create",isAuthenticated,createJobs);

//POST /employee/jobs/read

router.post("/jobs/read",isAuthenticated,readJobs);


//POST /employee/jobs/readSingle/:readId

router.post("/jobs/readSingle/:readId",isAuthenticated,readSingleJobs);
module.exports = router;
