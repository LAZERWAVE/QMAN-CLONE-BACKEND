import {getToken} from "../../../utils/tokenHandler.js";
import {validateInitial} from "../../../utils/validationHandler.js";

async function deletePetition(parent, {id, data}, {prisma, request}, info) {
  const dataAssistant = await getToken(request);
  const petitionCreator = dataAssistant.data.username;

  const currentPetition = await prisma.petition.findUnique({
    where: {
      petitionID: id,
    },
  }, "{petitionCreator}");

  if (!dataAssistant || !validateInitial(petitionCreator)) {
    throw new Error("Invalid request header. Please check your session.");
  } else if (currentPetition == null) {
    throw new Error("Petition data could not be found. Please check your petition.");
  }

  await prisma.petitionDetail.deleteMany({
    where: {
      petitionID: id,
    },
  }, info);

  return await prisma.petition.delete({
    where: {
      petitionID: id,
    },
    include: {
      petitionDetails: true,
    },
  }, info);
}

export {deletePetition};
