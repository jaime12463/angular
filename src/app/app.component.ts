import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { auth, User } from 'firebase/app';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mastergym';
  user :User; 
  loading : boolean=true ; 

  constructor(public afAuth :AngularFireAuth){
   // console.log(afAuth.user( usu))
   afAuth.user.subscribe((user) => {
    
      this.user= user; 
      this.loading=false;
    
   })
  }
 
}
