const getAssistantLoginURI = () => {
  return process.env.BASE_URI + process.env.ASSISTANT_LOGIN_URI;
};

const getStudentLoginURI = () => {
  return process.env.BASE_URI + process.env.STUDENT_LOGIN_URI;
};

const getAssistantProfileURI = (username) => {
  return process.env.BASE_URI + process.env.ASSISTANT_PROFILE_URI +
        "?username=" + username;
};

const getStudentProfileURI = (username) => {
  return process.env.BASE_URI + process.env.STUDENT_PROFILE_URI +
        "?nim=" + username;
};

const getAssistantTransactionURI = (username, semesterID) => {
  return process.env.BASE_URI + process.env.ASSISTANT_TRANSACTION_URI +
        "?username=" + username +
        "&semesterId=" + semesterID;
};

const getStudentTransactionURI = (username, semesterID) => {
  return process.env.BASE_URI + process.env.STUDENT_TRANSACTION_URI +
        "?nim=" + username +
        "&semesterId=" + semesterID;
};

const getAssistantRoleURI = (username) => {
  return process.env.BASE_URI + process.env.ASSISTANT_ROLE_URI +
        "?username=" + username;
};

const getSemesterURI = () => {
  return process.env.BASE_URI + process.env.SEMESTER_URI;
};

const getAssistantListURI = () => {
  return process.env.BASE_URI + process.env.ASSISTANT_LIST;
};

const getStudentCountURI = (semesterID, courseName, className) => {
  return process.env.BASE_URI + process.env.STUDENT_COUNT +
        "?semesterId=" + semesterID +
        "&courseName=" + courseName +
        "&className=" + className;
};

const getCourseSubjectListURI = (semesterID) => {
  return process.env.BASE_URI + process.env.COURSE_SUBJECT_LIST +
        "?semesterId=" + semesterID;
};

const getClassDetailURI = (courseName, className, date) => {
  return process.env.BASE_URI + process.env.CLASS_DETAIL +
      "?subjectName=" + courseName +
      "&className=" + className +
      "&date=" + date;
};

export {
  getSemesterURI,
  getAssistantLoginURI,
  getStudentLoginURI,
  getAssistantProfileURI,
  getStudentProfileURI,
  getAssistantTransactionURI,
  getStudentTransactionURI,
  getAssistantRoleURI,
  getAssistantListURI,
  getStudentCountURI,
  getCourseSubjectListURI,
  getClassDetailURI,
};
