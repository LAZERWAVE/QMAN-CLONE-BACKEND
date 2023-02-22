import {getToken} from "../../../utils/tokenHandler.js";
import {
    validateInitial,
    validateMinMaxInteger,
    validateRoom,
    validateURL
} from "../../../utils/validationHandler.js";

async function createPetitionDetail(parent, {data}, {prisma, request}, info) {

    const dataAssistant = await getToken(request);
    const username = dataAssistant.data.username;

    if (!dataAssistant || !validateInitial(username))
        throw new Error('Invalid request header. Please check your session.');

    const currentPetitionDetail = await prisma.petitionDetail.findMany({
        where: {
            AND: [
                {assistant: username},
                {
                    petition: {
                        petitionID: data.petitionID
                    }
                }
            ]
        }
    }, '{assistant}');

    if (currentPetitionDetail.length > 0)
        throw new Error('You have already join this petition.');
    else if (!validateMinMaxInteger(data.shift, 1, 6))
        throw new Error('Invalid shift range. The range should be between 1 and 6 (inclusively).');
    else if (!(validateURL(data.location) || validateRoom(data.location)))
        throw new Error('Invalid location format. The format should be a zoom link or room (\'000\') format.');
    else if (!validateMinMaxInteger(data.kpiPoint, 1, 10))
        throw new Error('Invalid KPI point range. The range should be between 1 and 10 (inclusively).');
    else if (!validateMinMaxInteger(data.bgPoint, 1, 10))
        throw new Error('Invalid BG point range. The range should be between 1 and 10 (inclusively).');

    return await prisma.petitionDetail.create({
        data: {
            petition: {
                connect: {
                    petitionID: data.petitionID
                }
            },
            assistant: username,
            shift: data.shift,
            location: data.location,
            kpiPoint: data.kpiPoint,
            bgPoint: data.bgPoint,
            approved: data.approved
        },
        include: {
            petition: true
        }
    }, info);
}

export {createPetitionDetail}
