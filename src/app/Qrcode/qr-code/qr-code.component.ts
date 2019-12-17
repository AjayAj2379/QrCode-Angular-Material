import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.css']
})
export class QrCodeComponent implements OnInit {

  constructor( private route:ActivatedRoute) { }
  rcNumber='';
  elementType='img'
  href : string;
  size='L'
 

  ngOnInit() {

    this.route.params.subscribe((data)=>{
      console.log(data)
      this.rcNumber = data.id
    })

  }

  download(){
  
  this.href =  document.getElementsByTagName('img')[0].src

  }

  

}
