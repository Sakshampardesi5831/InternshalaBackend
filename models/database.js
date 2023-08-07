/*const mongoose=require("mongoose");
exports.connectDatabase= async ()=>{
    try {
        await mongoose.connect(`${process.env.MongoDbURL}`);
        console.log("connection Established");
    } catch (error) {
        console.log(error);
    }
}*/
const mongoose=require("mongoose");
mongoose.set('strictQuery', false);
exports.connectDatabase= async ()=>{
    try {
        await mongoose.connect(process.env.MongoDbURL);
        console.log("connected");
        
    } catch (error) {
        console.log(error);
    }
}