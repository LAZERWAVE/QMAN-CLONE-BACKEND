import {getToken} from "../../../utils/tokenHandler.js";
import {getStudentTransactionResponse} from "../../../utils/messier.js";
import {validateNIM, validateUUID} from "../../../utils/validationHandler.js";

async function transactionStudent(parent, {data}, {request}, info) {
  const dataStudent = await getToken(request);
  const username = dataStudent.data.username;
  const semesterID = data.semesterID;

  if (!dataStudent || !validateNIM(username)) {
    throw new Error("Invalid request header. Please check your session.");
  } else if (!validateUUID(semesterID)) {
    throw new Error("Invalid semester ID format. Semester ID should be in 'UUID' format.");
  }

  let studentTransactionResponse;
  try {
    studentTransactionResponse = await getStudentTransactionResponse(username, semesterID);
  } catch (e) {
    throw new Error("Failed to fetch student transaction.");
  }

  studentTransactionResponse = await studentTransactionResponse.filter((studentTransaction) => {
    const filterCollabLabClassRegex = /^X/;
    const filterCollabLectureClassRegex = /^M/;
    return !filterCollabLabClassRegex.test(studentTransaction.ClassName) &&
            !filterCollabLectureClassRegex.test(studentTransaction.ClassName) &&
            studentTransaction.Assistants.length !== 0;
  });

  studentTransactionResponse.forEach((studentTransaction) => {
    studentTransaction.courseID = studentTransaction.CourseOutlineId;

    studentTransaction.courseSubject = studentTransaction.Subject;
    studentTransaction.class = studentTransaction.ClassName;

    const assistant = studentTransaction.Assistants;
    studentTransaction.assistantInitial1 = assistant[0];
    studentTransaction.assistantInitial2 = (assistant.length === 1) ? null : assistant[1];

    const studentTransactionPropertiesRemove = ["CourseOutlineId", "ClassName", "Subject", "Assistants"];
    for (const studentTransactionPropertyRemove of studentTransactionPropertiesRemove) {
      (studentTransactionPropertyRemove in studentTransaction) &&
            (delete studentTransaction[studentTransactionPropertyRemove]);
    }
  });

  return studentTransactionResponse;
}

export {transactionStudent};
