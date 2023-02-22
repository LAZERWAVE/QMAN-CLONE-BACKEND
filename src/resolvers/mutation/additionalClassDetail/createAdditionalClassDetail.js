import {getToken} from "../../../utils/tokenHandler.js";
import {validateNIM} from "../../../utils/validationHandler.js";

async function createAdditionalClassDetail(parent, {data}, {prisma, request}, info) {
  const dataStudent = await getToken(request);
  const username = dataStudent.data.username;
  const name = dataStudent.data.name;

  if (!dataStudent || !validateNIM(username)) {
    throw new Error("Invalid request header. Please check your session.");
  }

  const currentAdditionalClassDetail = await prisma.additionalClassDetail.findMany({
    where: {
      AND: [
        {
          studentNIM: username,
        },
        {
          additionalClass: {
            additionalClassID: data.additionalClassID,
          },
        },
      ],
    },
  }, "{studentNIM}");

  if (currentAdditionalClassDetail.length > 0) {
    throw new Error("You have already join this additional class.");
  }

  return await prisma.additionalClassDetail.create({
    data: {
      additionalClass: {
        connect: {
          additionalClassID: data.additionalClassID,
        },
      },
      studentNIM: username,
      studentName: name,
    },
    include: {
      additionalClass: true,
    },
  }, info);
}

export {createAdditionalClassDetail};
