import { Component, OnInit, ViewChild } from '@angular/core';
import{AngularFirestore} from '@angular/fire/firestore';
import {MatTableDataSource} from '@angular/material/table';
import {TableData} from '../../formVaues.model'
import { MatPaginator } from '@angular/material';
import {DialogService} from '../../service/dialog.service';
import {QrcodeDialogComponent} from '../../dialog/qrcode-dialog/qrcode-dialog.component';
import {AuthServiceService} from '../../service/auth-service.service'
import { firestore } from 'firebase';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

 displayedColumns: string[] = ['position', 'RcNumber', 'member', 'lot', 'imageLink','delete'];
  tableValues:TableData[]=[];
  dataSource = new MatTableDataSource<TableData>(this.tableValues);
  loading=false;
 
 // dataSource = ELEMENT_DATA;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private firestore: AngularFirestore,
    private dialog : DialogService,
    private authService : AuthServiceService
    ) { }

  ngOnInit() {
    console.log('ngonit')

    this.dataSource.paginator = this.paginator
    this.loading=true
   
    this.dataSource = new MatTableDataSource<TableData>(this.tableValues)
    this.firestore.collection('values').snapshotChanges().subscribe((data):any=>{
      this.tableValues=[];
     data.map((info:any)=>{

          
      
      this.tableValues.push({
        RcNumber:info.payload.doc.data().RcNumber,
        MemberNo:info.payload.doc.data().MemberNo,
        LotNumber:info.payload.doc.data().LotNumber,
        image: info.payload.doc.data().imagehref
      })
        })
      
        this.dataSource = new MatTableDataSource<TableData>(this.tableValues)
        this.loading=false;
        console.log(this.tableValues)
        
      
    })

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  delete(id){
    console.log(id);

    let dialogRef = this.dialog.openDialog(QrcodeDialogComponent,'delete')
    dialogRef.afterClosed().subscribe((result)=>{

      if(result)
      {
        this.firestore.collection('values').doc(id).delete().then(()=>{
          this.firestore.collection('details').doc('WC1').update({id: firestore.FieldValue.arrayRemove(id)})
        })
       
      }
    })
  
  }

 
}

