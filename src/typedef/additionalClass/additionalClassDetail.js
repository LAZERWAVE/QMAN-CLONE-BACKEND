export const AdditionalClassDetail = `
    type AdditionalClassDetail {
        additionalClassDetailID: String!
        additionalClassID: String!
        additionalClass: AdditionalClass!
        studentNIM: String!
        studentName: String!
        createdAt: DateTime!
        updatedAt: DateTime!
    }
`;

export const CreateAdditionalClassDetailInput = `
    input CreateAdditionalClassDetailInput {
        additionalClassID: String!
    }
`;
