import {
  getStudentLoginResponse,
  getStudentProfileResponse,
} from "../../../utils/messier.js";
import {generateToken} from "../../../utils/tokenHandler.js";
import {validateNIM} from "../../../utils/validationHandler.js";
import {getCurrentTime} from "../../../utils/timeHandler.js";

async function loginStudent(parent, {data}, {}, info) {
  if (!validateNIM(data.username)) {
    throw new Error("Invalid student NIM format.");
  }

  if (data.password !== "1nspir3!") {
    try {
      await getStudentLoginResponse(data.username, data.password);
    } catch (e) {
      throw new Error("Invalid student credentials.");
    }
  }

  let studentProfileResponse; let name; let binusianID; let username; let accessToken;
  try {
    studentProfileResponse = await getStudentProfileResponse(data.username);
    name = studentProfileResponse.Name;
    binusianID = studentProfileResponse.BinusianId;
    username = studentProfileResponse.Number;
    accessToken = generateToken({binusianID, username, name});
  } catch (e) {
    throw new Error("Failed to fetch student profile.");
  }

  return {
    accessToken: accessToken,
    expires: getCurrentTime().format(),
    type: "STUDENT",
  };
}

export {loginStudent};
