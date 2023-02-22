import {getToken} from "../../../utils/tokenHandler.js";
import {formatDate} from "../../../utils/timeHandler.js";
import {
  validateDate,
  validateEqualString,
  validateInitial,
  validateMinMaxInteger,
} from "../../../utils/validationHandler.js";

async function updatePetition(parent, {id, data}, {prisma, request}, info) {
  const dataAssistant = await getToken(request);
  const petitionCreator = dataAssistant.data.username;

  const currentPetition = await prisma.petition.findUnique({
    where: {
      petitionID: id,
    },
  }, "{petitionCreator}");

  if (!dataAssistant || !validateInitial(petitionCreator)) {
    throw new Error("Invalid request header. Please check your session.");
  } else if (data.petitionTitle && validateEqualString(data.petitionTitle, "")) {
    throw new Error("Invalid title value. The title should not be empty.");
  } else if (data.petitionDescription && validateEqualString(data.petitionDescription, "")) {
    throw new Error("Invalid description value. The description should not be empty.");
  } else if (data.petitionMaxSlot && !validateMinMaxInteger(data.petitionMaxSlot, 1, 100)) {
    throw new Error("Invalid max slot range. The range should be between 1 and 100 (inclusively).");
  } else if (data.date && !validateDate(data.date)) {
    throw new Error("Invalid date format. The format should be in 'ISO 8601' format.");
  } else if (data.mode && !(validateEqualString(data.mode, "OTHER") ||
        validateEqualString(data.mode, "COMPETITION") ||
        validateEqualString(data.mode, "TRAINER"))) {
    throw new Error("Invalid mode value. The value of the status should be between 'OTHER', " +
        "'COMPETITION', and 'TRAINER'.");
  } else if (currentPetition == null) {
    throw new Error("Petition data could not be found. Please check your petition.");
  }

  if (data.date) {
    data.date = await formatDate(data.date);
  }

  return await prisma.petition.update({
    data: {
      ...data,
    },
    where: {
      petitionID: id,
    },
    include: {
      petitionDetails: true,
    },
  }, info);
}

export {updatePetition};
