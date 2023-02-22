import {getToken} from "../../../utils/tokenHandler.js";
import {validateInitial} from "../../../utils/validationHandler.js";

async function deletePetitionDetail(parent, {id, data}, {prisma, request}, info) {
  const dataAssistant = await getToken(request);
  const username = dataAssistant.data.username;

  const currentPetitionDetail = await prisma.petitionDetail.findUnique({
    where: {
      petitionDetailID: id,
    },
  }, "{assistant}");

  if (!dataAssistant || !validateInitial(username)) {
    throw new Error("Invalid request header. Please check your session.");
  }
  if (currentPetitionDetail == null) {
    throw new Error("Petition detail data could not be found. Please check your petition detail.");
  }

  return await prisma.petitionDetail.delete({
    where: {
      petitionDetailID: id,
    },
  }, info);
}

export {deletePetitionDetail};
