import {getToken} from "../../utils/tokenHandler.js";
import {getStudentCount} from "../../utils/messier.js";
import {validateInitial, validateNIM} from "../../utils/validationHandler.js";

async function additionalClass(parent, {data}, {prisma, request}, info) {
  const dataRequest = await getToken(request);
  const username = dataRequest.data.username;

  if (!dataRequest || !(validateInitial(username) || validateNIM(username))) {
    throw new Error("Invalid request header. Please check your session.");
  }

  const opArgs = {include: {additionalClassDetails: true}};
  if (data) {
    opArgs.where = {
      AND: [
        {additionalClassID: data.additionalClassID},
        {semesterID: data.semesterID},
        {class: data.class},
        {courseSubject: data.courseSubject},
        {
          OR: [
            {assistantInitial1: data.assistantInitial},
            {assistantInitial2: data.assistantInitial},
          ],
        },
        {date: data.date},
        {shift: data.shift},
        {location: data.location},
        {done: data.done},
      ],
    };
    opArgs.orderBy = data.orderBy;
  }

  const assistantAdditionalClass = await prisma.additionalClass.findMany(opArgs, info);

  for (const additionalClassData of assistantAdditionalClass) {
    additionalClassData.totalStudent = 0;
    additionalClassData.valid = false;

    if (data && data.semesterID && additionalClassData.courseSubject && additionalClassData.class) {
      try {
        const totalStudent = await getStudentCount(data.semesterID, additionalClassData.courseSubject,
            additionalClassData.class);
        if (additionalClassData.totalStudent !== -1) {
          additionalClassData.totalStudent = totalStudent;
          if (additionalClassData.additionalClassDetails) {
            const totalParticipation = additionalClassData.additionalClassDetails.length;
            if (additionalClassData.totalStudent / 3 <= totalParticipation) {
              additionalClassData.valid = true;
            }
          }
        }
      } catch (e) {
        throw new Error("Failed to fetch total student for each classes.");
      }
    }
  }

  return assistantAdditionalClass;
}

export {additionalClass};
