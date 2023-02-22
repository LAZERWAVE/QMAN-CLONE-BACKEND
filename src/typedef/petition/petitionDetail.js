export const PetitionDetail = `
    type PetitionDetail {
        petitionDetailID: ID!
        petition: Petition!
        assistant: String!
        shift: Int!
        kpiPoint: Int!
        bgPoint: Int!
        location: String!
        approved: Boolean!
        createdAt: DateTime!
        updatedAt: DateTime!
    }
`;

export const CreatePetitionDetailInput = `
    input CreatePetitionDetailInput {
        petitionID: String!
        shift: Int!
        location: String!
        kpiPoint: Int!
        bgPoint: Int!
        approved: Boolean!
    }
`;

export const CreateAllPetitionDetailInput = `
    input CreateAllPetitionDetailInput {
        id: String!
        json: String!
    }
`;
