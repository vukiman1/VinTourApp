import React, { useMemo, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Typography,
  Spin,
  Select,
  Card,
  Row,
  Col,
  DatePicker,
  Empty,
} from "antd";
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
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const { data: bookings, error, isLoading } = useFetch(`${BASE_URL}/booking`);

  const { filteredBookings, totalRevenue, totalBookings, chartData } =
    useMemo(() => {
      if (!bookings)
        return {
          filteredBookings: [],
          totalRevenue: 0,
          totalBookings: 0,
          chartData: {},
        };

      let filteredBookings = [];

      if (selectedDate) {
        const start = moment(selectedDate).startOf("day");
        const end = moment(selectedDate).endOf("day");
        filteredBookings = bookings.filter((booking) =>
          moment(booking.bookAt).isBetween(start, end)
        );
      } else if (selectedMonth) {
        const start = moment(selectedMonth).startOf("month");
        const end = moment(selectedMonth).endOf("month");
        filteredBookings = bookings.filter((booking) =>
          moment(booking.bookAt).isBetween(start, end)
        );
      } else if (selectedYear) {
        const start = moment(selectedYear, "YYYY").startOf("year");
        const end = moment(selectedYear, "YYYY").endOf("year");
        filteredBookings = bookings.filter((booking) =>
          moment(booking.bookAt).isBetween(start, end)
        );
      } else {
        const start = moment().startOf(view);
        const end = moment().endOf(view);
        filteredBookings = bookings.filter((booking) =>
          moment(booking.bookAt).isBetween(start, end)
        );
      }

      const totalRevenue = filteredBookings.reduce(
        (sum, booking) => sum + booking.price,
        0
      );

      const totalBookings = filteredBookings.length;

      const groupedData = filteredBookings.reduce((acc, booking) => {
        const date = moment(booking.bookAt).format(
          view === "day" ? "YYYY-MM-DD HH:mm" : "YYYY-MM-DD"
        );
        if (!acc[date]) {
          acc[date] = { revenue: 0, bookings: 0 };
        }
        acc[date].revenue += booking.price;
        acc[date].bookings += 1;
        return acc;
      }, {});

      const sortedDates = Object.keys(groupedData).sort((a, b) =>
        moment(a).diff(moment(b))
      );

      const labels = sortedDates;
      const revenueData = labels.map((date) => groupedData[date].revenue);
      const bookingsData = labels.map((date) => groupedData[date].bookings);

      const chartData = {
        labels: labels.map((label) =>
          moment(label).format(view === "day" ? "HH:mm" : "DD MMM")
        ),
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

      return { filteredBookings, totalRevenue, totalBookings, chartData };
    }, [bookings, view, selectedDate, selectedMonth, selectedYear]);

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

  const handleViewChange = (value) => {
    setView(value);
    setSelectedDate(null); // Reset selected date when changing view
    setSelectedMonth(null); // Reset selected month when changing view
    setSelectedYear(null); // Reset selected year when changing view
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
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
        onChange={handleViewChange}
      >
        <Option value="day">Day</Option>
        <Option value="month">Month</Option>
        <Option value="year">Year</Option>
      </Select>
      {view === "day" && (
        <DatePicker
          onChange={handleDateChange}
          style={{ marginLeft: 10, marginBottom: 20 }}
        />
      )}
      {view === "month" && (
        <DatePicker
          picker="month"
          onChange={handleMonthChange}
          style={{ marginLeft: 10, marginBottom: 20 }}
        />
      )}
      {view === "year" && (
        <DatePicker
          picker="year"
          onChange={handleYearChange}
          style={{ marginLeft: 10, marginBottom: 20 }}
        />
      )}
      {filteredBookings.length === 0 ? (
        <Empty description="Không có dữ liệu" />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default BookingChart;
