import { Component, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import { NgForm } from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/auth'
import {Router} from '@angular/router'
import { AngularFirestoreModule } from '@angular/fire/firestore';
import {SnackbarService} from '../../service/snackbar.service';
import {AuthServiceService} from '../../service/auth-service.service'
import { error } from 'util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide=true;
  loading=false;

  constructor(private fireAuth : AngularFireAuth , 
    private snack : SnackbarService,
    private authService : AuthServiceService,
    private route: Router) { }

  ngOnInit() {
    console.log('sadsa')
    this.authService.initLogout();
  }

  onSubmit(form:NgForm){
    console.log(form)

    if(form.valid)
    {
      console.log('ssds')
      this.loading=true;
      
       this.fireAuth.auth.signInWithEmailAndPassword(form.value.username,form.value.password)
       .then((data)=>{

        console.log('sds');
        console.log(data);
        this.loading=false;
       
        this.route.navigate(['/main'])

       }).catch((error)=>{
      
        this.loading=false
       this.snack.snackbarSevice(error.message,'Login again',2000);

       })
    }

  else{

    this.snack.snackbarSevice('Fill the required details','Dismiss',5000);
  }
   
  }
 

}

