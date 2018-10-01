import { IArgument } from 'app/shared/model//argument.model';
import { IExercise } from 'app/shared/model//exercise.model';
import { ICaseResult } from 'app/shared/model//case-result.model';

export interface ITestCase {
  id?: number;
  expected?: string;
  arguments?: IArgument[];
  exercise?: IExercise;
  caseResults?: ICaseResult[];
}

export const defaultValue: Readonly<ITestCase> = {};
