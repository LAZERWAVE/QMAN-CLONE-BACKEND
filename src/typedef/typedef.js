import {Semester} from "./core/semester.js";
import {Assistant} from "./core/assistant.js";
import {Student} from "./core/student.js";
import {BatchPayload} from "./core/batchPayload.js";

import {
  LoginAuth,
  LoginInput,
} from "./login/loginAuth.js";
import {TypeAuth} from "./login/typeAuth.js";

import {
  AdditionalClass,
  SelectAdditionalClass,
  SelectAdditionalClassStudent,
  CreateAdditionalClassInput,
  UpdateAdditionalClassInput,
} from "./additionalClass/additionalClass.js";

import {
  AdditionalClassDetail,
  CreateAdditionalClassDetailInput,
} from "./additionalClass/additionalClassDetail.js";

import {
  Petition,
  SelectPetition,
  CreatePetitionInput,
  UpdatePetitionInput,
} from "./petition/petition.js";

import {
  PetitionDetail,
  CreatePetitionDetailInput,
  CreateAllPetitionDetailInput,
} from "./petition/petitionDetail.js";

import {
  SwitchTeaching,
  SelectSwitchTeaching,
  CreateSwitchTeachingInput,
  UpdateSwitchTeachingInput,
} from "./switchTeaching/switchTeaching.js";

import {
  Involvement,
  InvolvementInput,
} from "./involvement/involvement.js";
import {InvolvementAdditionalClass} from "./involvement/involvementAdditionalClass.js";
import {InvolvementPetition} from "./involvement/involvementPetition.js";
import {InvolvementSwitchTeaching} from "./involvement/involvementSwitchTeaching.js";

import {AssistantTransaction} from "./transaction/assistantTransaction.js";
import {StudentTransaction} from "./transaction/studentTransaction.js";
import {TransactionInput} from "./transaction/transactionInput.js";

import {CourseSubject} from "./core/courseSubject.js";

const DateTime = `
    scalar DateTime
`;

const Query = `
    type Query {
        getSemester: [Semester!]!

        loginAssistant(data: LoginInput!): LoginAuth
        loginStudent(data: LoginInput!): LoginAuth
    
        profileAssistant: Assistant
        profileStudent: Student
    
        transactionAssistant(data: TransactionInput!): [AssistantTransaction!]
        transactionStudent(data: TransactionInput!): [StudentTransaction!]
    
        additionalClass(data: SelectAdditionalClass): [AdditionalClass!]
        additionalClassStudent(data: SelectAdditionalClassStudent!): [AdditionalClass!]
    
        petitions(data: SelectPetition): [Petition!]
    
        switchTeaching(data: SelectSwitchTeaching): [SwitchTeaching!]
    
        involvement(data: InvolvementInput!): Involvement!
        involvementAll(data: InvolvementInput!): [Involvement!]
        
        getCourseSubject(data: TransactionInput!): [CourseSubject!]
    }
`;

const Mutation = `
    type Mutation {
        createAdditionalClass(data: CreateAdditionalClassInput!): AdditionalClass!
        updateAdditionalClass(id: ID!, data: UpdateAdditionalClassInput!): AdditionalClass!
        deleteAdditionalClass(id: ID!): AdditionalClass!
    
        createAdditionalClassDetail(data: CreateAdditionalClassDetailInput!): AdditionalClassDetail!
        deleteAdditionalClassDetail(id: ID!): AdditionalClassDetail!
    
        createPetition(data: CreatePetitionInput!): Petition!
        updatePetition(id: ID!, data: UpdatePetitionInput!): Petition!
        deletePetition(id: ID!): Petition!
    
        createPetitionDetail(data: CreatePetitionDetailInput!): PetitionDetail!
        createAllPetitionDetail(data: CreateAllPetitionDetailInput!): BatchPayload!
        deletePetitionDetail(id: ID!): PetitionDetail!
        deleteAllPetitionDetail(id: ID!): BatchPayload!
    
        createSwitchTeaching(data: CreateSwitchTeachingInput!): SwitchTeaching!
        updateSwitchTeaching(id: ID!, data: UpdateSwitchTeachingInput!): SwitchTeaching!
        deleteSwitchTeaching(id: ID!): SwitchTeaching!
    }
`;

export const typeDef = [
  DateTime,
  Query, Mutation,
  Semester, Assistant, Student, BatchPayload,
  LoginAuth, LoginInput, TypeAuth,
  AdditionalClass, SelectAdditionalClass, SelectAdditionalClassStudent,
  CreateAdditionalClassInput, UpdateAdditionalClassInput,
  AdditionalClassDetail, CreateAdditionalClassDetailInput,
  Petition, SelectPetition, CreatePetitionInput, UpdatePetitionInput,
  PetitionDetail, CreatePetitionDetailInput, CreateAllPetitionDetailInput,
  SwitchTeaching, SelectSwitchTeaching, CreateSwitchTeachingInput, UpdateSwitchTeachingInput,
  Involvement, InvolvementInput, InvolvementAdditionalClass, InvolvementPetition, InvolvementSwitchTeaching,
  AssistantTransaction, StudentTransaction, TransactionInput,
  CourseSubject,
];
