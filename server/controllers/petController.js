import asyncHandler from "express-async-handler";
import PetModel from "../models/PetModel.js";
import SpeciesModel from "../models/SpeciesModel.js";
import { deleteImageById } from "./imageController.js";

//@desc Get all pets
//@route GET /api/pets
//@access private
export const getPets = asyncHandler(async (req, res, next) => {
  const pets = await PetModel.aggregate([
    {
      $lookup: {
        from: "species",
        localField: "species_id",
        foreignField: "_id",
        as: "species",
      },
    },
  ]);
  res.status(200).json(pets);
});

export const getPetsBySpecies = asyncHandler(async (req, res, next) => {
  const pets = await PetModel.find({ species_id: req.params.spe_id });
  res.status(200).json(pets);
});

//@desc Get blog
//@route GET /api/blog/:id
//@access private
export const getPetById = asyncHandler(async (req, res, next) => {
  const pet = await PetModel.findById(req.params.id);
  if (!pet) {
    res.status(404);
    throw new Error("Pet Not Found!");
  }
  res.status(200).json(pet);
});

//@desc Create blog
//@route POST /api/blog
//@access private
export const addPet = async (req, res, next) => {
  const {
    species_id,
    name,
    desc,
    small_price,
    small_quantity,
    medium_price,
    medium_quantity,
  } = req.body;
  const images = req.files;
  console.log(images);

  // if (!author || !title || !createdAt || !content || !image || !category_id) {
  //   res.status(400);
  //   throw new Error("All field not be empty!");
  // }

try {
  const pet = await PetModel.create({
    species_id,
    name,
    desc,
    images,
    small:{price: small_price, quantity: small_quantity},
    medium:{price: medium_price, quantity: medium_quantity},
  });
  res.status(200).json(pet)
} catch(err) {
  for (const image of images) {
    await deleteImageById(image.id);
  }
  res.status(500).json(err);
}


};

export const addSpecies = asyncHandler(async (req, res, next) => {
  const { title } = req.body;

  if (!title) {
    res.status(400);
    throw new Error("All field not be empty!");
  }

  const newSpecies = await SpeciesModel.create({
    title,
  });

  res.status(200).json(newSpecies);
});

//@desc Update blog
//@route PUT /api/blog/:id
//@access private
export const updatePet = asyncHandler(async (req, res, next) => {
  const petId = req.params.id;
  const {
    species_id,
    name,
    desc,
    small_price,
    small_quantity,
    medium_price,
    medium_quantity,
  } = req.body;
  const images = req.files;
  const pet = await PetModel.findById(petId);
  if (!pet) {
    res.status(404);
    throw new Error("pet Not Found!");
  }
  pet.save();




  res.status(200).json(updatePet);
});

//@desc Delete blog
//@route delete /api/:id
//@access private
// const deleteBlog = asyncHandler(async (req, res, next) => {
//   const blogId = req.params.id;
//   const deleteBlog = await Blog.findById(blogId);
//   if (!deleteBlog) {
//     res.status(404);
//     throw new Error("Blog Not Found!");
//   }
//   await Blog.deleteOne({ _id: blogId });
//   res.status(200).json({ deleteBlog });
// });
