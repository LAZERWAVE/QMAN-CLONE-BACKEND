import {getToken} from "../../../utils/tokenHandler.js";
import {formatDate} from "../../../utils/timeHandler.js";
import {
  validateDate,
  validateEqualString,
  validateInitial,
  validateMinMaxInteger,
  validateUUID,
} from "../../../utils/validationHandler.js";

async function createPetition(parent, {data}, {prisma, request}, info) {
  const dataAssistant = await getToken(request);
  const petitionCreator = dataAssistant.data.username;

  if (!dataAssistant || !validateInitial(petitionCreator)) {
    throw new Error("Invalid request header. Please check your session.");
  } else if (!validateUUID(data.semesterID)) {
    throw new Error("Invalid semester ID format. Semester ID should be in 'UUID' format.");
  } else if (validateEqualString(data.petitionTitle, "")) {
    throw new Error("Invalid title value. The title should not be empty.");
  } else if (validateEqualString(data.petitionDescription, "")) {
    throw new Error("Invalid description value. The description should not be empty.");
  } else if (!validateMinMaxInteger(data.petitionMaxSlot, 1, 100)) {
    throw new Error("Invalid max slot range. The range should be between 1 and 100 (inclusively).");
  } else if (!validateDate(data.date)) {
    throw new Error("Invalid date format. The format should be in 'ISO 8601' format.");
  } else if (!(validateEqualString(data.mode, "OTHER") ||
        validateEqualString(data.mode, "COMPETITION") ||
        validateEqualString(data.mode, "TRAINER"))) {
    throw new Error("Invalid mode value. The value of the status should be between 'OTHER', " +
        "'COMPETITION', and 'TRAINER'.");
  }

  data.date = await formatDate(data.date);

  return await prisma.petition.create({
    data: {
      ...data,
      petitionCreator: petitionCreator,
    },
    include: {
      petitionDetails: true,
    },
  }, info);
}

export {createPetition};
