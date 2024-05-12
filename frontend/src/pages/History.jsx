import React, { useEffect, useState } from "react";
import { Typography, List } from "antd";
import "../styles/history.css";
import { BASE_URL } from "../utils/config";
import TourList from "../shared/tour-list";
import { useParams } from "react-router-dom";
const { Title } = Typography;

const History = () => {
  const { id } = useParams();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`${BASE_URL}/booking/user/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }
        const data = await response.json();
        setBookings(data.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [id]);
  return (
    <div className="history-container">
      <Title level={2} className="history-title">
        Lịch sử đặt tour du lịch
      </Title>
      <List
        className="history-list"
        dataSource={Array.isArray(bookings) ? bookings : []}
        renderItem={(item) => <TourList item={item} />}
      />
    </div>
  );
};

export default History;
