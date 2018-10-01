import { ITestCase } from 'app/shared/model//test-case.model';
import { IResolution } from 'app/shared/model//resolution.model';

export interface ICaseResult {
  id?: number;
  passed?: boolean;
  testCase?: ITestCase;
  resolution?: IResolution;
}

export const defaultValue: Readonly<ICaseResult> = {
  passed: false
};
