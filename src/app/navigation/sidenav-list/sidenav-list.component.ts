import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store'

import { AuthService } from 'src/app/auth/auth.service';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() closeSidenav=new EventEmitter();
  isAuth$: Observable<boolean>;

  constructor(private authService: AuthService, private store: Store<fromRoot.State>) { }

  ngOnInit() {
    // this.authSubscription=this.authService.authChange.subscribe(authStatus=>{
    //   this.isAuth=authStatus;
    // })
    this.isAuth$=this.store.select(fromRoot.getIsAuth);
  }

  onClose() {
    this.closeSidenav.emit();
  }

  onLogout() {
    this.onClose();
    this.authService.logout();
  }
}
