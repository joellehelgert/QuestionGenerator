import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {AuthService} from "../../../services/auth/auth.service";
import {switchMap} from "rxjs/operators";
import {faSignOutAlt} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  faSignOut = faSignOutAlt;
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
