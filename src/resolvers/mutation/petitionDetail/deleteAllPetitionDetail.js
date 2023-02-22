import {getToken} from "../../../utils/tokenHandler.js";
import {validateInitial} from "../../../utils/validationHandler.js";

async function deleteAllPetitionDetail(parent, {id}, {prisma, request}, info) {
  const dataAssistant = await getToken(request);
  const username = dataAssistant.data.username;

  const currentPetition = await prisma.petition.findUnique({
    where: {
      petitionID: id,
    },
  }, "{petitionID}");

  if (!dataAssistant || !validateInitial(username)) {
    throw new Error("Invalid request header. Please check your session.");
  } else if (currentPetition == null) {
    throw new Error("Petition detail data could not be found. Please check your petition detail.");
  }

  return await prisma.petitionDetail.deleteMany({}, info);
}

export {deleteAllPetitionDetail};
