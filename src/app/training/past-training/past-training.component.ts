import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Store } from '@ngrx/store';

import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import * as fromTraining from '../training.reducer';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit {
  displayedColumns=['date', 'name', 'duration', 'calories', 'state'];
  dataSource=new MatTableDataSource<Exercise>();

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private trainingService: TrainingService, private store: Store<fromTraining.State>) { }

  ngOnInit() {
    this.store.select(fromTraining.getFinishedExercises)
      .subscribe((exercises: Exercise[])=>{
        this.dataSource.data=exercises;
        this.dataSource.sort=this.sort;
        this.dataSource.paginator=this.paginator;
      });
    this.trainingService.fetchCompletedOrCanceledExercises();
  }

  doFilter(filterValue: string) {
    this.dataSource.filter=filterValue.trim().toLowerCase();
  }
}
