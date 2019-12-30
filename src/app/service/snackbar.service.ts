import { Injectable } from '@angular/core';
import {MatSnackBar,MatSnackBarConfig,MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition } from '@angular/material'


@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(private snackbar:MatSnackBar) { }

  snackbarSevice(message,action,duration?)
  {
    
    
    let config = new MatSnackBarConfig();

    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition
    if(duration)
    {
      return this.snackbar.open(message,action,{duration:duration})
    }
    return this.snackbar.open(message,action)
  }

  closeSnack(){

    this.snackbar.dismiss();
  }
}
