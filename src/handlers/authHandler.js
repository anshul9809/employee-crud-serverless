const authServices = require("../services/authServices");
const connectDB = require("../utils/db");

module.exports.generateToken = async (event)=>{
    await connectDB();
    const {email, password} = JSON.parse(event.body);
    try{
        const token = await authServices.generateToken(email, password);
        return{
            statusCode: 200,
            body: JSON.stringify({token}),
        };
    }catch(error){
        return{
            statusCode: 400,
            body: JSON.stringify({message:"Unauthorized", details: error.message})
        };
    }
}
module.exports.logout = async (event) => {    
    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Logged out successfully" }),
    };
};