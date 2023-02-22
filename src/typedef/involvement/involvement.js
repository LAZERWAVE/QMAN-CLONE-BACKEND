export const Involvement =`
    type Involvement {
        initial: String!
    
        kpiGrade: Int!
        kpiTotal: Int!
        kpiDescription: String!
    
        bgOtherGrade: Int!
        bgOtherTotal: Int!
        bgOtherDescription: String!
    
        bgCompetitionGrade: Int!
        bgCompetitionDescription: String!
    
        bgTrainerGrade: Int!
        bgTrainerDescription: String!
    
        petition: [InvolvementPetition!]
        additionalClass: [InvolvementAdditionalClass!]
        switchTeaching: [InvolvementSwitchTeaching!]
    }
`;

export const InvolvementInput = `
    input InvolvementInput {
        semesterID: String!
    }
`;

