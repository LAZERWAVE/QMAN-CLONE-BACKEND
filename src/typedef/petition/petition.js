export const Petition = `
    type Petition {
        petitionID: ID!
        semesterID: String!
        petitionTitle: String!
        petitionDescription: String
        petitionCreator: String!
        petitionMaxSlot: Int!
        date: DateTime!
        petitionDetails: [PetitionDetail!]
        ongoing: Boolean!
        mode: String!
        createdAt: DateTime!
        updatedAt: DateTime!
    }
`;

export const SelectPetition = `
    input SelectPetition {
        petitionID: ID
        semesterID: String
        petitionTitle: String
        petitionCreator: String
        date: DateTime
        ongoing: Boolean
        mode: String
    }
`;

export const CreatePetitionInput = `
    input CreatePetitionInput {
        semesterID: String!
        petitionTitle: String!
        petitionDescription: String
        petitionMaxSlot: Int!
        date: DateTime!
        mode: String!
    }
`;

export const UpdatePetitionInput = `
    input UpdatePetitionInput {
        petitionTitle: String
        petitionDescription: String
        petitionMaxSlot: Int
        date: DateTime
        ongoing: Boolean
        mode: String
    }
`;
