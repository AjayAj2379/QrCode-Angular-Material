import { Injectable } from '@angular/core';
import { MatDialog} from '@angular/material'

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog : MatDialog) { }

  openDialog(componenet,text){

   return this.dialog.open(componenet,{data:{name:text}})
   

  }
}

//Ajay