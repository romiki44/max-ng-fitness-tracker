import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, OnDestroy {
  displayedColumns=['date', 'name', 'duration', 'calories', 'state'];
  dataSource=new MatTableDataSource<Exercise>();
  private exersiseChangedSubsription: Subscription;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.exersiseChangedSubsription=this.trainingService.finishedExercisesChanged
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

  ngOnDestroy() {
    this.exersiseChangedSubsription.unsubscribe();
  }

}
