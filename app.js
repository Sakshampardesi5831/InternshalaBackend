require("dotenv").config({path:"./.env"})
const express=require("express");
const app=express();
const cors=require("cors");

// database connnection
  require("./models/database").connectDatabase();
//LOGGER
const logger=require("morgan");

app.use(logger("tiny"));
app.use(cors({
  credentials:true,
  origin:true
}));
//body parser
app.use(express.json());
app.use(express.urlencoded({extended:false}));
// session and cookie 
const session=require("express-session");
const cookieParser=require("cookie-parser");
//express-Fileupload
const expressUploader=require("express-fileupload");
app.use(expressUploader());
app.use(session({
  resave:true,
  saveUninitialized:true,
  secret:process.env.EXPRESS_SESSION_SECRET,
}))

app.use(cookieParser());

app.use("/user",require("./routes/indexRoutes"));
app.use("/resume",require("./routes/resumeRoutes"));
app.use("/employee",require("./routes/employeeRoutes"));

//ERROR HANDLING
const {generatedError}=require("./middleware/error")
const ErrorHandler = require("./utils/ErrorHandler");
app.all("*",function(req,res,next){
    next(new ErrorHandler(`Request Url Not Found ${req.url}`,404));
})
app.use(generatedError);

app.listen(process.env.PORT,console.log(`server is running at ${process.env.PORT}`));