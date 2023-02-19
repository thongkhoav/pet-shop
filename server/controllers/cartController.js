import asyncHandler from "express-async-handler";
import CartModel from "../models/CartModel.js";
import mongoose from "mongoose";

export const addPetToCart = asyncHandler(async (req, res, next) => {

  let cart = await CartModel.findOneAndUpdate(
    { user_id: req.params.userId },
    {
      $push: { cart: {pet_id: mongoose.Types.ObjectId(req.params.petId)}  },
    },
    {
      new: true,
      upsert: true
    }
  );
//   if (!cart) {
//     let cart = await CartModel.create({
//       user_id: req.params.userId,
//       cart: [
//         {
//            pet_id: mongoose.Schema.Types.ObjectId(req.params.petId),
//         },
//       ],
//     });
//   }
  res.status(200).json(cart);
});

export const getCartByUserId = asyncHandler(async (req, res, next) => {
  let cart = await CartModel.findOne(
    { user_id: req.params.userId }
  );
  res.status(200).json(cart);
});

//@desc Update blog
//@route PUT /api/blog/:id
//@access private
// const updateBlog = asyncHandler(async (req, res, next) => {
//   const blogId = req.params.id;
//   const blog = await Blog.findById(blogId);

//   if (!blog) {
//     res.status(404);
//     throw new Error("Blog Not Found!");
//   }

//   const { author, title, createdAt, content, image, category_id } = req.body;
//   const updateBlog = await Blog.findByIdAndUpdate(
//     blogId,
//     {
//       author,
//       title,
//       createdAt,
//       content,
//       image,
//       category_id,
//     },
//     { new: true }
//   );

//   res.status(200).json({ updateBlog });
// });
