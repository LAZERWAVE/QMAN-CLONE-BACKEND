import {getMessierToken, getToken} from "../../utils/tokenHandler.js";
import {getCourseSubjectList} from "../../utils/messier.js";
import {validateInitial} from "../../utils/validationHandler.js";

async function getCourseSubject(parent, {data}, {request}, info) {
  const dataAssistant = await getToken(request);
  const messier = await getMessierToken(request);
  const username = dataAssistant.data.username;
  const semesterID = data.semesterID;

  if (!dataAssistant || !validateInitial(username)) {
    throw new Error("Invalid request header. Please check your session.");
  }

  let courseSubjectResponse;
  try {
    courseSubjectResponse = await getCourseSubjectList(semesterID, messier);
  } catch (e) {
    throw new Error("Failed to fetch course subject list.");
  }

  courseSubjectResponse.forEach((courseSubject) => {
    courseSubject.courseSubjectID = courseSubject.CourseOutlineId;
    courseSubject.courseSubjectDescription = courseSubject.Name;

    const courseSubjectPropertiesRemove = ["CourseOutlineId", "Name"];
    for (const semesterPropertyRemove of courseSubjectPropertiesRemove) {
      (semesterPropertyRemove in courseSubject) &&
            (delete courseSubject[semesterPropertyRemove]);
    }
  });

  return courseSubjectResponse;
}

export {getCourseSubject};
