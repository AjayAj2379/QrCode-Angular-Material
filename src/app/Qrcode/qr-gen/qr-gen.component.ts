import { Component, OnInit,OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';
import {SnackbarService} from '../../service/snackbar.service'
import{DialogService} from '../../service/dialog.service';
import{AngularFirestore} from '@angular/fire/firestore'
import {QrcodeDialogComponent} from '../../dialog/qrcode-dialog/qrcode-dialog.component';
import {Formvalues} from '../../formVaues.model'
import { error } from 'util';
import {PdfService} from '../../service/pdf.service'
import { firestore } from 'firebase';
import { from } from 'rxjs';


@Component({
  selector: 'app-qr-gen',
  templateUrl: './qr-gen.component.html',
  styleUrls: ['./qr-gen.component.css']
})
export class QRGenComponent implements OnInit, OnDestroy {
  
  submitted=false;
  loading=false;
  id=[];

constructor(private route:Router, 
  private snackservice: SnackbarService,
  private dialog:DialogService,
  private pdf: PdfService,
  private firestore:AngularFirestore ) { }


rcNumber=''
memberNo=''
href : string;
formValue:Formvalues
  
  ngOnInit() {
  
    this.resetForm();
    this.href='';
    
  
  }
  
  ngOnDestroy(){
    console.log('destroy')
    this.snackservice.closeSnack();
  }




  onSubmit(form:NgForm)
  {
    console.log(form)
    if(form.valid)
    {

     let dialogRef = this.dialog.openDialog(QrcodeDialogComponent,'submit');

     dialogRef.afterClosed().subscribe((result)=>{
       console.log(result);
       if(result)
       {
          // this.route.navigate(['/Qr/'+form.value.rcNumber])
          this.formValue.LotNumber = form.value.lotNumber;
          this.formValue.RcNumber= form.value.rcNumber;
          this.formValue.MemberNo =form.value.memberNo;
          this.formValue.Section =form.value.section;
          this.formValue.Length = form.value.length;
          this.formValue.Qty =form.value.quantity;
          this.formValue.Weight = form.value.weight;
          this.formValue.W_C =form.value.W_C;
          this.formValue.WC1 = true;
          this.formValue.operation = form.value.operation;
          this.formValue.BEMCO = (form.value.bemco === '' ? false : form.value.bemco);
          this.formValue.HYD =  (form.value.hyd === '' ? false : form.value.hyd)
          this.formValue.HAB =  (form.value.hab === '' ? false : form.value.hab)
          this.formValue.Qc = true;
          this.formValue.finish = false;
          this.formValue.workcentre=''

          if(this.formValue.BEMCO)
          {
            this.formValue.workcentre = this.formValue.workcentre.concat('BEMCO ')
          }
          if(this.formValue.HYD)
          {
            this.formValue.workcentre = this.formValue.workcentre.concat('HYD ')
          }
          if(this.formValue.HAB)
          {
            this.formValue.workcentre = this.formValue.workcentre.concat('HAB')
          }
          this.submitted= true
          this.rcNumber = form.value.rcNumber;
          this.memberNo = form.value.memberNo;
        
       }

     })      
    }
    else{
    
    this.snackservice.snackbarSevice('Fill the required Fields','Dismiss',2000)
    }
    
  }

  resetForm(form?: NgForm){
    if(form != null)
        form.resetForm();
        this.formValue = {
          LotNumber :'',
          RcNumber:'',
          MemberNo:'',
          Section:'',
          Length:'',
          Qty:'',
          Weight:'',
          W_C:'',
          WC1:true,
          HYD:true,
          BEMCO:true,
          HAB:true,
          Qc:true ,
          imagehref:'' ,
          operation:'',
          workcentre:'',
          finish:false,
          time:''
        }
      }
  download(){
     console.log(document.getElementsByTagName('img')[0].src)
      this.href =  document.getElementsByTagName('img')[0].src

      this.pdf.download(this.href,this.rcNumber,this.memberNo)
  
    }

    saveData(){
      this.loading = true;
      this.href =  document.getElementsByTagName('img')[0].src
      this.formValue.imagehref = this.href
      this.formValue.time = firestore.Timestamp.now();
   
     console.log(this.formValue)

      
      this.firestore.collection('values').doc(this.rcNumber).set(this.formValue).then((data)=>{

          this.firestore.collection('details').doc('WC1').update({id: firestore.FieldValue.arrayUnion(this.rcNumber)}).then(()=>{
            this.loading=false;

            this.snackservice.snackbarSevice('Datas are saved','Press to go Back').onAction().subscribe(()=>{
    
              this.submitted = false;
            console.log('sadsa')
            })
          })
        
      }).catch((err)=>{
        console.log(err)
      })

  

     }
  

}
