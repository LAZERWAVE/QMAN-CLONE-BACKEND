import {getStudentCount} from "../../../utils/messier.js";

async function getAdditionalClass(username, data, prisma) {
  const opArgsAdditionalClass = {
    where: {
      AND: [
        {semesterID: data.semesterID},
        {
          OR: [
            {assistantInitial1: username},
            {assistantInitial2: username},
          ],
        },
        {done: true},
      ],
    },
    include: {
      additionalClassDetails: true,
    },
  };
  const opInfoAdditionalClass = "{courseSubject, class, date, shift, additionalClassDetails{additionalClassDetailID}}";
  let assistantAdditionalClass = await prisma.additionalClass.findMany(opArgsAdditionalClass, opInfoAdditionalClass);

  for (const additionalClass of assistantAdditionalClass) {
    const encodeCourseSubject = encodeURIComponent(additionalClass.courseSubject.trim());

    try {
      const totalStudent = await getStudentCount(data.semesterID, encodeCourseSubject, additionalClass.class);
      const totalParticipation = additionalClass.additionalClassDetails.length;
      additionalClass.valid = totalStudent / 3 <= totalParticipation;
    } catch (e) {
      throw new Error("Failed fetch total student for each class.");
    }
  }

  assistantAdditionalClass = assistantAdditionalClass.filter((item) => {
    return item.valid;
  });

  return {
    data: assistantAdditionalClass,
    total: assistantAdditionalClass.length,
    description: "Total Additional Class: " + assistantAdditionalClass.length + "\n",
  };
}

async function getSwitchTeaching(username, data, prisma) {
  const opArgsSwitchTeaching = {
    where: {
      AND: [
        {semesterID: data.semesterID},
        {
          OR: [
            {assistantTo: username},
          ],
        },
        {status: {not: "THIRD PERSON"}},
        {approved: true},
      ],
    },
  };
  const assistantSwitchTeaching = await prisma.switchTeaching.findMany(opArgsSwitchTeaching, "{assistantFrom}");

  const assistantSwitchTeachingRecap = [];
  for (const switchTeaching of assistantSwitchTeaching) {
    if (assistantSwitchTeachingRecap.map((e) => {
      return e.assistantFrom;
    }).indexOf(switchTeaching.assistantFrom) === -1) {
      const opArgsSwitchTeaching2nd = {
        where: {
          AND: [
            {semesterID: data.semesterID},
            {
              AND: [
                {assistantFrom: username},
                {assistantTo: switchTeaching.assistantFrom},
              ],
            },
            {status: {not: "THIRD PERSON"}},
            {approved: true},
          ],
        },
      };
      const assistantSwitchTeaching2nd = await prisma.switchTeaching.findMany(
          opArgsSwitchTeaching2nd, "{switchTeachingID}");
      assistantSwitchTeachingRecap.push({
        assistantFrom: switchTeaching.assistantFrom,
        totalForMe: 1,
        totalForYou: assistantSwitchTeaching2nd.length,
      });
    } else {
      assistantSwitchTeachingRecap.forEach((assistantSwitchTeachingR) => {
        if (assistantSwitchTeachingR.assistantFrom === switchTeaching.assistantFrom) {
          assistantSwitchTeachingR.totalForMe += 1;
        }
      });
    }
  }

  let totalSwitchTeaching = 0;
  assistantSwitchTeachingRecap.forEach((assistantSwitchTeachingR) => {
    if (assistantSwitchTeachingR.totalForMe > assistantSwitchTeachingR.totalForYou) {
      totalSwitchTeaching += assistantSwitchTeachingR.totalForMe - assistantSwitchTeachingR.totalForYou;
    }
  });

  return {
    data: assistantSwitchTeachingRecap,
    total: totalSwitchTeaching,
    description: "Total Switch Teaching: " + totalSwitchTeaching + "\n",
  };
}

