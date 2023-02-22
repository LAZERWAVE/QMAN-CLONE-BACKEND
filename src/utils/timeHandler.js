import moment from "moment-timezone";

const getCurrentTime = () => {
  return moment().tz("Asia/Bangkok").add(1, "days");
};

const getDateOnly = (value) => {
  return moment(value).tz("Asia/Bangkok").format("DD MMM YYYY");
};

const formatDate = (value) => {
  return moment(value).tz("Asia/Bangkok").format();
};

export {
  getCurrentTime,
  getDateOnly,
  formatDate,
};
