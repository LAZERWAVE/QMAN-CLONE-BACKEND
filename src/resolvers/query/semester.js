import {getToken} from "../../utils/tokenHandler.js";
import {getSemesterResponse} from "../../utils/messier.js";

async function getSemester(parent, {data}, {request}, info) {
  await getToken(request, false);

  let semesterResponse;
  try {
    semesterResponse = await getSemesterResponse();
  } catch (e) {
    throw new Error("Failed to fetch semester.");
  }

  semesterResponse = await semesterResponse.filter((semester) => {
    const filterBCARegex = /^BCA/;
    return !filterBCARegex.test(semester.Description);
  });

  semesterResponse.forEach((semester) => {
    semester.semesterID = semester.SemesterId;
    semester.description = semester.Description;

    const semesterPropertiesRemove = ["SemesterId", "Description"];
    for (const semesterPropertyRemove of semesterPropertiesRemove) {
      (semesterPropertyRemove in semester) &&
            (delete semester[semesterPropertyRemove]);
    }
  });

  return semesterResponse;
}

export {getSemester};
