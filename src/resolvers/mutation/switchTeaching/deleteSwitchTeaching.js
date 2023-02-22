import {getToken} from "../../../utils/tokenHandler.js";
import {validateInitial} from "../../../utils/validationHandler.js";

async function deleteSwitchTeaching(parent, {id, data}, {prisma, request}, info) {
  const dataAssistant = await getToken(request);
  const assistantFrom = dataAssistant.data.username;

  const currentSwitchTeaching = await prisma.switchTeaching.findUnique({
    where: {
      switchTeachingID: id,
    },
  }, "{assistantFrom}");

  if (!dataAssistant || !validateInitial(assistantFrom)) {
    throw new Error("Invalid request header. Please check your session.");
  } else if (currentSwitchTeaching == null) {
    throw new Error("Switch teaching data could not be found. Please check your switch teaching.");
  }

  return await prisma.switchTeaching.delete({
    where: {
      switchTeachingID: id,
    },
  }, info);
}

export {deleteSwitchTeaching};
