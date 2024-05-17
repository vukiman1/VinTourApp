import { Modal, Form, Input, InputNumber, Button, message, Space } from "antd";
import React, { useEffect, useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { BASE_URL } from "../../../utils/config";

const TourModal = ({ title, visible, onOk, onCancel, tour }) => {
  const [form] = Form.useForm();
  const [desc, setDesc] = useState([]);

  useEffect(() => {
    if (visible) {
      if (tour) {
        form.setFieldsValue(tour);
        setDesc(tour.desc || []);
      } else {
        form.resetFields();
        setDesc([]);
      }
    }
  }, [visible, tour, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      values.desc = desc;
      const url = tour ? `${BASE_URL}/tours/${tour._id}` : `${BASE_URL}/tours`;
      const method = tour ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success(`Tour ${tour ? "updated" : "created"} successfully`);
        onOk();
      } else {
        message.error(`Failed to ${tour ? "update" : "create"} tour`);
      }
    } catch (error) {
      console.error(`Failed to ${tour ? "update" : "create"} tour:`, error);
      message.error(
        `An error occurred while ${tour ? "updating" : "creating"} the tour`
      );
    }
  };

  const addDay = () => {
    setDesc([...desc, { day: "", activities: [""] }]);
  };

  const removeDay = (index) => {
    const newDesc = desc.slice();
    newDesc.splice(index, 1);
    setDesc(newDesc);
  };

  const addActivity = (dayIndex) => {
    const newDesc = desc.slice();
    newDesc[dayIndex].activities.push("");
    setDesc(newDesc);
  };

  const removeActivity = (dayIndex, activityIndex) => {
    const newDesc = desc.slice();
    newDesc[dayIndex].activities.splice(activityIndex, 1);
    setDesc(newDesc);
  };

  const handleDayChange = (index, value) => {
    const newDesc = desc.slice();
    newDesc[index].day = value;
    setDesc(newDesc);
  };

  const handleActivityChange = (dayIndex, activityIndex, value) => {
    const newDesc = desc.slice();
    newDesc[dayIndex].activities[activityIndex] = value;
    setDesc(newDesc);
  };

  const handleCancelInternal = () => {
    form.resetFields();
    setDesc([]);
    onCancel();
  };

  return (
    <Modal
      title={title}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancelInternal}
      afterClose={() => {
        form.resetFields();
        setDesc([]);
      }}
    >
      <Form
        form={form}
        initialValues={tour}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          label="Tour"
          name="title"
          rules={[{ required: true, message: "Please input the tour name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please input the tour price!" }]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="City"
          name="city"
          rules={[{ required: true, message: "Please input the city!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Duration"
          name="duration"
          rules={[
            { required: true, message: "Please input the tour duration!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Persons"
          name="maxGroupSize"
          rules={[
            { required: true, message: "Please input the max group size!" },
          ]}
        >
          <InputNumber min={1} />
        </Form.Item>
      </Form>
      <div>
        {desc.map((day, dayIndex) => (
          <div key={dayIndex} style={{ marginBottom: 16 }}>
            <Space direction="vertical">
              <Input
                placeholder="Day"
                value={day.day}
                onChange={(e) => handleDayChange(dayIndex, e.target.value)}
                style={{ marginBottom: 8 }}
              />
              {day.activities.map((activity, activityIndex) => (
                <Space
                  key={activityIndex}
                  style={{ display: "flex", marginBottom: 8 }}
                >
                  <Input
                    placeholder="Activity"
                    value={activity}
                    onChange={(e) =>
                      handleActivityChange(
                        dayIndex,
                        activityIndex,
                        e.target.value
                      )
                    }
                  />
                  <MinusCircleOutlined
                    onClick={() => removeActivity(dayIndex, activityIndex)}
                  />
                </Space>
              ))}
              <Button
                type="dashed"
                onClick={() => addActivity(dayIndex)}
                icon={<PlusOutlined />}
                block
              >
                Add Activity
              </Button>
            </Space>
            <Button
              type="dashed"
              danger
              onClick={() => removeDay(dayIndex)}
              style={{ marginTop: 8 }}
            >
              Remove Day
            </Button>
          </div>
        ))}
        <Button type="dashed" onClick={addDay} icon={<PlusOutlined />} block>
          Add Day
        </Button>
      </div>
    </Modal>
  );
};

export default TourModal;
