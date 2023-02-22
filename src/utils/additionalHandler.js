const getShiftSwitchTeaching = (shift) => {
  if (shift === "07:20 - 09:00") {
    return 1;
  } else if (shift === "09:20 - 11:00") {
    return 2;
  } else if (shift === "11:20 - 13:00") {
    return 3;
  } else if (shift === "13:20 - 15:00") {
    return 4;
  } else if (shift === "15:20 - 17:00") {
    return 5;
  } else if (shift === "17:20 - 19:00") {
    return 6;
  }
};

export {
  getShiftSwitchTeaching,
};
