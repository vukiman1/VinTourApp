import React, { useMemo, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Typography, Spin, Select, Card, Row, Col } from "antd";
import { DollarOutlined, OrderedListOutlined } from "@ant-design/icons";
import { BASE_URL } from "../../../utils/config";
import useFetch from "../../../hooks/useFetch";
import moment from "moment";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ChartTitle,
  Tooltip,
  Legend
);

const { Title, Text } = Typography;
const { Option } = Select;

const BookingChart = () => {
  const [view, setView] = useState("month");
  const { data: bookings, error, isLoading } = useFetch(`${BASE_URL}/booking`);

  // Filter bookings based on the selected view
  const filteredBookings = useMemo(() => {
    if (!bookings) return [];
    const start = moment().startOf(view);
    const end = moment().endOf(view);
    return bookings.filter((booking) =>
      moment(booking.bookAt).isBetween(start, end)
    );
  }, [bookings, view]);

  // Calculate total bookings and revenue
  const totalRevenue = filteredBookings.reduce(
    (sum, booking) => sum + booking.price,
    0
  );
  const totalBookings = filteredBookings.length;

  // Prepare data for chart
  const chartData = useMemo(() => {
    const labels = filteredBookings.map((booking) =>
      moment(booking.bookAt).format(
        view === "day" ? "HH:mm" : view === "month" ? "DD MMM" : "MMM YYYY"
      )
    );
    const groupedData = filteredBookings.reduce((accumulator, currentValue) => {
      const date = moment(currentValue.bookAt).format(
        view === "day" ? "YYYY-MM-DD" : view === "month" ? "YYYY-MM" : "YYYY"
      );
      if (!accumulator[date]) {
        accumulator[date] = { revenue: 0, bookings: 0 };
      }
      accumulator[date].revenue += currentValue.price;
      accumulator[date].bookings += 1;
      return accumulator;
    }, {});
    const revenueData = filteredBookings.map((booking) => booking.price);
    const bookingsData = labels.map(
      (label) =>
        filteredBookings.filter(
          (booking) =>
            moment(booking.bookAt).format(
              view === "day"
                ? "HH:mm"
                : view === "month"
                ? "DD MMM"
                : "MMM YYYY"
            ) === label
        ).length
    );

    return {
      labels,
      datasets: [
        {
          label: "Revenue",
          data: revenueData,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
          yAxisID: "y-axis-revenue",
        },
        {
          label: "Total Bookings",
          data: bookingsData,
          backgroundColor: "rgba(153, 102, 255, 0.6)",
          borderColor: "rgba(153, 102, 255, 1)",
          borderWidth: 1,
          yAxisID: "y-axis-bookings",
        },
      ],
    };
  }, [filteredBookings, view]);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Tour Bookings Revenue (${view})`,
      },
    },
    scales: {
      yAxes: [
        {
          id: "y-axis-revenue",
          type: "linear",
          position: "left",
          ticks: {
            beginAtZero: true,
          },
        },
        {
          id: "y-axis-bookings",
          type: "linear",
          position: "right",
          ticks: {
            beginAtZero: true,
            max: Math.max(...filteredBookings.map(() => 1)) + 1,
          },
          gridLines: {
            drawOnArea: false,
          },
        },
      ],
    },
  };

  const handleChange = (value) => {
    setView(value);
  };

  if (isLoading) {
    return <Spin tip="Loading..." />;
  }

  if (error) {
    return <div>Error loading bookings: {error.message}</div>;
  }

  return (
    <div style={{ marginLeft: "40px" }}>
      <Title level={3}>Tour Bookings</Title>
      <Select
        defaultValue="month"
        style={{ width: 120, marginBottom: 20 }}
        onChange={handleChange}
      >
        <Option value="day">Day</Option>
        <Option value="month">Month</Option>
        <Option value="year">Year</Option>
      </Select>
      <Row gutter={16} style={{ marginBottom: 20 }}>
        <Col span={12}>
          <Card
            style={{ backgroundColor: "#f6f6f6", borderRadius: 8 }}
            bordered={false}
          >
            <Row align="middle">
              <Col span={6}>
                <OrderedListOutlined
                  style={{ fontSize: "32px", color: "#1890ff" }}
                />
              </Col>
              <Col span={18}>
                <Text>Total Bookings</Text>
                <Title level={2}>{totalBookings}</Title>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={12}>
          <Card
            style={{ backgroundColor: "#f6f6f6", borderRadius: 8 }}
            bordered={false}
          >
            <Row align="middle">
              <Col span={6}>
                <DollarOutlined
                  style={{ fontSize: "32px", color: "#52c41a" }}
                />
              </Col>
              <Col span={18}>
                <Text>Total Revenue</Text>
                <Title level={2}>${totalRevenue.toLocaleString()}</Title>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <div style={{ width: "70%", margin: "0 auto" }}>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default BookingChart;
