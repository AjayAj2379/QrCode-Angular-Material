import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth'
import {SnackbarService} from '../service/snackbar.service'
import {DialogService} from '../service/dialog.service'
import {Router} from '@angular/router'
import {QrcodeDialogComponent} from '../dialog/qrcode-dialog/qrcode-dialog.component'

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private auth : AngularFireAuth,
    private snack : SnackbarService,
    private dialog : DialogService,
    private route : Router
    ) { }

  loggedIn;
  loggedOut= false;


  login(email,pass)
  {
    return this.auth.auth.signInWithEmailAndPassword(email,pass).then(()=>{

    })
  }

  isAuthenticated(){

    const promise = new Promise((resolve,reject)=>{

      this.auth.authState.subscribe((data:any)=>{

        if(data){
          console.log(data)
          this.loggedIn=true;
          resolve(this.loggedIn)
        }
        else{
          this.loggedIn=false;
          reject(this.loggedIn)
        }
      })
    })
    
return promise
  }

  initLogout(){
    this.auth.auth.signOut();
  }

  logout(){

    this.dialog.openDialog(QrcodeDialogComponent,'logout').afterClosed().subscribe((data:any)=>{

      if(data){
        this.auth.auth.signOut().then(()=>{

          this.snack.snackbarSevice('Logged out Successfuly','OK','1000').afterDismissed().subscribe(()=>{

            this.route.navigate(['/'])
          })

        })
      }
    })

    
  }

}
