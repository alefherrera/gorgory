import { ITestCase } from 'app/shared/model//test-case.model';

export interface IArgument {
  id?: number;
  value?: string;
  testCase?: ITestCase;
}

export const defaultValue: Readonly<IArgument> = {};
