import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from '../../service/auth-service.service'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private authService:AuthServiceService) { }

  ngOnInit() {
  }

  logout(){

    this.authService.logout();
  }
  

}
