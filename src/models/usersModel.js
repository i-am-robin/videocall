import mongoose, { Schema } from "mongoose";

const usersSchema = new Schema(
  {
    name: String,
    pass: String,
  },
  {
    timestamps: true,
  }
);

const UsersDB = mongoose.models.Users || mongoose.model("Users", usersSchema);

export default UsersDB;
