const mongoose = require("../../common/database")();
// Tạo bản thiết kế User
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "member",
    },
    full_name: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);
// Tạo model User từ bản thiết kế trước đó
const UserModel = mongoose.model("Users", userSchema, "users");
module.exports = UserModel;
