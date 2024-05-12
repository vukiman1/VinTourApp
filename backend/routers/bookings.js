import express from "express";
import {
  createBooking,
  getAllBooking,
  getBookingByUser,
  getSingleBooking,
} from "../controllers/bookingController.js";
import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/", verifyUser, createBooking);
router.get("/:id", verifyUser, getSingleBooking);
router.get("/", verifyUser, getAllBooking);
router.get("/user/:id", getBookingByUser);

export default router;
