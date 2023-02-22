import {createAdditionalClass} from "./mutation/additionalClass/createAdditionalClass.js";
import {updateAdditionalClass} from "./mutation/additionalClass/updateAdditionalClass.js";
import {deleteAdditionalClass} from "./mutation/additionalClass/deleteAdditionalClass.js";

import {createAdditionalClassDetail} from "./mutation/additionalClassDetail/createAdditionalClassDetail.js";
import {deleteAdditionalClassDetail} from "./mutation/additionalClassDetail/deleteAdditionalClassDetail.js";

import {createPetition} from "./mutation/petition/createPetition.js";
import {updatePetition} from "./mutation/petition/updatePetition.js";
import {deletePetition} from "./mutation/petition/deletePetition.js";

import {createPetitionDetail} from "./mutation/petitionDetail/createPetitionDetail.js";
import {createAllPetitionDetail} from "./mutation/petitionDetail/createAllPetitionDetail.js";
import {deletePetitionDetail} from "./mutation/petitionDetail/deletePetitionDetail.js";
import {deleteAllPetitionDetail} from "./mutation/petitionDetail/deleteAllPetitionDetail.js";

import {createSwitchTeaching} from "./mutation/switchTeaching/createSwitchTeaching.js";
import {updateSwitchTeaching} from "./mutation/switchTeaching/updateSwitchTeaching.js";
import {deleteSwitchTeaching} from "./mutation/switchTeaching/deleteSwitchTeaching.js";

const Mutation = {
  createAdditionalClass,
  updateAdditionalClass,
  deleteAdditionalClass,

  createAdditionalClassDetail,
  deleteAdditionalClassDetail,

  createPetition,
  updatePetition,
  deletePetition,

  createPetitionDetail,
  createAllPetitionDetail,
  deletePetitionDetail,
  deleteAllPetitionDetail,

  createSwitchTeaching,
  updateSwitchTeaching,
  deleteSwitchTeaching,
};

export {Mutation as default};
