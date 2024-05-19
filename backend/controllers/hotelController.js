import Tour from "../models/Tour.js";
import Hotel from "../models/Hotel.js";

//create new hotel
export const createHotel = async (req, res) => {
  const newHotel = new Hotel(req.body);
  try {
    const existingHotel = await Hotel.findOne({
      titleTour: req.body.titleTour,
    });
    if (existingHotel) {
      res.status(400).json({
        success: false,
        message: "Mỗi tour chỉ có 1 khách sạn ",
      });
    }

    const savedHotel = await newHotel.save();
    res.status(200).json({
      success: true,
      message: "Khách sạn được tạo thành công!",
      data: savedHotel,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Tạo mới khách sạn thất bại. Vui lòng thử lại!",
      error: err.message,
    });
  }
};
//upadate hotel
export const updateHotel = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedHotel,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update. Try again",
    });
  }
};
//delete Hotel
export const deleteHotel = async (req, res) => {
  const { id } = req.params; // Destructuring id from req.params

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "ID của khách sạn không được cung cấp.",
    });
  }

  try {
    const hotel = await Hotel.findById(id);

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy khách sạn với ID này.",
      });
    }

    await Hotel.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Xóa khách sạn thành công",
    });
  } catch (err) {
    console.error("Error deleting hotel:", err);
    res.status(500).json({
      success: false,
      message: "Xóa khách sạn thất bại!",
      error: err.message,
    });
  }
};

export default deleteHotel;

//get Single hotel
export const getSingleHotel = async (req, res) => {
  const id = req.params.id;
  try {
    const hotel = await Hotel.findById(id);
    if (!hotel) {
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy khách sạn" });
    }
    res.status(200).json({
      success: true,
      message: "Tìm khách sạn thành công",
      data: hotel,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Không thể tìm thấy khách sạn. Thử lại !",
      error: err.message,
    });
  }
};

//get all hotel
export const getAllHotel = async (req, res) => {
  try {
    const hotels = await Hotel.find({});
    res.status(200).json({
      success: true,
      message: "Successfully fetched all hotels",
      data: hotels,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Failed to fetch hotels",
      error: err.message,
    });
  }
};
//get hotel by title tour
export const getHotelsByTourTitle = async (req, res) => {
  const { title } = req.params;

  try {
    const hotels = await Hotel.find({ titleTour: title });

    if (hotels.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy khách sạn cho tour này",
      });
    }

    res
      .status(200)
      .json({ success: true, message: "Tìm thấy khách sạn", data: hotels });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi tìm kiếm khách sạn",
      error: err.message,
    });
  }
};
