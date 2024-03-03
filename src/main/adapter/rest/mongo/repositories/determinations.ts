import { UserDeterminationCalculationRequest } from '../../../../domain/entities/core.js';
import { Status } from '../../../../domain/entities/Status.js';


import determinationModel, { Determination } from '../models/determination.model.js';

export const createDetermination = async (request: UserDeterminationCalculationRequest) => {
  const determination: Determination = { ...request, status: Status.Created, statusMessage: Status[Status.Created] };
  return await determinationModel.create([determination]);
}

export const createFailedDetermination = async (request: UserDeterminationCalculationRequest) => {
  const determination: Determination = { ...request, status: Status.Error, statusMessage: Status[Status.Error] };
  return await determinationModel.create([determination]);
}

export const createSucceedDetermination = async (request: UserDeterminationCalculationRequest) => {
  const determination: Determination = { ...request, status: Status.Succeed, statusMessage: Status[Status.Succeed] };
  return await determinationModel.create([determination]);
}