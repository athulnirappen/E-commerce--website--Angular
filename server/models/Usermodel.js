import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    },
    isAdmin: {
        type: Boolean,
        default:false
    },
    roles: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        ref:"Role"
    }
}, {
    timestamps:true
});

const User = mongoose.model("User", userSchema)
export default User