import Booking from "../models/Booking.js";

export const createBooking = async (req, res) => {
  const newBooking = new Booking(req.body);
  try {
    const savedBooking = await newBooking.save();
    res.status(200).json({
      success: true,
      message: "Successfully created",
      data: savedBooking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create. Try again",
    });
  }
};

export const getSingleBooking = async (req, res) => {
  const id = req.params.id;
  try {
    const bookings = await Booking.findById(id);
    res.status(200).json({
      success: true,
      message: "Get bookings successfully",
      data: bookings,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Not Found!",
    });
  }
};

export const getAllBooking = async (req, res) => {
  try {
    const bookings = await Booking.find({});
    res.status(200).json({
      success: true,
      message: "Get bookings successfully",
      data: bookings,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Not Found!",
    });
  }
};

export const getBookingByUser = async (req, res) => {
  const id = req.params.id;
  try {
    const bookings = await Booking.find({ userId: id });
    res.status(200).json({
      success: true,
      message: "Get bookings successfully",
      data: bookings,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Not Found!",
    });
  }
};

export const deleteBooking = async (req, res) => {
  const id = req.params.id;

  try {
    await Booking.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Successfully delete",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete. Try again",
    });
  }
};

export const updateBooking = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedBooking,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update. Try again",
    });
  }
};
