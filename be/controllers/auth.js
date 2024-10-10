// import bcrypt from "bcryptjs";
// import crypto from "crypto";
// import { SMTPClient } from "emailjs";
// import { StatusCodes } from "http-status-codes";
// import Joi from "joi";
// import jwt from "jsonwebtoken";
// import User from "../models/user";
// // Joi schemas for validation
// const signupSchema = Joi.object({
//   username: Joi.string().min(3).required(),
//   email: Joi.string().email().required(),
//   password: Joi.string().min(6).required(),
//   confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
//     "any.only": "Mật khẩu không khớp",
//   }),
// });

// const signinSchema = Joi.object({
//   email: Joi.string().email().required(),
//   password: Joi.string().min(6).required(),
// });
// // Controller để đăng ký người dùng mới
// export const signup = async (req, res) => {
//   try {
//     // Validate request body
//     const { error } = signupSchema.validate(req.body);
//     if (error) {
//       return res
//         .status(StatusCodes.BAD_REQUEST)
//         .json({ message: error.details[0].message });
//     }

//     const { username, email, password } = req.body;

//     // Hash mật khẩu trước khi lưu
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     await User.create({
//       username,
//       email,
//       password: hashedPassword,
//     });
//     res.status(StatusCodes.CREATED).json({ message: "Đăng ký thành công" });
//   } catch (error) {
//     res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
//   }
// };

// // Controller để đăng nhập người dùng
// export const login = async (req, res) => {
//   try {
//     // Validate

//     const { error } = signinSchema.validate(req.body);
//     if (error) {
//       return res
//         .status(StatusCodes.BAD_REQUEST)
//         .json({ message: error.details[0].message });
//     }
//     const { email, password } = req.body;

//     // Tìm người dùng theo email
//     const user = await User.findOne({ email });

//     // Nếu không tìm thấy người dùng, trả về lỗi
//     if (!user) {
//       return res
//         .status(400)
//         .json({ message: "Email hoặc mật khẩu không đúng" });
//     }

//     // Kiểm tra mật khẩu
//     const isMatch = await user.comparePassword(password);

//     // Nếu mật khẩu không đúng, trả về lỗi
//     if (!isMatch) {
//       return res
//         .status(400)
//         .json({ message: "Email hoặc mật khẩu không đúng" });
//     }

//     // Tạo token JWT
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     // Trả về token và thông tin người dùng
//     res.status(200).json({
//       token,
//       user: { id: user._id, email: user.email, role: user.role },
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
