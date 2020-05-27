import { Component, OnInit } from '@angular/core';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  faSignOut = faSignOutAlt;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onClick() {
    console.log('sign out clicked');
  }

}
