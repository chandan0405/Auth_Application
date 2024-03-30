import mongoose from "mongoose"
const schemaModel = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please Enter the username"],
    },
    email: {
        type: String,
        required: [true, "Please Enter the email"],
    },
    password: {
        type: String,
        required: [true, "Please Enter the password"],
    },
    isVarified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    varifyToken: String,
    varifyTokenExpiry: Date,
})

const UserSchema = mongoose.models.users || mongoose.model("users", schemaModel);
export default UserSchema;