
import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, InputNumber, Select } from "antd";
import { BASE_URL } from "../../../utils/config";
import { message } from "antd";
const { Option } = Select;



const availableAmenities = [
  { name: "Ăn sáng miễn phí", icon: "/icon/breakfast.png" },
  { name: "Bãi đỗ xe", icon: "/icon/parking.png" },
  { name: "Sân vườn", icon: "/icon/garden.png" },
  { name: "Wifi cao cấp miễn phí", icon: "/icon/wifi.png" },
  { name: "Spa cao cấp", icon: "/icon/massage.png" },
  { name: "Bể bơi", icon: "/icon/swimming_pool.png" },
  { name: "Phòng tập", icon: "/icon/Gym.png" },
  { name: "Đã bao gồm thuế và phí", icon: "/icon/tax.png" }
];

const HotelModal = ({ title, visible, onOk, onCancel, hotel, hotelAmenities }) => {
  const [form] = Form.useForm();
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  useEffect(() => {
    if (hotel) {
      form.setFieldsValue(hotel);
      setSelectedAmenities(hotel.amenities.map(a => a.name)); 
    } else {
      form.resetFields();
      setSelectedAmenities([]); 
    }
  }, [hotel, form]);

  useEffect(() => {
  
    setSelectedAmenities(hotelAmenities);
  }, [hotelAmenities]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      values.amenities = selectedAmenities; 
    
      const method = hotel ? "PUT" : "POST";
      const url = hotel ? `${BASE_URL}/hotel/${hotel._id}` : `${BASE_URL}/hotels`;

      fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          message.success(`Hotel ${hotel ? "updated" : "created"} successfully`);
          onOk();
        } else {
          message.error(`Failed to ${hotel ? "update" : "create"} hotel`);
        }
      })
      .catch((error) => {
        console.error("Failed to save hotel:", error);
        message.error(`An error occurred while ${hotel ? "updating" : "creating"} the hotel`);
      });
    });
  };

  const handleCancel = () => {
    onCancel();
  };

  const handleChangeAmenities = (selectedValues) => {
    setSelectedAmenities(selectedValues);
  };

  return (
    <Modal
      title={title}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Save
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" name="hotelForm">
        <Form.Item name="name" label="Hotel Name" rules={[{ required: true, message: "Nhập tên khách sạn" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="address" label="Address" rules={[{ required: true, message: "Nhập địa chỉ của khách sạn!" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="city" label="City" rules={[{ required: true, message: "Nhập thành phố của khách sạn!" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="rating" label="Rating" rules={[{ type: "number", min: 0, max: 5, message: "Đánh giá từ 0 đến 5" }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item name="titlehotel" label="Title hotel" rules={[{ required: true, message: "Nhập tiêu đề của hotel!" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="amenities" label="Amenities">
          <Select
            mode="multiple"
            placeholder="Select amenities"
            onChange={handleChangeAmenities}
            value={selectedAmenities} 
          >
            {availableAmenities.map((amenity) => (
              <Option key={amenity.name} value={amenity.name}>
                <img src={amenity.icon} alt={amenity.name} style={{ width: 20, marginRight: 8 }} />
                {amenity.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default HotelModal;