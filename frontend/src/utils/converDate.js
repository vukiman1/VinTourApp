const convertISODateToNormal = (isoDateString) => {
  const date = new Date(isoDateString);

  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Lưu ý: getMonth() trả về số tháng từ 0 đến 11
  const day = date.getDate();

  // Format ngày, tháng, năm thành chuỗi bình thường
  const normalDate = `${year}-${month < 10 ? "0" : ""}${month}-${
    day < 10 ? "0" : ""
  }${day}`;

  return normalDate;
};

export default convertISODateToNormal;
