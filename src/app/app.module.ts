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
  MatDatepickerModule,
  MatNativeDateModule,
 MatButtonModule,
 MatDividerModule,
 MatProgressBarModule,
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


const routes: Routes =[
  {path:'', component:QRGenComponent},
  {path:'home',component:QRGenComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    QRGenComponent,
    QrCodeComponent,  
    QrcodeDialogComponent, LoginComponent,
   
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
    MatProgressBarModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatDialogModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    NgxQRCodeModule
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
