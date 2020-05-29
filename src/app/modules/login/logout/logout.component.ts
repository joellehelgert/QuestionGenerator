import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../../../services/auth/auth.service";
import { Subscription } from "rxjs";
import {switchMap} from 'rxjs/operators';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {

  }

  ngOnInit(): void {
    this.authService.logout().then(
      (success) => {
        this.router.navigate(['/login']);
      }).catch((error) => {
      window.alert(error.message);
    });
  }



}
