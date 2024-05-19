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
  { name: "Đã bao gồm thuế và phí", icon: "/icon/tax.png" },
];

const HotelModal = ({
  title,
  visible,
  onOk,
  onCancel,
  hotel,
  hotelAmenities,
}) => {
  const [form] = Form.useForm();
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  useEffect(() => {
    if (hotel) {
      form.setFieldsValue(hotel);
      setSelectedAmenities(hotel.amenities.map((a) => a.name));
    } else {
      form.resetFields();
      setSelectedAmenities([]);
    }
  }, [hotel, form]);

  useEffect(() => {
    setSelectedAmenities(hotelAmenities);
  }, [hotelAmenities]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      console.log(values);

      const url = hotel
        ? `${BASE_URL}/hotel/${hotel._id}`
        : `${BASE_URL}/hotel`;
      const method = hotel ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(values),
      });

      onOk(); // Close the modal on successful update or creation
      setTimeout(() => {
        window.location.reload();
      }, 500);
      message.success(`User ${hotel ? "updated" : "created"} successfully`);
    } catch (error) {
      console.error(`Failed to ${hotel ? "update" : "create"} user:`, error);
    }
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
      open={visible}
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
        <Form.Item
          name="name"
          label="Hotel Name"
          rules={[{ required: true, message: "Nhập tên khách sạn" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true, message: "Nhập địa chỉ của khách sạn!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="city"
          label="City"
          rules={[{ required: true, message: "Nhập thành phố của khách sạn!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="rating"
          label="Rating"
          rules={[
            { type: "number", min: 0, max: 5, message: "Đánh giá từ 0 đến 5" },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Title Tour"
          name="titleTour"
          rules={[{ required: true, message: "Nhập tiêu đề của hotel!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Photo Link"
          name="image"
          rules={[{ required: true, message: "Nhập link anhr!" }]}
        >
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
                <img
                  src={amenity.icon}
                  alt={amenity.name}
                  style={{ width: 20, marginRight: 8 }}
                />
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
