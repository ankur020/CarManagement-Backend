import { Car } from "../models/car.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";

// Create a new car
export const createCar = asyncHandler(async (req, res) => {
  const { title, description, tags } = req.body;
  const userId = req.user._id;

  if (req.files.length > 10) {
    throw new ApiError(400, "Cannot upload more than 10 images");
  }

  const imageUrls = [];
  for (const file of req.files) {
    const result = await uploadOnCloudinary(file.path);
    imageUrls.push(result.url);
  }

  const car = await Car.create({
    title,
    description,
    tags,
    images: imageUrls,
    user: userId,
  });

  res.status(201).json(new ApiResponse(201, car, "Car created successfully"));
});

// Get all cars for the logged-in user
export const getUserCars = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const cars = await Car.find({ user: userId });
  res.status(200).json(new ApiResponse(200, cars, "User cars retrieved"));
});

// Search cars by title, description, or tags
export const searchCars = asyncHandler(async (req, res) => {
  const { keyword } = req.query;
  const userId = req.user._id;

  const cars = await Car.find({
    user: userId,
    $or: [
      { title: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } },
      { "tags.carType": { $regex: keyword, $options: "i" } },
      { "tags.company": { $regex: keyword, $options: "i" } },
      { "tags.dealer": { $regex: keyword, $options: "i" } },
    ],
  });

  res
    .status(200)
    .json(new ApiResponse(200, cars, "Cars matching search criteria"));
});

// Get details for a specific car
export const getCar = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const car = await Car.findOne({ _id: id, user: req.user._id });

  if (!car) {
    throw new ApiError(404, "Car not found");
  }

  res.status(200).json(new ApiResponse(200, car, "Car details retrieved"));
});

// Update car details
export const updateCar = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, tags } = req.body;

  const car = await Car.findOneAndUpdate(
    { _id: id, user: req.user._id },
    { title, description, tags },
    { new: true }
  );

  if (!car) {
    throw new ApiError(404, "Car not found");
  }

  res.status(200).json(new ApiResponse(200, car, "Car updated successfully"));
});

// Delete a car
export const deleteCar = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const car = await Car.findOneAndDelete({ _id: id, user: req.user._id });

  if (!car) {
    throw new ApiError(404, "Car not found");
  }

  for (const imageUrl of car.images) {
    await deleteFromCloudinary(imageUrl); // Remove images from Cloudinary
  }

  res.status(200).json(new ApiResponse(200, {}, "Car deleted successfully"));
});

export const deleteCarImage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { imageUrl } = req.body; // Image URL to delete

  if (!imageUrl) {
    throw new ApiError(400, "Image URL is required");
  }

  // Find the car and verify ownership
  const car = await Car.findOne({ _id: id, user: req.user._id });

  if (!car) {
    throw new ApiError(404, "Car not found or not authorized");
  }

  // Check if the image exists in the car's images array
  const imageIndex = car.images.indexOf(imageUrl);
  if (imageIndex === -1) {
    throw new ApiError(404, "Image not found in car data");
  }

  // Delete the image from Cloudinary or other storage
  await deleteFromCloudinary(imageUrl);

  // Remove the image from the car's images array and save the car
  car.images.splice(imageIndex, 1);
  await car.save();

  res
    .status(200)
    .json(new ApiResponse(200, car, "Image deleted successfully from car"));
});
