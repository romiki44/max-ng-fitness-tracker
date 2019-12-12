import { Action, createFeatureSelector, createSelector } from '@ngrx/store';

import { 
  TrainingActions, 
  SET_AVAILABLE_TRANING, 
  SET_FINISHED_TRAINING,
  START_ACTIVE_TRAINING,
  STOP_ACTIVE_TRAINING 
} from './training.actions';
import { Exercise } from './exercise.model';
import * as fromRoot from '../app.reducer';

export interface TrainingState {
  availableExercises: Exercise[];
  finshedExercises: Exercise[];
  activeTraining: Exercise;
}

export interface State extends fromRoot.State {
  training: TrainingState;
}

const initialState: TrainingState={
  availableExercises: [],
  finshedExercises: [],
  activeTraining: null
}

export function trainingReducer(state=initialState, action: TrainingActions) {
  switch(action.type) {
    case SET_AVAILABLE_TRANING:
      return {
        ...state,
        availableExercises: action.payload
      };
    case SET_FINISHED_TRAINING:
      return {
        ...state,
        finshedExercises: action.payload
      };
    case START_ACTIVE_TRAINING:
      return {
        ...state,
        activeTraining: {...state.availableExercises.find(ex=>ex.id== action.payload)}
      };
    case STOP_ACTIVE_TRAINING:
      return {
        ...state,
        activeTraining: null
      }
    default:
      return state;
  }
}

export const getTrainingState=createFeatureSelector<TrainingState>('training');

export const getAvailableExercises=createSelector(getTrainingState, (state: TrainingState)=> state.availableExercises);
export const getFinishedExercises=createSelector(getTrainingState, (state: TrainingState)=> state.finshedExercises);
export const getActiveTraining=createSelector(getTrainingState, (state: TrainingState) => state.activeTraining);
export const getIsTraining=createSelector(getTrainingState, (state: TrainingState) => state.activeTraining != null);

