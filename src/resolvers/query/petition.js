import {getToken} from "../../utils/tokenHandler.js";
import {validateInitial} from "../../utils/validationHandler.js";

async function petitions(parent, {data}, {prisma, request}, info) {
  const dataAssistant = await getToken(request);
  const username = dataAssistant.data.username;

  if (!dataAssistant || !validateInitial(username)) {
    throw new Error("Invalid request header. Please check your session.");
  }

  const opArgs = {include: {petitionDetails: true}};
  if (data) {
    opArgs.where = {
      AND: [
        {petitionID: data.petitionID},
        {semesterID: data.semesterID},
        {petitionTitle: data.petitionTitle},
        {petitionCreator: data.petitionCreator},
        {date: data.date},
        {ongoing: data.ongoing},
        {mode: data.mode},
      ],
    };
  }

  return await prisma.petition.findMany(opArgs, info);
}

export {petitions};
