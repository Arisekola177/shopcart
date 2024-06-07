import mongoose from "mongoose";


const connect = async () => {
    if(mongoose.connections[0].readyState) return;
    try {
        await mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("connected to db successfully")  
    } catch (error) {
       throw new Error('Something went wrong!!') 
    }
}


export default connect