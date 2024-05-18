import Tour from "../models/Tour.js";
import Hotel from "../models/Hotel.js";

//create new hotel
export const createHotel = async (req, res) => {
    try {
      const existingHotel =await Hotel.findOne({titleTour:req.body.titleTour});
      if(existingHotel){
        res.status(400).json({
          success:false,
          message:"Mỗi tour chỉ có 1 khách sạn "
        })
      }
      const newHotel = new Hotel(req.body);
  
      const savedHotel = await newHotel.save();
      res.status(200).json({ success: true, message: 'Khách sạn được tạo thành công!', data: savedHotel });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Tạo mới khách sạn thất bại. Vui lòng thử lại!', error: err.message });
    }
  };
//upadate hotel
export const updateHotel = async (req, res) => {
    const id = req.params.id;
    try {
      const updatedHotel = await Hotel.findByIdAndUpdate(id, { $set: req.body }, { new: true });
      res.status(200).json({ success: true, message: 'Cập nhật khách sạn thành công!', data: updatedHotel });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Cập nhật thất bạn vui lòng thử lại!', error: err.message });
    }
  };
  //delete Hotel
  export const deleteHotel = async (req, res) => {
    const id = req.params.id;
    try {
      await Hotel.findByIdAndDelete(id);
      res.status(200).json({ success: true, message: 'Xóa khách sạn thành công' });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Xóa khachs sạn thất bại!', error: err.message });
    }
  };

//get Single hotel
export const getSingleHotel = async (req, res) => {
    const id = req.params.id;
    try {
      const hotel = await Hotel.findById(id);
      if (!hotel) {
        return res.status(404).json({ success: false, message: 'Không tìm thấy khách sạn' });
      }
      res.status(200).json({ success: true, message: 'Tìm khách sạn thành công', data: hotel });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Không thể tìm thấy khách sạn. Thử lại !', error: err.message });
    }
  };

//get all hotel
export const getAllHotel = async(req, res) =>{
 
  try {
    const hotels = await Hotel.find({});
    res.status(200).json({
      success: true,
      message: 'Successfully fetched all hotels',
      data: hotels
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'Failed to fetch hotels',
      error: err.message
    });
  }
};
//get hotel by title tour
export const getHotelsByTourTitle = async (req, res) => {
  const { title } = req.params;

  try {
    
    const hotels = await Hotel.find({ titleTour: title });

    if (hotels.length === 0) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy khách sạn cho tour này' });
    }

    res.status(200).json({ success: true, message: 'Tìm thấy khách sạn', data: hotels });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Đã xảy ra lỗi khi tìm kiếm khách sạn', error: err.message });
  }
};