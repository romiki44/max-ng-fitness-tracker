import { Action } from '@ngrx/store';
import { Exercise } from './exercise.model';

export const SET_AVAILABLE_TRANING='[Training] Set Available Training';
export const SET_FINISHED_TRAINING='[Traning] Set Finished Training';
export const START_ACTIVE_TRAINING='[Traning] Start Active Training';
export const STOP_ACTIVE_TRAINING='[Traning] Stop Active Training';

export class SetAvailableTraining implements Action {
  readonly type=SET_AVAILABLE_TRANING;

  constructor(public payload: Exercise[]) {}
}

export class SetFinishedTraning implements Action {
  readonly type=SET_FINISHED_TRAINING;

  constructor(public payload: Exercise[]) {}
}

export class StartActiveTraining implements Action {
  readonly type=START_ACTIVE_TRAINING;

  constructor(public payload: String) {}
}

export class StopActiveTraining implements Action {
  readonly type=STOP_ACTIVE_TRAINING;
}

export type TrainingActions = 
  SetAvailableTraining | 
  SetFinishedTraning |
  StartActiveTraining |
  StopActiveTraining;


