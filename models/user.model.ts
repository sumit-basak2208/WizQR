import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
  email: {
    type: String,
    unique: true,
  },
});

const Users = mongoose.models.users || mongoose.model("users", userSchema);
export default Users;
