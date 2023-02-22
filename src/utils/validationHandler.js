const validateInitial = (initial) => {
  const ruleInitial = /^[A-Z]{2}[0-9]{2}-[0-9]$/;
  return ruleInitial.test(initial);
};

const validateNIM = (nim) => {
  const ruleNIM = /^\d{10}$/;
  return ruleNIM.test(nim);
};

const validateUUID = (uuid) => {
  const ruleUUID = /^[A-F\d]{8}-[A-F\d]{4}-4[A-F\d]{3}-[89AB][A-F\d]{3}-[A-F\d]{12}$/i;
  return ruleUUID.test(uuid);
};

const validateCourseSubject = (courseSubject) => {
  const ruleCourseSubject = /^[A-Z]{4}\d{4}-/;
  return ruleCourseSubject.test(courseSubject);
};

const validateDate = (date) => {
  // eslint-disable-next-line max-len
  const ruleDate = /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}(\.[0-9]+)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?Z$/;
  return ruleDate.test(date);
};

const validateClass = (classVar) => {
  const ruleClass = /^[A-Z]{2}\d{2}$/;
  return ruleClass.test(classVar);
};

const validateURL = (url) => {
  let urlObj;
  try {
    urlObj = new URL(url);
  } catch (e) {
    return false;
  }

  return urlObj.protocol === "http:" || urlObj.protocol === "https:";
};

const validateRoom = (room) => {
  const ruleRoom = /^\d{3}$/;
  return ruleRoom.test(room);
};

const validateMinMaxInteger = (val, min, max) => {
  return val >= min && val <= max;
};

const validateEqualString = (val, eqVal) => {
  return val === eqVal;
};

export {
  validateInitial,
  validateNIM,
  validateUUID,
  validateCourseSubject,
  validateDate,
  validateClass,
  validateURL,
  validateRoom,
  validateMinMaxInteger,
  validateEqualString,
};
