import {getToken} from "../../utils/tokenHandler.js";
import {getStudentTransactionResponse} from "../../utils/messier.js";
import {validateNIM, validateUUID} from "../../utils/validationHandler.js";

async function additionalClassStudent(parent, {data}, {prisma, request}, info) {
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
    const filterCollabLectureClassRegex = /^M/;
    const filterCollabLabClassRegex = /^X/;
    return !filterCollabLabClassRegex.test(studentTransaction.ClassName) &&
            !filterCollabLectureClassRegex.test(studentTransaction.ClassName) &&
            studentTransaction.Assistants.length !== 0;
  });

  const courseSubjectList = [];
  studentTransactionResponse.forEach((studentTransaction) => {
    courseSubjectList.push(studentTransaction.Subject);
  });

  const date = new Date();
  date.setHours(7);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);

  const opArgs = {include: {additionalClassDetails: true}};
  opArgs.where = {
    AND: [
      {semesterID: semesterID},
      {done: data.done},
      {courseSubject: {in: courseSubjectList}},
      {date: {gte: date}},
    ],
  };
  if (data.onlyStudentJoin === true) {
    opArgs.where = {
      AND: [
        {semesterID: semesterID},
        {done: data.done},
        {courseSubject: {in: courseSubjectList}},
        {date: {gte: date}},
        {additionalClassDetails: {some: {studentNIM: username}}},
      ],
    };
  } else if (data.onlyStudentJoin === false) {
    opArgs.where = {
      AND: [
        {semesterID: semesterID},
        {done: data.done},
        {courseSubject: {in: courseSubjectList}},
        {date: {gte: date}},
        {additionalClassDetails: {none: {studentNIM: username}}},
      ],
    };
  }

  return await prisma.additionalClass.findMany(opArgs, info);
}

export {additionalClassStudent};
