import {getSemester} from "./query/semester.js";

import {loginAssistant} from "./query/login/loginAssistant.js";
import {loginStudent} from "./query/login/loginStudent.js";

import {profileAssistant} from "./query/profile/profileAssistant.js";
import {profileStudent} from "./query/profile/profileStudent.js";

import {transactionAssistant} from "./query/transaction/transactionAssistant.js";
import {transactionStudent} from "./query/transaction/transactionStudent.js";

import {additionalClass} from "./query/additionalClass.js";
import {additionalClassStudent} from "./query/additionalClassStudent.js";

import {petitions} from "./query/petition.js";
import {switchTeaching} from "./query/switchTeaching.js";

import {involvement} from "./query/involvement/involvement.js";
import {involvementAll} from "./query/involvement/involvementAll.js";

import {getCourseSubject} from "./query/courseSubject.js";

const Query = {

  getSemester,

  loginAssistant,
  loginStudent,

  profileAssistant,
  profileStudent,

  transactionAssistant,
  transactionStudent,

  additionalClass,
  additionalClassStudent,

  petitions,

  switchTeaching,

  involvement,
  involvementAll,

  getCourseSubject,
};

export {Query as default};
