const nodemailer=require("nodemailer");
const ErrorHandler = require("./ErrorHandler");


exports.sendMail= async (req,res,next,url)=>{
    const transport=nodemailer.createTransport({
        service:"gmail",
        host:"smtp.gmail.com",
        port:465,
        auth:{
            user:process.env.MAIL_EMAIL_ADDRESS,
            pass:process.env.MAIL_PASSWORD
        }
    })

    const mailOptions={
        from:"saksham Private Limited",
        to:req.body.email,
        subject:"password reset Link",
        text:"do not share this link",
        html:`<h1>Click the link  below to reset password </h1>
          <a href=${url}>Password reset link<a/>
        `
    };
   transport.sendMail(mailOptions,(err,info)=>{
        if(err){
            return next(new ErrorHandler(err,500))
        }  
        console.log(info);
        return res.status(200).json({
            message:"mail send successfully",
            url,
        })
   });

}