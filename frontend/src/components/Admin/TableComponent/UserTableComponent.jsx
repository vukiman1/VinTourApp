// import React, { useEffect } from "react";
// import { Table, Button } from "antd";
// import useFetch from "../../../hooks/useFetch";
// import { BASE_URL } from "../../../utils/config";

// const UserTableComponent = (props) => {
//   const { selectionType = "checkbox" } = props;
//   const { data: users } = useFetch(`${BASE_URL}/users`);
//   //=================================================================== ?
//   const token = localStorage.getItem("token");
//   console.log(token);
//   const fetchData = async () => {
//     try {
//       const response = await fetch(`${BASE_URL}/users`, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const data = await response.json();
//       console.log(data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };
//   useEffect(() => {
//     fetchData();
//   });
//   // ==================================================================
//   console.log(users);
//   console.log(`${BASE_URL}/users`);
//   const handleEdit = (record) => {
//     console.log("Edit:", record);
//   };

//   const handleDelete = async (record) => {
//     //Xử lý logic khi nhấn nút Xóa
//     try {
//       const res = await fetch(`${BASE_URL}/users/${record._id}`, {
//         method: "delete",
//         headers: {
//           "content-type": "application/json",
//         },
//         credentials: "include",
//       });
//       const result = await res.json();

//       if (!res.ok) {
//         return alert(result.message);
//       }
//       alert("Xoá thành công!");
//       window.location.reload();
//     } catch (error) {
//       alert(error.message);
//     }
//     console.log("Delete:", record._id);
//   };

//   const columns = [
//     {
//       title: "Name",
//       dataIndex: "username",
//       render: (text) => <a>{text}</a>,
//     },
//     {
//       title: "Email",
//       dataIndex: "email",
//     },
//     {
//       title: "Address",
//       dataIndex: "address",
//     },
//     {
//       title: "Phone",
//       dataIndex: "phone",
//     },
//     {
//       title: "Action",
//       dataIndex: "action",
//       render: (_, record) => (
//         <span>
//           <Button onClick={() => handleEdit(record)}>Update</Button>
//           <Button className="ms-2" onClick={() => handleDelete(record)}>
//             Delete
//           </Button>
//         </span>
//       ),
//     },
//   ];

//   const rowSelection = {
//     onChange: (selectedRowKeys, selectedRows) => {
//       console.log(
//         `selectedRowKeys: ${selectedRowKeys}`,
//         "selectedRows: ",
//         selectedRows
//       );
//     },
//     getCheckboxProps: (record) => ({
//       disabled: record.name === "Disabled User",
//       name: record.name,
//     }),
//   };

//   return (
//     <Table
//       rowSelection={{
//         type: selectionType,
//         ...rowSelection,
//       }}
//       columns={columns}
//       dataSource={users}
//     />
//   );
// };

// export default UserTableComponent;
import { Table, Button } from "antd";
import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../../utils/config";

const UserTableComponent = ({ onEdit }) => {
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);

      // Kiểm tra dữ liệu trả về có phải là object không
      if (data && typeof data === "object" && !Array.isArray(data)) {
        setUsers(Object.values(data)); // Chuyển đổi object thành mảng
      } else if (Array.isArray(data)) {
        setUsers(data); // Nếu dữ liệu đã là mảng thì set trực tiếp
      } else {
        throw new Error("Data format is not correct");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Chỉ chạy một lần khi component mount

  const columns = [
    {
      title: "Name",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button onClick={() => onEdit(record)}>Update</Button>
      ),
    },
  ];
  console.log(users.data);
  return <Table dataSource={users} columns={columns} rowKey="_id" />;
};

export default UserTableComponent;