async function getPetition(username, data, prisma) {
  const opArgsPetition = {
    where: {
      AND: [
        {semesterID: data.semesterID},
        {
          petitionDetails: {
            some: {
              AND: [
                {assistant: username},
                {approved: true},
              ],
            },
          },
        },
      ],
    },
    include: {
      petitionDetails: true,
    },
  };
  const opInfoPetition = "{petitionTitle, mode, date, petitionDetails {assistant, kpiPoint, bgPoint}}";
  const assistantPetition = await prisma.petition.findMany(opArgsPetition, opInfoPetition);

  let totalKPIPetition = 0;
  let descriptionKPIPetition = "Petition: \r\n";
  let totalBGOtherPetition = 0;
  let descriptionBGOtherPetition = "Petition: \r\n";
  let totalBGCompetitionPetition = 0;
  let descriptionBGCompetitionPetition = "Petition: \r\n";
  let totalBGTrainerPetition = 0;
  let descriptionBGTrainerPetition = "Petition: \r\n";

  assistantPetition.forEach((petition) => {
    const petitionDetail = petition.petitionDetails;
    petitionDetail.forEach((petitionD) => {
      if (petitionD.assistant === username) {
        totalKPIPetition += petitionD.kpiPoint;
        descriptionKPIPetition += "- " + petition.petitionTitle + " (" + petitionD.kpiPoint + ")\r\n";

        if (petition.mode === "OTHER") {
          totalBGOtherPetition += petitionD.bgPoint;
          descriptionBGOtherPetition += "- " + petition.petitionTitle + " (" + petitionD.bgPoint + ")\r\n";
        } else if (petition.mode === "COMPETITION") {
          if (totalBGCompetitionPetition < petitionD.bgPoint) {
            totalBGCompetitionPetition = petitionD.bgPoint;
          }
          descriptionBGCompetitionPetition += "- " + petition.petitionTitle + " (" + petitionD.bgPoint + ")\r\n";
        } else if (petition.mode === "TRAINER") {
          if (totalBGTrainerPetition < petitionD.bgPoint) {
            totalBGTrainerPetition = petitionD.bgPoint;
          }
          descriptionBGTrainerPetition += "- " + petition.petitionTitle + " (" + petitionD.bgPoint + ")\r\n";
        }
      }
    });
  });

  if (descriptionKPIPetition === "Petition: \r\n") {
    descriptionKPIPetition += "- Empty\r\n";
  }
  if (descriptionBGOtherPetition === "Petition: \r\n") {
    descriptionBGOtherPetition += "- Empty\r\n";
  }
  if (descriptionBGCompetitionPetition === "Petition: \r\n") {
    descriptionBGCompetitionPetition += "- Empty\r\n";
  }
  if (descriptionBGTrainerPetition === "Petition: \r\n") {
    descriptionBGTrainerPetition += "- Empty\r\n";
  }

  descriptionKPIPetition += "Total Petition: " + totalKPIPetition + "\r\n";
  descriptionBGOtherPetition += "Total Petition: " + totalBGOtherPetition + "\r\n";
  descriptionBGCompetitionPetition += "Total Petition: " + totalBGCompetitionPetition + "\r\n";
  descriptionBGTrainerPetition += "Total Petition: " + totalBGTrainerPetition + "\r\n";

  return {
    data: assistantPetition,

    totalKPIPetition: totalKPIPetition,
    descriptionKPIPetition: descriptionKPIPetition,

    totalBGOtherPetition: totalBGOtherPetition,
    descriptionBGOtherPetition: descriptionBGOtherPetition,

    totalBGCompetitionPetition: totalBGCompetitionPetition,
    descriptionBGCompetitionPetition: descriptionBGCompetitionPetition,

    totalBGTrainerPetition: totalBGTrainerPetition,
    descriptionBGTrainerPetition: descriptionBGTrainerPetition,
  };
}

async function getKPIGrade(totalKPI) {
  return (totalKPI <= 0) ? 1 :
        (totalKPI === 1) ? 2 :
            (totalKPI === 2) ? 3 :
                (totalKPI === 3 || totalKPI === 4) ? 4 :
                    (totalKPI === 5 || totalKPI === 6) ? 5 : 6;
}

async function getBGOtherGrade(totalBGOther) {
  return (totalBGOther <= 0) ? 0 :
        (totalBGOther === 1 || totalBGOther === 2) ? 1 :
            (totalBGOther === 3 || totalBGOther === 4) ? 2 :
                (totalBGOther === 5 || totalBGOther === 6) ? 3 : 4;
}

export {getAdditionalClass, getSwitchTeaching, getPetition, getKPIGrade, getBGOtherGrade};
