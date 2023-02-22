import {getToken} from "../../../utils/tokenHandler.js";
import {
  validateDate,
  validateEqualString,
  validateInitial,
  validateMinMaxInteger,
} from "../../../utils/validationHandler.js";
import {formatDate, getDateOnly} from "../../../utils/timeHandler.js";
import {getClassDetail} from "../../../utils/messier.js";
import {getShiftSwitchTeaching} from "../../../utils/additionalHandler.js";

async function updateSwitchTeaching(parent, {id, data}, {prisma, request}, info) {
  const dataAssistant = await getToken(request);

  const currentSwitchTeaching = await prisma.switchTeaching.findUnique({
    where: {
      switchTeachingID: id,
    },
  }, "{switchTeachingID, courseSubject, class}");

  if (!dataAssistant) {
    throw new Error("Invalid request header. Please check your session.");
  } else if (data.assistantTo && !validateInitial(data.assistantTo)) {
    throw new Error("Invalid assistant initial format. The format should be in 'XX00-0' format.");
  } else if (data.date && !validateDate(data.date)) {
    throw new Error("Invalid date format. The format should be in 'ISO 8601' format.");
  } else if (data.shift && !validateMinMaxInteger(data.shift, 1, 6)) {
    throw new Error("Invalid shift range. The range should be between 1 and 6 (inclusively).");
  } else if (data.session && !validateMinMaxInteger(data.session, 1, 12)) {
    throw new Error("Invalid session range. The range should be between 1 and 12 (inclusively).");
  } else if (data.status && !(validateEqualString(data.status, "PERMISSION") ||
        validateEqualString(data.status, "SPECIAL PERMISSION") ||
        validateEqualString(data.status, "SUBSTITUTED") ||
        validateEqualString(data.status, "THIRD PERSON"))) {
    throw new Error("Invalid status value. The value of the status should be between 'PERMISSION', " +
        "'SPECIAL PERMISSION', 'SUBSTITUTED', and 'THIRD PERSON'.");
  } else if (currentSwitchTeaching == null) {
    throw new Error("Switch teaching data could not be found. Please check your switch teaching.");
  }

  let classDetailResponse;
  try {
    classDetailResponse = await getClassDetail(currentSwitchTeaching.courseSubject,
        currentSwitchTeaching.class, getDateOnly(data.date));
  } catch (e) {
    throw new Error("Failed to fetch teaching transaction schedule.");
  }

  if (classDetailResponse == null) {
    throw new Error("Invalid schedule date. Check your teaching transaction schedule.");
  }

  data.date = await formatDate(data.date);

  const searchedSwitchTeaching = await prisma.switchTeaching.update({
    data: {
      ...data,
    },
    where: {
      switchTeachingID: id,
    },
  }, info);

  return {
    ...searchedSwitchTeaching,
    shift: getShiftSwitchTeaching(classDetailResponse.Shift),
    session: classDetailResponse.Session,
  };
}

export {updateSwitchTeaching};
