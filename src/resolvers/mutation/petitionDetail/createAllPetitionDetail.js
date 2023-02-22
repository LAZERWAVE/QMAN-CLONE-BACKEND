import {getToken} from "../../../utils/tokenHandler.js";
import {
  validateInitial,
  validateMinMaxInteger,
  validateRoom,
  validateURL,
} from "../../../utils/validationHandler.js";

async function createAllPetitionDetail(parent, {data}, {prisma, request}, info) {
  const dataAssistant = await getToken(request);
  const username = dataAssistant.data.username;

  if (!dataAssistant || !validateInitial(username)) {
    throw new Error("Invalid request header. Please check your session.");
  }

  const allPetitionDetail = [];
  const dataObject = JSON.parse(data.json);

  // eslint-disable-next-line guard-for-in
  for (const index in dataObject) {
    const currentPetitionDetail = await prisma.petitionDetail.findMany({
      where: {
        AND: [
          {
            assistant: dataObject[index].assistant,
          },
          {
            petition: {
              petitionID: data.petitionID,
            },
          },
        ],
      },
    }, "{assistant}");

    if (currentPetitionDetail.length > 0) {
      throw new Error(dataObject[index].assistant + " have already join this petition.");
    } else if (!validateMinMaxInteger(dataObject[index].shift, 1, 6)) {
      throw new Error("Invalid shift range for " + dataObject[index].assistant + ". " +
          "The range should be between 1 and 6 (inclusively).");
    } else if (!(validateURL(dataObject[index].location) || validateRoom(dataObject[index].location))) {
      throw new Error("Invalid location format for " + dataObject[index].assistant + ". " +
          "The format should be a zoom link or room ('000') format.");
    } else if (!validateMinMaxInteger(dataObject[index].kpiPoint, 1, 10)) {
      throw new Error("Invalid KPI point range for " + dataObject[index].assistant + ". " +
          "The range should be between 1 and 10 (inclusively).");
    } else if (!validateMinMaxInteger(dataObject[index].bgPoint, 1, 10)) {
      throw new Error("Invalid BG point range for " + dataObject[index].assistant + ". " +
          "The range should be between 1 and 10 (inclusively).");
    }

    allPetitionDetail.push({
      petitionID: data.id,
      assistant: dataObject[index].assistant,
      shift: dataObject[index].shift,
      location: dataObject[index].location,
      kpiPoint: dataObject[index].kpiPoint,
      bgPoint: dataObject[index].bgPoint,
      approved: dataObject[index].approved,
    });
  }

  return await prisma.petitionDetail.createMany({
    data: allPetitionDetail,
    skipDuplicates: true,
  });
}

export {createAllPetitionDetail};
