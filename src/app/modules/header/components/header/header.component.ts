import { Component, OnInit } from '@angular/core';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {AuthService} from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  faSignOut = faSignOutAlt;

  constructor(
    private router: Router,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {}

  onClick() {
    this.router.navigate(['/logout']);
  }

}
