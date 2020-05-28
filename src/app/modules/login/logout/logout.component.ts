import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../../../services/auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  clickEventsubscription: Subscription;
  constructor(
    private authService: AuthService,
    private router: Router,

  ) {
    this.clickEventsubscription = this.authService.getClickEvent().subscribe(() => {
      this.authService.logout().then(
        (success) => {
          this.router.navigate(['/login']);
        }).catch((error) => {
        window.alert(error.message);
      });
    });
  }

  ngOnInit(): void {
    this.router.navigate(['/login']);
  }

}
