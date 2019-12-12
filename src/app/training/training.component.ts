import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromTraining from './training.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  ongoingTraining$: Observable<boolean>;

  constructor(private store: Store<fromTraining.State>) { }

  ngOnInit() {
    // this.trainingService.exerciseChanged.subscribe(exercise=>{
    //   if(exercise) {
    //     this.ongoingTraining=true;
    //   } else {
    //     this.ongoingTraining=false;
    //   }
    // })
    this.ongoingTraining$=this.store.select(fromTraining.getIsTraining);
  }
}
