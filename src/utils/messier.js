import requestPromise from "request-promise";
import {
  getAssistantListURI,
  getAssistantLoginURI,
  getAssistantProfileURI,
  getAssistantRoleURI,
  getAssistantTransactionURI, getClassDetailURI,
  getCourseSubjectListURI,
  getSemesterURI,
  getStudentCountURI,
  getStudentLoginURI,
  getStudentProfileURI,
  getStudentTransactionURI,
} from "./uriHandler.js";

const getSemesterResponse = async () => {
  const requestAssistantProfileOptions = {
    method: "GET",
    uri: getSemesterURI(),
    json: true,
  };
  return await requestPromise(requestAssistantProfileOptions);
};

const getAssistantLoginResponse = async (username, password) => {
  const requestAssistantLoginOptions = {
    method: "POST",
    uri: getAssistantLoginURI(),
    body: {
      username: username,
      password: password,
    },
    json: true,
  };
  return await requestPromise(requestAssistantLoginOptions);
};

const getStudentLoginResponse = async (username, password) => {
  const requestAssistantLoginOptions = {
    method: "POST",
    uri: getStudentLoginURI(),
    body: {
      username: username,
      password: password,
    },
    json: true,
  };
  return await requestPromise(requestAssistantLoginOptions);
};

const getAssistantProfileResponse = async (username) => {
  const requestAssistantProfileOptions = {
    method: "GET",
    uri: getAssistantProfileURI(username),
    json: true,
  };
  return await requestPromise(requestAssistantProfileOptions);
};

const getStudentProfileResponse = async (username) => {
  const requestAssistantProfileOptions = {
    method: "GET",
    uri: getStudentProfileURI(username),
    json: true,
  };
  return await requestPromise(requestAssistantProfileOptions);
};

const getAssistantTransactionResponse = async (username, semesterID) => {
  const requestAssistantTransactionOptions = {
    method: "GET",
    uri: getAssistantTransactionURI(username, semesterID),
    json: true,
  };
  return await requestPromise(requestAssistantTransactionOptions);
};

const getStudentTransactionResponse = async (username, semesterID) => {
  const requestAssistantTransactionOptions = {
    method: "GET",
    uri: getStudentTransactionURI(username, semesterID),
    json: true,
  };
  return await requestPromise(requestAssistantTransactionOptions);
};

const getAssistantRoleResponse = async (username) => {
  const requestAssistantRoleOptions = {
    method: "GET",
    uri: getAssistantRoleURI(username),
    json: true,
  };
  return await requestPromise(requestAssistantRoleOptions);
};

const getAssistantList = async () => {
  const requestAssistantListOptions = {
    method: "GET",
    uri: getAssistantListURI(),
    json: true,
  };
  return await requestPromise(requestAssistantListOptions);
};

const getStudentCount = async (semesterID, courseName, className) => {
  const requestStudentCountOptions = {
    method: "GET",
    uri: getStudentCountURI(semesterID, courseName, className),
    json: true,
  };
  return await requestPromise(requestStudentCountOptions);
};

const getCourseSubjectList = async (semesterID, messierToken) => {
  const requestCourseSubjectListOptions = {
    method: "GET",
    uri: getCourseSubjectListURI(semesterID),
    json: true,
    headers: {
      "Authorization": "bearer " + messierToken,
    },
  };
  return await requestPromise(requestCourseSubjectListOptions);
};

const getClassDetail = async (courseName, className, date) => {
  const requestClassDetailOptions = {
    method: "GET",
    uri: getClassDetailURI(courseName, className, date),
    json: true,
  };
  return await requestPromise(requestClassDetailOptions);
};

export {
  getSemesterResponse,
  getAssistantLoginResponse,
  getStudentLoginResponse,
  getAssistantProfileResponse,
  getStudentProfileResponse,
  getAssistantTransactionResponse,
  getStudentTransactionResponse,
  getAssistantRoleResponse,
  getAssistantList,
  getStudentCount,
  getCourseSubjectList,
  getClassDetail,
};


