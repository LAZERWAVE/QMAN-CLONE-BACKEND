import {getToken} from "../../utils/tokenHandler.js";
import {validateInitial} from "../../utils/validationHandler.js";
import {getClassDetail} from "../../utils/messier.js";
import {getDateOnly} from "../../utils/timeHandler.js";
import {getShiftSwitchTeaching} from "../../utils/additionalHandler.js";

async function switchTeaching(parent, {data}, {prisma, request}, info) {
  const dataAssistant = await getToken(request);
  const username = dataAssistant.data.username;

  if (!dataAssistant || !validateInitial(username)) {
    throw new Error("Invalid request header. Please check your session.");
  }

  const opArgs = {};
  if (data) {
    opArgs.where = {
      AND: [
        {semesterID: data.semesterID},
        {
          OR: [
            {assistantFrom: data.assistant},
            {assistantTo: data.assistant},
          ],
        },
        {assistantFrom: data.assistantFrom},
        {assistantTo: data.assistantTo},
        {courseSubject: data.courseSubject},
        {class: data.class},
        {approved: data.approved},
        {done: data.done},
        {status: data.status},
      ],
    };
  }

  const searchedSwitchTeaching = await prisma.switchTeaching.findMany(opArgs, info);

  for (const switchTeaching of searchedSwitchTeaching) {
    let classDetailResponse;
    try {
      classDetailResponse = await getClassDetail(switchTeaching.courseSubject, switchTeaching.class,
          getDateOnly(switchTeaching.date));
      switchTeaching.shift = getShiftSwitchTeaching(classDetailResponse.Shift),
      switchTeaching.session = classDetailResponse.Session;
    } catch (e) {
      throw new Error("Failed to fetch teaching transaction schedule.");
    }
  }

  return searchedSwitchTeaching;
}

export {switchTeaching};
