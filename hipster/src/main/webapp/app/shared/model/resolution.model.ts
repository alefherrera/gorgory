import { ICaseResult } from 'app/shared/model//case-result.model';
import { IUser } from './user.model';
import { IExercise } from 'app/shared/model//exercise.model';

export interface IResolution {
  id?: number;
  path?: string;
  caseResults?: ICaseResult[];
  student?: IUser;
  exercise?: IExercise;
}

export const defaultValue: Readonly<IResolution> = {};
