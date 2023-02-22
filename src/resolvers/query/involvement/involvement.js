import {getToken} from "../../../utils/tokenHandler.js";
import {getAdditionalClass, getBGOtherGrade, getKPIGrade, getPetition, getSwitchTeaching} from "./involvementUtility.js";
import {validateInitial, validateUUID} from "../../../utils/validationHandler.js";

async function involvement(parent, {data}, {prisma, request}, info) {
  const dataAssistant = await getToken(request);
  const username = dataAssistant.data.username;

  if (!dataAssistant || !validateInitial(username)) {
    throw new Error("Invalid request header. Please check your session.");
  } else if (!validateUUID(data.semesterID)) {
    throw new Error("Invalid semester ID format. Semester ID should be in 'UUID' format.");
  }

  const assistantAdditionalClass = await getAdditionalClass(username, data, prisma);
  const assistantSwitchTeaching = await getSwitchTeaching(username, data, prisma);
  const assistantPetition = await getPetition(username, data, prisma);

  const kpiTotal = parseInt(assistantAdditionalClass.total) + parseInt(assistantSwitchTeaching.total) +
        parseInt(assistantPetition.totalKPIPetition);
  const kpiGrade = await getKPIGrade(kpiTotal);
  const kpiDescription = assistantAdditionalClass.description + assistantSwitchTeaching.description +
        assistantPetition.descriptionKPIPetition + "Total Involvement: " + kpiTotal + "\r\nScore" + kpiGrade;

  const bgOtherTotal = parseInt(assistantAdditionalClass.total) + parseInt(assistantSwitchTeaching.total) +
        parseInt(assistantPetition.totalBGOtherPetition);
  const bgOtherGrade = await getBGOtherGrade(bgOtherTotal);
  const bgOtherDescription = assistantAdditionalClass.description + assistantSwitchTeaching.description +
        assistantPetition.descriptionBGOtherPetition + "Total Involvement: " + bgOtherTotal + "\r\nScore" + kpiGrade;

  const bgCompetitionGrade = parseInt(assistantPetition.totalBGCompetitionPetition);
  const bgCompetitionDescription = assistantPetition.descriptionBGCompetitionPetition;

  const bgTrainerGrade = parseInt(assistantPetition.totalBGTrainerPetition);
  const bgTrainerDescription = assistantPetition.descriptionBGTrainerPetition;

  return {
    initial: username,

    kpiTotal: kpiTotal,
    kpiGrade: kpiGrade,
    kpiDescription: kpiDescription,

    bgOtherTotal: bgOtherTotal,
    bgOtherGrade: bgOtherGrade,
    bgOtherDescription: bgOtherDescription,

    bgCompetitionGrade: bgCompetitionGrade,
    bgCompetitionDescription: bgCompetitionDescription,

    bgTrainerGrade: bgTrainerGrade,
    bgTrainerDescription: bgTrainerDescription,

    additionalClass: assistantAdditionalClass.data,
    petition: assistantPetition.data,
    switchTeaching: assistantSwitchTeaching.data,
  };
}

export {involvement};
