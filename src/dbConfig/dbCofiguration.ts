import mongoose from "mongoose";

export async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;
        connection.on("connected", () => {
            console.log('MongoDb connected succesfully');
        })
        connection.on('error', (err) => {
            console.log("mogoDB connction error. Please make sure Connected", +err)
            process.exit();
        })
    } catch (error) {
        console.log("Something went wrong");
        console.log(error)
    }

}