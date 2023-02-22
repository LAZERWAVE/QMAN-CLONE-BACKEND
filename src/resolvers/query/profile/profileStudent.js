import {getToken} from "../../../utils/tokenHandler.js";
import {getStudentProfileResponse} from "../../../utils/messier.js";
import {validateNIM} from "../../../utils/validationHandler.js";

async function profileStudent(parent, {}, {request}, info) {
  const dataStudent = await getToken(request);
  const username = dataStudent.data.username;

  if (!dataStudent || !validateNIM(username)) {
    throw new Error("Invalid request header. Please check your session.");
  }

  let studentProfileResponse;
  try {
    studentProfileResponse = await getStudentProfileResponse(username);
  } catch (e) {
    throw new Error("Failed to fetch student profile.");
  }

  return {
    binusianID: studentProfileResponse.BinusianId,
    birthDate: studentProfileResponse.BirthDate,
    name: studentProfileResponse.Name,
    pictureID: studentProfileResponse.PictureId,
    userID: studentProfileResponse.BinusianId,
    username: studentProfileResponse.Number,
  };
}

export {profileStudent};
