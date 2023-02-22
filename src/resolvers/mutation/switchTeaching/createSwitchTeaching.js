import {getToken} from "../../../utils/tokenHandler.js";
import {formatDate, getDateOnly} from "../../../utils/timeHandler.js";
import {
  validateClass,
  validateCourseSubject,
  validateDate,
  validateInitial,
  validateUUID,
} from "../../../utils/validationHandler.js";
import {getClassDetail} from "../../../utils/messier.js";
import {getShiftSwitchTeaching} from "../../../utils/additionalHandler.js";

async function createSwitchTeaching(parent, {data}, {prisma, request}, info) {
  const dataAssistant = await getToken(request);
  const assistantFrom = (data.ignore) ? data.assistantFrom : dataAssistant.data.username;
  delete data.ignore;

  if (!dataAssistant || !validateInitial(assistantFrom)) {
    throw new Error("Invalid request header. Please check your session.");
  } else if (!validateUUID(data.semesterID)) {
    throw new Error("Invalid semester ID format. Semester ID should be in 'UUID' format.");
  } else if (!validateInitial(data.assistantTo)) {
    throw new Error("Invalid assistant format. The format should be in 'XX00-0' format.");
  } else if (assistantFrom.trim() === data.assistantTo.trim()) {
    throw new Error("You cannot switch with yourself.");
  } else if (!validateCourseSubject(data.courseSubject)) {
    throw new Error("Invalid course subject format. The format should be in 'COMPXXXX-XXX' format.");
  } else if (!validateClass(data.class)) {
    throw new Error("Invalid class format. The format should be in 'XX00' format.");
  } else if (!validateDate(data.date)) {
    throw new Error("Invalid date format. The format should be in 'ISO 8601' format.");
  }

  let classDetailResponse;
  try {
    classDetailResponse = await getClassDetail(data.courseSubject, data.class, getDateOnly(data.date));
  } catch (e) {
    throw new Error("Failed to fetch teaching transaction schedule.");
  }

  if (classDetailResponse == null) {
    throw new Error("Invalid schedule date. Check your teaching transaction schedule.");
  }

  data.date = await formatDate(data.date);

  const newSwitchTeaching = await prisma.switchTeaching.create({
    data: {
      ...data,
      assistantFrom: assistantFrom,
      status: "PERMISSION",
    },
  }, info);

  return {
    ...newSwitchTeaching,
    shift: getShiftSwitchTeaching(classDetailResponse.Shift),
    session: classDetailResponse.Session,
  };
}

export {createSwitchTeaching};
