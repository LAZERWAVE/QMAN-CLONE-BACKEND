import {getToken} from "../../../utils/tokenHandler.js";
import {formatDate} from "../../../utils/timeHandler.js";
import {
  validateClass,
  validateCourseSubject, validateDate,
  validateInitial, validateMinMaxInteger,
  validateRoom, validateURL,
  validateUUID,
} from "../../../utils/validationHandler.js";

async function createAdditionalClass(parent, {data}, {prisma, request}, info) {
  const dataAssistant = await getToken(request);
  const assistantInitial1 = (data.ignore) ? data.assistantInitial1 : dataAssistant.data.username;
  delete data.ignore;

  if (!dataAssistant || !validateInitial(assistantInitial1)) {
    throw new Error("Invalid request header. Please check your session.");
  } else if (!validateUUID(data.semesterID)) {
    throw new Error("Invalid semester ID format. Semester ID should be in 'UUID' format.");
  } else if (!validateCourseSubject(data.courseSubject)) {
    throw new Error("Invalid course subject format. The format should be in 'COMPXXXX-XXX' format.");
  } else if (data.assistantInitial2 && !validateInitial(data.assistantInitial2)) {
    throw new Error("Invalid assistant initial2/partner format. The format should be in 'XX00-0' format.");
  } else if (!validateDate(data.date)) {
    throw new Error("Invalid date format. The format should be in 'ISO 8601' format.");
  } else if (!validateMinMaxInteger(data.shift, 1, 6)) {
    throw new Error("Invalid shift range. The range should be between 1 and 6 (inclusively).");
  } else if (!validateClass(data.class)) {
    throw new Error("Invalid class format. The format should be in 'XX00' format.");
  } else if (!(validateURL(data.location) || validateRoom(data.location))) {
    throw new Error("Invalid location format. The format should be a zoom link or room ('000') format.");
  }

  data.date = await formatDate(data.date);

  return await prisma.additionalClass.create({
    data: {
      ...data,
      assistantInitial1: assistantInitial1,
    },
    include: {
      additionalClassDetails: true,
    },
  }, info);
}

export {createAdditionalClass};
