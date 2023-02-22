import {
  getAssistantLoginResponse,
  getAssistantProfileResponse,
  getAssistantRoleResponse,
} from "../../../utils/messier.js";
import {generateToken} from "../../../utils/tokenHandler.js";
import {validateInitial} from "../../../utils/validationHandler.js";
import {getCurrentTime} from "../../../utils/timeHandler.js";

async function loginAssistant(parent, {data}, {}, info) {
  data.username = data.username.toUpperCase();

  if (!validateInitial(data.username)) {
    throw new Error("Invalid assistant initial format. The format should be in 'XX00-0' format.");
  }

  let assistantLoginResponse;
  try {
    assistantLoginResponse = await getAssistantLoginResponse(data.username.toLowerCase(), data.password);
  } catch (e) {
    throw new Error("Invalid assistant credentials.");
  }

  let assistantProfileResponse; let name; let binusianID; let username; let accessToken;
  try {
    assistantProfileResponse = await getAssistantProfileResponse(data.username);
    name = assistantProfileResponse.Name;
    binusianID = assistantProfileResponse.BinusianId;
    username = assistantProfileResponse.Username;
    accessToken = generateToken({binusianID, username, name});
  } catch (e) {
    throw new Error("Failed to fetch assistant profile.");
  }

  const OFFICER = "Software Assistant Supervisor";
  let assistantRoleList;
  try {
    assistantRoleList = await getAssistantRoleResponse(username);
  } catch (e) {
    throw new Error("Failed to fetch assistant role.");
  }

  return {
    accessToken: accessToken,
    accessTokenMessier: assistantLoginResponse.Token.access_token,
    expires: getCurrentTime().format(),
    type: (assistantRoleList.includes(OFFICER)) ? "OFFICER" : "ASSISTANT",
  };
}

export {loginAssistant};
