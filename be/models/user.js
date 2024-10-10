// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";
// import validator from "validator";

// const UserSchema = new mongoose.Schema(
//   {
//     username: {
//       type: String,
//       required: true,
//       unique: true,
//       minlength: 3,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       validate: [validator.isEmail, "Please fill a valid email address"],
//     },
//     password: {
//       type: String,
//       required: true,
//       minlength: 6,
//     },
//     role: {
//       type: String,
//       enum: ["customer", "admin"],
//       default: "customer",
//     },
//     status: {
//       type: Boolean,
//       default: true,
//     },
//     lastLogin: {
//       type: Date,
//     },
//     resetPasswordToken: {
//       type: String,
//     },
//     resetPasswordExpires: {
//       type: Date,
//     },
//   },
//   { timestamps: true, versionKey: false }
// );

// // Middleware để mã hóa mật khẩu trước khi lưu
// UserSchema.pre("save", async function (next) {
//   if (this.isModified("password") || this.isNew) {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//   }
//   next();
// });

// // Phương thức để kiểm tra mật khẩu
// UserSchema.methods.comparePassword = async function (password) {
//   // Sử dụng bcrypt để so sánh mật khẩu
//   return await bcrypt.compare(password, this.password);
// };

// export default mongoose.model("User", UserSchema);
