import express from "express";
import {
  createBooking,
  deleteBooking,
  getAllBooking,
  getBookingByUser,
  getSingleBooking,
  updateBooking,
} from "../controllers/bookingController.js";
import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/", verifyUser, createBooking);
router.get("/:id", verifyUser, getSingleBooking);
router.get("/", verifyUser, getAllBooking);
router.get("/user/:id", getBookingByUser);
router.delete("/:id", deleteBooking);
router.put("/:id", verifyUser, updateBooking);

export default router;
