import { IExercise } from 'app/shared/model//exercise.model';

export interface IGuide {
  id?: number;
  name?: string;
  exercises?: IExercise[];
}

export const defaultValue: Readonly<IGuide> = {};
