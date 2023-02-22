export const SwitchTeaching = `
    type SwitchTeaching {
        switchTeachingID: ID!
        semesterID: String!
        assistantFrom: String!
        assistantTo: String!
        courseSubject: String!
        class: String!
        date: DateTime!
        shift: Int!
        session: Int!
        approved: Boolean!
        status: String!
        createdAt: DateTime!
        updatedAt: DateTime!
    }
`;

export const SelectSwitchTeaching = `
    input SelectSwitchTeaching {
        semesterID: String
        assistant: String
        assistantFrom: String
        assistantTo: String
        courseSubject: String
        class: String
        date: DateTime
        shift: Int
        session: Int
        approved: Boolean
        status: String
    }
`;

export const CreateSwitchTeachingInput = `
    input CreateSwitchTeachingInput {
        semesterID: String!
        assistantFrom: String
        assistantTo: String!
        courseSubject: String!
        class: String!
        date: DateTime!
        ignore: Boolean
    }
`;

export const UpdateSwitchTeachingInput = `
    input UpdateSwitchTeachingInput {
        assistantTo: String
        date: DateTime
        approved: Boolean
        status: String
    }
`;

