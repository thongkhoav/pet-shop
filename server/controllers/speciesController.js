import asyncHandler from "express-async-handler"
import SpeciesModel from "../models/SpeciesModel.js"

export const getAllSpecies = asyncHandler(async (req, res, next) => {
    const pets = await SpeciesModel.find();
    res.status(200).json(pets);
  });