export const AdditionalClass = `
    type AdditionalClass {
        additionalClassID: String!                       # Ex: ckjnsf6ne00040713rvjusjsm
        semesterID: String!                              # Ex: 6efe88ad-e67f-49cb-afc4-58c2418fa1b4
        courseSubject: String!                           # Ex: COMP6047-Algorithm and Programming
        assistantInitial1: String!                       # Ex: RX19-2
        assistantInitial2: String                        # Ex: JE19-2
        additionalClassDetails: [AdditionalClassDetail!]
        date: DateTime!                                  # Ex: 2021-01-17 06:22:41.196
        shift: Int!                                      # Ex: 1 / 2 / 3 / 4 / 5 / 6
        class: String!                                   # Ex: BA01
        location: String!                                # Ex: 724 / https://binus.zoom.us/j/9555...
        done: Boolean!                                   # Ex: true / false
        totalStudent: Int!                               # Ex: 12
        valid: Boolean!                                  # Ex: true / false
        createdAt: DateTime!                             # Ex: 2021-01-17 06:22:41.196
        updatedAt: DateTime!                             # Ex: 2021-01-17 06:22:41.196
    }
`;

export const SelectAdditionalClass = `
    input SelectAdditionalClass {
        additionalClassID: ID
        semesterID: String
        courseSubject: String
        assistantInitial: String
        class: String
        date: DateTime
        shift: Int
        location: String
        done: Boolean
    }
`;

export const SelectAdditionalClassStudent = `
    input SelectAdditionalClassStudent {
        semesterID: String
        done: Boolean
        onlyStudentJoin: Boolean
    }
`;

export const CreateAdditionalClassInput = `
    input CreateAdditionalClassInput {
        semesterID: String!
        courseSubject: String!
        assistantInitial1: String
        assistantInitial2: String
        date: DateTime!
        shift: Int!
        class: String!
        location: String!
        ignore: Boolean
    }
`;

export const UpdateAdditionalClassInput = `
    input UpdateAdditionalClassInput {
        date: DateTime
        shift: Int
        location: String
        done: Boolean
    }
`;
