const dbURL = "mongodb+srv://andrewrezk:admin123@cluster0.euld0.mongodb.net/users?retryWrites=true&w=majority";
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        //mongoDB connection string
        const con = await mongoose.connect(dbURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log(`MongoDB connected: ${con.connection.host}`);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB