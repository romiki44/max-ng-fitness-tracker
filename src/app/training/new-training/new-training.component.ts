import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import * as fromRoot from '../../app.reducer';
import * as fromTraining from '../training.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exercises$: Observable<Exercise[]>;
  isLoading$: Observable<boolean>;

  constructor(
    private trainingService: TrainingService, 
    private store: Store<fromTraining.State>) { }

  ngOnInit() {
    // this.loadingSubscription=this.uiService.loadingStateChanged.subscribe(isLoading=>{
    //   this.isLoading=isLoading;
    // });
    this.isLoading$=this.store.select(fromRoot.getIsLoading);
    // this.exerciseSubscription=this.trainingService.exercisesChanged.subscribe(exercises=>{
    //   this.exercises=exercises;
    // });
    this.exercises$=this.store.select(fromTraining.getAvailableExercises);
    this.fetchExcercises();
  }

  fetchExcercises() {
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
