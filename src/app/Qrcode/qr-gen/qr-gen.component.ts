import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';
import {SnackbarService} from '../../service/snackbar.service'
import{DialogService} from '../../service/dialog.service';
import{AngularFirestore} from '@angular/fire/firestore'
import {QrcodeDialogComponent} from '../../dialog/qrcode-dialog/qrcode-dialog.component';
import {Formvalues} from '../../formVaues.model'
import { error } from 'util';
import { firestore } from 'firebase';


@Component({
  selector: 'app-qr-gen',
  templateUrl: './qr-gen.component.html',
  styleUrls: ['./qr-gen.component.css']
})
export class QRGenComponent implements OnInit {
  
  submitted=false;
  loading=false;
  id=[];

constructor(private route:Router, 
  private snackservice: SnackbarService,
  private dialog:DialogService,
  private firestore:AngularFirestore ) { }


rcNumber=''
href : string;
formValue:Formvalues
  
  ngOnInit() {
    this.resetForm();
    this.href='';
    this.firestore.collection('details').doc('WC1').valueChanges().subscribe((data:any)=>{
            this.id= data.id;   
          console.log(this.id)
          })
  
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
          finish:false
        }
      }
  download(){
  console.log(document.getElementsByTagName('img')[0].src)
    this.href =  document.getElementsByTagName('img')[0].src
  
    }

    saveData(){
      this.loading = true;
      this.href =  document.getElementsByTagName('img')[0].src
      this.formValue.imagehref = this.href
   
     console.log(this.formValue)

      
      this.firestore.collection('values').doc(this.rcNumber).set(this.formValue).then((data)=>{
<<<<<<< HEAD
=======

       
        this.id.push(this.rcNumber);

            this.firestore.collection('details').doc('WC1').set({id:this.id}).then(()=>console.log("pushed"))

         this.loading=false;
>>>>>>> d9faa02c18a0f0692faa8872b9ebf95aacfad326

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
