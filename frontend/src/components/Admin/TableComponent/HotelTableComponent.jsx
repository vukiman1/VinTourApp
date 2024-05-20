import React, { useState } from "react";
import { Table, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { BASE_URL } from "../../../utils/config";
import useFetch from "../../../hooks/useFetch";
import HotelModal from "../AdminHotel/HotelModal";

const HotelTableComponent = ({ onDelete }) => {
  const [editHotel, setEditHotel] = useState(null);

  const columns = [
    {
      title: "Title Tour",
      dataIndex: "titleTour",
      key: "titleTour",
    },
    {
      title: "Image",
      key: "image",
      render: (text, record) => (
        <img
          src={record.image}
          alt=""
          style={{ width: "30px", height: "30px" }}
        />
      ),
    },
    {
      title: "Hotel Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => setEditHotel(record)}
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => onDelete(record)}
            danger
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  const { data: hotels, loading } = useFetch(`${BASE_URL}/hotel/`);

  const handleEditOk = () => {
    setEditHotel(null);
  };

  const handleEditCancel = () => {
    setEditHotel(null);
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={hotels}
        loading={loading}
        rowKey="_id"
      />
      {editHotel && (
        <HotelModal
          title="Edit Hotel"
          visible={!!editHotel}
          hotel={editHotel}
          hotelAmenities={editHotel.amenities.map((amenity) => amenity.name)}
          onOk={handleEditOk}
          onCancel={handleEditCancel}
        />
      )}
    </>
  );
};

export default HotelTableComponent;
