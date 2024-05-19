import express from "express";
import {
  createTour,
  deleteTour,
  getAllTour,
  getAllTourNoPage,
  getFeaturedTour,
  getSingleTour,
  getTourBySearch,
  getTourCount,
  updateTour,
} from "../controllers/tourController.js";

import uploadCloud from "../utils/uploader.js";

import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//create new tour
router.post("/", verifyAdmin, uploadCloud.single("file"), createTour);
//update new tour
router.put("/:id", uploadCloud.single("file"), updateTour);
//delete new tour
router.delete("/:id", deleteTour);
//get single tour
router.get("/:id", getSingleTour);
//get all tour tour by page
router.get("/", getAllTour);
router.get("/all/nopage", getAllTourNoPage);

// get tour by search
router.get("/search/getTourBySearch", getTourBySearch);
// get tour by feature
router.get("/search/getFeaturedTour", getFeaturedTour);
// get tour count
router.get("/search/getTourCount", getTourCount);
export default router;
