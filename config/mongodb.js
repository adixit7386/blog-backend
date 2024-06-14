const mongoose=require("mongoose");
const Connect=async()=>{

    //handled using async await
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongodb connected successfully")
    } catch (error) {
        console.log(error);
    }
    // handled using async await
    
    // mongoose.connect(process.env.MONGO_URI)
    //   .then(() => {
    //     console.log('Successfully connected to MongoDB');
    //   })
    //   .catch((error) => {
    //     console.error('Error connecting to MongoDB:', error);
    //   });
}
module.exports =Connect;