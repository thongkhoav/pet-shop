import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";
// import { deleteImageById } = require("./imageController.js");

// POST /api/auth/reister
// REGISTER
export const register = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ phone: req.body.phone });
    // const avatar = req.file;
    if (user) {
      return res.status(409).send("Số điện thoại đã tồn tại.");
    } else {
      // Hash the password and create a user
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);

      // default: role = "user"
      let document = {
        fullname: req.body.fullname,
        gender: req.body.gender,
        dateOfBirth: req.body.dateOfBirth,
        password: hash,
        phone: req.body.phone,
        role: req.body.role, //default: "user"
        address: req.body.address,
        email: req.body.email,
        // avatar: avatar
      };

      const newUser = new UserModel(document);

      let user = await newUser.save();

      // if (req.body.role_code === "R2") {
      //   const doctor = await UserModel.findById(user._id);
      //   if (!doctor) return res.status(404).send("Doctor not found!");
      //   const special = await SpecialistModel.findById(doctor.specialist_id);
      //   res.status(200).json({ ...doctor._doc, special });
      //   return;
      // }

      res.status(200).json(user);
    }
  } catch (err) {
    console.log(err);
    // await deleteImageById(avatar.id);
    res.status(500).json(err);
  }
};

// POST /api/login
// LOGIN
export const login = async (req, res, next) => {
  try {
    let userQuery = {};
    if (req.body.phone) {
      userQuery = { phone: req.body.phone };
    } else if (req.body.email) {
      userQuery = {
        email: req.body.email,
      };
    }
    // userQuery = {...userQuery,  role_code: req.body.role_code}

    const user = await UserModel.findOne(userQuery);

    if (!user) return res.status(404).send("Tài khoản không tồn tại!");

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect) return res.status(401).send("Sai mật khẩu!");
    // console.log(userRole);

    const token = jwt.sign(
      { id: user._id, isAdmin: user.role === "admin" },
      process.env.JWT
    );
    console.log(token);

    const { password, ...filteredUser } = user._doc;
    res
      .cookie("access_token", "sfasdfdf", {
        httpOnly: true,
      })
      .status(200)
      .json({ ...filteredUser });
  } catch (err) {
    res.status(500).json(err);
  }
};

// POST /api/logout
// LOGOUT
// const logout = (req, res) => {
//   console.log('logout controller');
//   res
//     // .clearCookie("access_token", {
//     //   sameSite: "none",
//     //   secure: true,
//     // })
//     .status(200)
//     .json("User has been logged out.");

//   res.status(200).json("Logged out!")
// };
