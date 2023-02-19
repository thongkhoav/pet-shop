import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    avatar: {
      type: Object,
      default: {
        filename: "defaultAvatar.jpg",
      }
    },
    fullname: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required:true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      sparse: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      min: 6,
      required: true,
    },
    nationalId: {
      type: String,
    },
    role: {
      type: String,
      required: true,
      default:"user"
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model("User", UserSchema);
