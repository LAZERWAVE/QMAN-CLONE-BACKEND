import {getToken} from "../../../utils/tokenHandler.js";
import {validateNIM} from "../../../utils/validationHandler.js";

async function deleteAdditionalClassDetail(parent, {id, data}, {prisma, request}, info) {
  const dataStudent = await getToken(request);
  const username = dataStudent.data.username;

  const currentAdditionalClassDetail = await prisma.additionalClassDetail.findUnique({
    where: {
      additionalClassDetailID: id,
    },
  }, "{studentNIM}");

  if (!dataStudent || !validateNIM(username)) {
    throw new Error("Invalid request header. Please check your session.");
  } else if (currentAdditionalClassDetail == null) {
    throw new Error("Additional class detail data could not be found. Please check your additional class detail.");
  }

  return await prisma.additionalClassDetail.delete({
    where: {
      additionalClassDetailID: id,
    },
    include: {
      additionalClass: true,
    },
  }, info);
}

export {deleteAdditionalClassDetail};
