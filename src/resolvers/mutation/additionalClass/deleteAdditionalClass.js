import {getToken} from "../../../utils/tokenHandler.js";
import {validateInitial} from "../../../utils/validationHandler.js";

async function deleteAdditionalClass(parent, {id, data}, {prisma, request}, info) {
  const dataAssistant = await getToken(request);
  const assistantInitial1 = dataAssistant.data.username;

  const currentAdditionalClass = await prisma.additionalClass.findUnique({
    where: {
      additionalClassID: id,
    },
  }, "{assistantInitial1, assistantInitial2}");

  if (!dataAssistant || !validateInitial(assistantInitial1)) {
    throw new Error("Invalid request header. Please check your session.");
  } else if (currentAdditionalClass == null) {
    throw new Error("Additional class data could not be found. Please check your additional class.");
  }

  await prisma.additionalClassDetail.deleteMany({
    where: {
      additionalClassID: id,
    },
  }, info);

  return await prisma.additionalClass.delete({
    where: {
      additionalClassID: id,
    },
    include: {
      additionalClassDetails: true,
    },
  }, info);
}

export {deleteAdditionalClass};
