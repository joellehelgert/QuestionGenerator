import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import {Actions, ofActionDispatched} from "@ngxs/store";
import {Logout} from "../../../states/AuthState";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private actions: Actions
  ) {
  }

  ngOnInit(): void {
    this.actions.pipe(ofActionDispatched(Logout)).subscribe(() => {
    });
  }



}
