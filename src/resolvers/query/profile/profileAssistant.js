import {getToken} from "../../../utils/tokenHandler.js";
import {getAssistantProfileResponse} from "../../../utils/messier.js";
import {validateInitial} from "../../../utils/validationHandler.js";

async function profileAssistant(parent, {}, {request}, info) {
  const dataAssistant = await getToken(request);
  const username = dataAssistant.data.username;

  if (!dataAssistant || !validateInitial(username)) {
    throw new Error("Invalid request header. Please check your session.");
  }

  let assistantProfileResponse;
  try {
    assistantProfileResponse = await getAssistantProfileResponse(username);
  } catch (e) {
    throw new Error("Failed to fetch assistant profile.");
  }

  return {
    binusianID: assistantProfileResponse.BinusianId,
    name: assistantProfileResponse.Name,
    username: assistantProfileResponse.Username,
    pictureID: assistantProfileResponse.PictureId,
  };
}

export {profileAssistant};
