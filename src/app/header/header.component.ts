import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { User } from 'firebase';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
   
  constructor(private afAuth :AngularFireAuth) { }
 
  ngOnInit() {
  }

  logout() {
    this.afAuth.auth.signOut();
  }

}
