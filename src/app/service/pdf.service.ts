import { Injectable } from '@angular/core';
import * as jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

  download(base64, rc, mem){
  
    console.log(base64,rc,mem)
    var imageData = base64;
    var doc = new jsPDF();
   
    doc.setFontSize(16)
    doc.text([rc,mem],110,32,{align:'center'})
    doc.addImage(imageData,'PNG',85,40,50,50)
    //doc.output('dataurlnewwindow');

    doc.save(rc+'.pdf')

  }
}


