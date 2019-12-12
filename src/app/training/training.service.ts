import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Exercise } from './exercise.model';
import { UIService } from '../shared/ui.service';
import * as UI from '../shared/ui.actions';
import * as fromTraining from './training.reducer';
import * as Training from './training.actions';

@Injectable()
export class TrainingService {
  private fireSubscriptions: Subscription[]=[];

  constructor(
    private db: AngularFirestore, 
    private uiService: UIService,
    private store: Store<fromTraining.State>
  ) {}

  fetchAvailableExercises() {
    this.store.dispatch(new UI.StartLoading());
    this.fireSubscriptions.push(this.db.collection('availableExercises')
      .snapshotChanges()
      .pipe(map(docArray=>{
        //throw(new Error());
        return docArray.map(doc=>{
          return {
            id: doc.payload.doc.id,
            name: doc.payload.doc.data()['name'],
            duration: doc.payload.doc.data()['duration'],
            calories: doc.payload.doc.data()['calories']
          };
        });
      }))
      .subscribe((exercises: Exercise[])=>{
        // this.availableExercises=exercises;
        // this.exercisesChanged.next([...this.availableExercises]);
        this.store.dispatch(new Training.SetAvailableTraining(exercises));
        this.store.dispatch(new UI.StopLoading());
      }, error=>{
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackbar('Fetching excercises failed', null, 3000);
      })
    );
  }

  startExercise(selectedId: string) {
    this.db.doc('availableExercises/'+selectedId).update({lastSelected: new Date()}) //len priklad updatu
    //this.runningExercise=this.availableExercises.find(ex=>ex.id==selectedId);
    //this.exerciseChanged.next({...this.runningExercise});
    this.store.dispatch(new Training.StartActiveTraining(selectedId));
  }

  completeExercise() {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex=>{
      this.addDataToDatabase({
        ...ex, 
        date: new Date(), 
        state: 'completed'
      });
    });
    // this.runningExercise=null;
    // this.exerciseChanged.next(null);
    this.store.dispatch(new Training.StopActiveTraining());
  }

  cancelExercise(progress: number) {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex=>{
      this.addDataToDatabase({
        ...ex, 
        duration: ex.duration * (progress/100),
        calories: ex.calories * (progress/100),
        date: new Date(), 
        state: 'cancelled'
      });
    });

    // this.addDataToDatabase({
    //   ...this.runningExercise, 
    //   duration: this.runningExercise.duration * (progress/100),
    //   calories: this.runningExercise.calories * (progress/100),
    //   date: new Date(), 
    //   state: 'cancelled'
    // });
    // this.runningExercise=null;
    // this.exerciseChanged.next(null);
    this.store.dispatch(new Training.StopActiveTraining());
  }

  fetchCompletedOrCanceledExercises() {
    this.fireSubscriptions.push(this.db.collection('finishedExercises')
      .valueChanges()
      .subscribe((exercises: Exercise[])=>{
        //this.finishedExercisesChanged.next(exercises);
        this.store.dispatch(new Training.SetFinishedTraning(exercises));
    }));
  }

  cancelSubscriptions() {
    this.fireSubscriptions.forEach(sub=>sub.unsubscribe());
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }
}

