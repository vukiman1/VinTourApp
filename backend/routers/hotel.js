import express from "express";
import {
  createHotel,
  updateHotel,
  deleteHotel,
  getSingleHotel,
  getHotelsByTourTitle,
  getAllHotel,
} from "../controllers/hotelController.js";
import { verifyUser, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();
//create hotel
router.post("/", createHotel);
//update hotel
router.put("/:id", updateHotel);
// delete hotel
router.delete("/:id", verifyAdmin, deleteHotel);
//get singlehotel
router.get("/:id", getSingleHotel);
//get Hotels by tour id
router.get("/tour/:title", getHotelsByTourTitle);
//get all hotel
router.get("/", getAllHotel);

export default router;
