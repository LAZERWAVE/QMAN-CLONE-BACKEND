import {getToken} from "../../../utils/tokenHandler.js";
import {formatDate} from "../../../utils/timeHandler.js";
import {
  validateDate,
  validateInitial,
  validateRoom,
  validateURL,
} from "../../../utils/validationHandler.js";

async function updateAdditionalClass(parent, {id, data}, {prisma, request}, info) {
  const dataAssistant = await getToken(request);
  const assistantInitial1 = dataAssistant.data.username;

  const currentAdditionalClass = await prisma.additionalClass.findUnique({
    where: {
      additionalClassID: id,
    },
  }, "{assistantInitial1, assistantInitial2}");

  if (!dataAssistant || !validateInitial(assistantInitial1)) {
    throw new Error("Invalid request header. Please check your session.");
  } else if (data.date && !validateDate(data.date)) {
    throw new Error("Invalid date format. The format should be in 'ISO 8601' format.");
  } else if (data.shift && (data.shift < 1 || data.shift > 6)) {
    throw new Error("Invalid shift range. The range should be between 1 and 6 (inclusively).");
  } else if (data.location && !(validateURL(data.location) || validateRoom(data.location))) {
    throw new Error("Invalid location format. The format should be a zoom link or room ('000') format.");
  } else if (currentAdditionalClass == null) {
    throw new Error("Additional class data could not be found. Please check your additional class.");
  }

  if (data.date) {
    data.date = await formatDate(data.date);
  }

  return await prisma.additionalClass.update({
    data: {
      ...data,
    },
    where: {
      additionalClassID: id,
    },
    include: {
      additionalClassDetails: true,
    },
  }, info);
}

export {updateAdditionalClass};
