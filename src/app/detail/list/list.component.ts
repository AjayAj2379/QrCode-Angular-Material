import { Component, OnInit, ViewChild } from '@angular/core';
import{AngularFirestore} from '@angular/fire/firestore';
import {MatTableDataSource} from '@angular/material/table';
import {TableData} from '../../formVaues.model'
import { MatPaginator } from '@angular/material';
import {DialogService} from '../../service/dialog.service';
import {QrcodeDialogComponent} from '../../dialog/qrcode-dialog/qrcode-dialog.component';
import {AuthServiceService} from '../../service/auth-service.service';
import {PdfService} from '../../service/pdf.service'
import { firestore } from 'firebase';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

 displayedColumns: string[] = ['position', 'RcNumber', 'member', 'FinishedAt', 'lot', 'imageLink','delete'];
  tableValues:TableData[]=[];
  dataSource = new MatTableDataSource<TableData>(this.tableValues);
  loading=false;
 
 // dataSource = ELEMENT_DATA;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private firestore: AngularFirestore,
    private dialog : DialogService,
    private authService : AuthServiceService,
    private pdf : PdfService,
    private datepipe:DatePipe
    ) { }

  ngOnInit() {
    console.log('ngonit')
    var finish;

    this.dataSource.paginator = this.paginator
    this.loading=true
   
    this.dataSource = new MatTableDataSource<TableData>(this.tableValues)
    this.firestore.collection('values', ref=>ref.orderBy('time','asc')).snapshotChanges().subscribe((data):any=>{
      this.tableValues=[];
     data.map((info:any)=>{

      console.log(info.payload.doc.data().time.toDate())   
      if(info.payload.doc.data().Qc === info.payload.doc.data().finish )
      {
        finish = info.payload.doc.data().time.toDate()
       finish= this.datepipe.transform(finish,'MMMM d, y')
       finish = finish.toString();
        console.log(finish)
        
      } 
      else{
        finish='-';
        console.log(finish)
      }
      
      this.tableValues.push({
        RcNumber:info.payload.doc.data().RcNumber,
        MemberNo:info.payload.doc.data().MemberNo,
        LotNumber:info.payload.doc.data().LotNumber,
        image: info.payload.doc.data().imagehref,
        time: finish
      })

    
        })
      
        this.dataSource = new MatTableDataSource<TableData>(this.tableValues)
        this.loading=false;
        console.log(this.tableValues)
        
      
    })

  }
  download(base64,rc,mem)
  {
    this.pdf.download(base64,rc,mem)
  }

  applyFilter(filterValue: string) {
    console.log(filterValue)
    
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource.filter)
  }
  
  delete(id){
    let item;
    console.log(id);
 

    let dialogRef = this.dialog.openDialog(QrcodeDialogComponent,'delete')
    dialogRef.afterClosed().subscribe((result)=>{

      if(result)
      {
        this.firestore.collection('values').doc(id).delete().then(()=>{
          this.firestore.collection('details',ref=>ref.where('id','array-contains',id)).get().subscribe((data)=>{
            data.docs.forEach(info=>{
               item = info.id
            })
            console.log(item)
            this.firestore.collection('details').doc(item).update({id: firestore.FieldValue.arrayRemove(id)})
          })
          
        })
       
      }
    })
  
  }

 
}

