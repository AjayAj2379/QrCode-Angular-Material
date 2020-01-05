import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AngularFireModule} from '@angular/fire';
import {FormsModule} from '@angular/forms';
import {AngularFireStorageModule} from '@angular/fire/storage'
import {AngularFirestoreModule} from '@angular/fire/firestore'
import {AngularFireAuthModule} from '@angular/fire/auth'
import {MatSliderModule,MatCheckboxModule,MatSnackBarModule,MatDialogModule,
  MatInputModule,
  MatIconModule,
  MatTableModule,
  MatDatepickerModule,
  MatSelectModule,
  MatNativeDateModule,
  MatPaginatorModule,
 MatButtonModule,
 MatDividerModule,
 MatProgressBarModule,
 MatToolbarModule,
MatCardModule} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {Routes,RouterModule} from '@angular/router'
import {NgxQRCodeModule} from 'ngx-qrcode2'


import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { QRGenComponent } from './Qrcode/qr-gen/qr-gen.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QrCodeComponent } from './Qrcode/qr-code/qr-code.component';


import { QrcodeDialogComponent } from './dialog/qrcode-dialog/qrcode-dialog.component';
import { LoginComponent } from './login/login/login.component';
import { ToolbarComponent } from './nav/toolbar/toolbar.component';
import { ListComponent } from './detail/list/list.component';
import { WrapperComponent } from './wrapper/wrapper/wrapper.component';
import {AuthGuardService} from './service/auth-guard.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ExcelComponent } from './excel/excel/excel.component'
import { DatePipe } from '@angular/common';



const routes: Routes =[
  {path:'', component:LoginComponent},
  {path:'main', component:WrapperComponent,canActivate:[AuthGuardService] ,children:[
   
    {path:'home',component:QRGenComponent},
    {path:'',component:QRGenComponent},
    {path:'list',component:ListComponent},
    {path:'excel',component:ExcelComponent}
  ]},

  {path:'**',component:PageNotFoundComponent}
 
];

@NgModule({
  declarations: [
    AppComponent,
    QRGenComponent,
    QrCodeComponent,  
    
    QrcodeDialogComponent, LoginComponent, ToolbarComponent, ListComponent, WrapperComponent, PageNotFoundComponent, ExcelComponent,
   
  ],
 
  entryComponents:[QrcodeDialogComponent],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
    RouterModule.forRoot(routes),
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatIconModule,
    MatCheckboxModule,
    MatSelectModule,
    MatProgressBarModule,
    FormsModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatNativeDateModule,
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatDialogModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    NgxQRCodeModule
 
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
