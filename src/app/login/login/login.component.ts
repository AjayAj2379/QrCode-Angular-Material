import { Component, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import { NgForm } from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/auth'
import {Router} from '@angular/router'
import { AngularFirestoreModule } from '@angular/fire/firestore';
import {SnackbarService} from '../../service/snackbar.service'
import { error } from 'util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide=true;

  constructor(private fireAuth : AngularFireAuth , 
    private snack : SnackbarService,
    private route:Router) { }

  ngOnInit() {
  }

  onSubmit(form:NgForm){

    if(form.valid)
    {
       this.fireAuth.auth.signInWithEmailAndPassword(form.value.username,form.value.password)
       .then((data)=>{

        this.route.navigate(['/home'])

       }).catch((error)=>{

        this.snack.snackbarSevice(error.message,'Login again');

       })
    }
  }

}
