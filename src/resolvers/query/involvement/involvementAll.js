import {getAssistantList} from "../../../utils/messier.js";
import {
  getAdditionalClass,
  getBGOtherGrade,
  getKPIGrade,
  getPetition,
  getSwitchTeaching,
} from "./involvementUtility.js";
import {validateInitial, validateUUID} from "../../../utils/validationHandler.js";
import {getToken} from "../../../utils/tokenHandler.js";

async function involvementAll(parent, {data}, {prisma, request}, info) {
  const dataAssistant = await getToken(request);

  let allAssistant;
  try {
    allAssistant = await getAssistantList();
  } catch (e) {
    throw new Error("Failed to fetch all assistant data.");
  }
  allAssistant = allAssistant.active;
  allAssistant = await allAssistant.filter((assistant) => {
    const filterAssistant = /^[A-Z][A-Z][0-9][0-9]-[0-9]$/;
    return filterAssistant.test(assistant.Username);
  });

  const allResponse = [];

  for (const assistant of allAssistant) {
    const username = assistant.Username;

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
            assistantPetition.descriptionKPIPetition + "Total Involvement: " + kpiTotal + "\nScore: " + kpiGrade;

    const bgOtherTotal = parseInt(assistantAdditionalClass.total) + parseInt(assistantSwitchTeaching.total) +
            parseInt(assistantPetition.totalBGOtherPetition);
    const bgOtherGrade = await getBGOtherGrade(bgOtherTotal);
    const bgOtherDescription = assistantAdditionalClass.description + assistantSwitchTeaching.description +
            assistantPetition.descriptionBGOtherPetition + "Total Involvement: " + bgOtherTotal +
            "\nScore: " + kpiGrade;

    const bgCompetitionGrade = parseInt(assistantPetition.totalBGCompetitionPetition);
    const bgCompetitionDescription = assistantPetition.descriptionBGCompetitionPetition;

    const bgTrainerGrade = parseInt(assistantPetition.totalBGTrainerPetition);
    const bgTrainerDescription = assistantPetition.descriptionBGTrainerPetition;

    allResponse.push({
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
    });
  }

  return allResponse;
}

export {involvementAll};
