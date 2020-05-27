import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {AuthService} from "../../../services/auth/auth.service";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.authService.logout().then(
      (success) => {
        this.router.navigate(['/login']);
      }).catch((error) => {
      window.alert(error.message);
    });
  }
}
