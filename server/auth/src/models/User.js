import mongoose from "mongoose";

const schema = mongoose.Schema(
  {
    name: { type: String, required: [true, "name is required"] },
    email: {
      type: String,
      unique: true,
      required: [true, "email is required"],
    },
    password: { type: String, required: [true, "password is required"] },
    role: { type: String, default: "user" },
    playlist: [{ type: String, required: [true, "playlist is required"] }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", schema);

export default User;
