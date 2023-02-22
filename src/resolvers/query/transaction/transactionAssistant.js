import {getToken} from "../../../utils/tokenHandler.js";
import {getAssistantTransactionResponse} from "../../../utils/messier.js";
import {validateInitial, validateUUID} from "../../../utils/validationHandler.js";

async function transactionAssistant(parent, {data}, {request}, info) {
  const dataAssistant = await getToken(request);
  const username = dataAssistant.data.username;
  const semesterID = data.semesterID;

  if (!dataAssistant || !validateInitial(username)) {
    throw new Error("Invalid request header. Please check your session.");
  } else if (!validateUUID(semesterID)) {
    throw new Error("Invalid semester ID format. Semester ID should be in 'UUID' format.");
  }

  let assistantTransactionResponse;
  try {
    assistantTransactionResponse = await getAssistantTransactionResponse(username, semesterID);
  } catch (e) {
    throw new Error("Failed to fetch assistant transaction.");
  }

  assistantTransactionResponse = await assistantTransactionResponse.filter((assistantTransaction) => {
    const filterCollabClassRegex = /^X/;
    return !filterCollabClassRegex.test(assistantTransaction.Class);
  });

  assistantTransactionResponse.forEach((assistantTransaction) => {
    assistantTransaction.courseID = assistantTransaction.CourseOutlineId;
    assistantTransaction.courseSubject = assistantTransaction.Subject;
    assistantTransaction.class = assistantTransaction.Class;

    assistantTransaction.totalStudent = assistantTransaction.TotalStudent;

    const assistant = assistantTransaction.Assistant;
    if (!assistant.includes(",")) {
      assistantTransaction.assistantInitial1 = assistant;
      assistantTransaction.assistantInitial2 = null;
    } else {
      const assistantList = assistant.split(",");
      assistantTransaction.assistantInitial1 = assistantList[0];
      assistantTransaction.assistantInitial2 = assistantList[1].trim();
    }

    const assistantTransactionPropertiesRemove = ["Assistant", "Campus", "Date", "Day", "Id", "Note", "Number",
      "Realization", "Room", "Session", "Shift", "CourseOutlineId", "Subject", "Class", "TotalStudent"];
    for (const assistantTransactionPropertyRemove of assistantTransactionPropertiesRemove) {
      (assistantTransactionPropertyRemove in assistantTransaction) &&
            (delete assistantTransaction[assistantTransactionPropertyRemove]);
    }
  });

  return assistantTransactionResponse;
}

export {transactionAssistant};
