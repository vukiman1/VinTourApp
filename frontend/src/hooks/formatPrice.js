function formatPrice(number) {
  // Chuyển số thành chuỗi và đảm bảo nó là chuỗi
  let strNumber = String(number);

  // Tìm vị trí của dấu chấm (nếu có)
  let dotIndex = strNumber.indexOf(".");

  // Tạo một mảng lưu trữ phần nguyên và phần thập phân (nếu có)
  let integerPart = dotIndex === -1 ? strNumber : strNumber.slice(0, dotIndex);
  let decimalPart = dotIndex === -1 ? "" : strNumber.slice(dotIndex);

  // Chia phần nguyên thành các nhóm ba chữ số từ phải qua trái
  let integerGroups = integerPart
    .split("")
    .reverse()
    .join("")
    .match(/\d{1,3}/g);

  // Kiểm tra xem integerGroups có tồn tại không
  let formattedInteger = integerGroups
    ? integerGroups.join(".").split("").reverse().join("")
    : "";

  // Kết hợp phần nguyên và phần thập phân (nếu có)
  let formattedNumber = decimalPart
    ? formattedInteger + decimalPart
    : formattedInteger;

  return formattedNumber;
}

export default formatPrice;
