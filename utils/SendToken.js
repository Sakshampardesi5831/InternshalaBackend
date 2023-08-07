exports.sendToken=(employee,statusCode,res)=>{
    const token=employee.generatedJwtToken();

    const option={
        expires: new Date(
            Date.now()+process.env.COOKIE_EXPIRE*24*60*60*1000
        ),
        httpOnly:true,

    };
     res.status(statusCode).cookie("token",token,option)
     .json({success:true,id:employee._id,token});
     
    // res.json({
    //     token:token,
    // });
}

/*-------------------------this is extra code testing sendtoken -----------------------------------------------------*/
// exports.sendEmployeeToken=(employee,statusCode,res)=>{
//     const token=employee.generatedJwtToken();

//     const option={
//         expires: new Date(
//             Date.now()+process.env.COOKIE_EXPIRE*24*60*60*1000
//         ),
//         httpOnly:true,

//     };
//      res.status(statusCode).cookie("token",token,option)
//      .json({success:true,id:employee._id,token});
     
//     // res.json({
//     //     token:token,
//     // });
// }