import { ITestCase } from 'app/shared/model//test-case.model';
import { IGuide } from 'app/shared/model//guide.model';
import { IResolution } from 'app/shared/model//resolution.model';

export const enum Language {
  PYTHON = 'PYTHON',
  JAVA = 'JAVA'
}

export interface IExercise {
  id?: number;
  language?: Language;
  testCases?: ITestCase[];
  guide?: IGuide;
  resolutions?: IResolution[];
}

export const defaultValue: Readonly<IExercise> = {};
