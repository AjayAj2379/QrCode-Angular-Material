import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx'
import {AngularFirestore} from '@angular/fire/firestore'

@Component({
  selector: 'app-excel',
  templateUrl: './excel.component.html',
  styleUrls: ['./excel.component.css']
})
export class ExcelComponent implements OnInit {


  constructor(
private firestore : AngularFirestore

  ) { }

  headingArray: string[] = ['LotNumber','RcNumber','MemberNo','Section','Length','Qty','Weight','W_C','operation','WC1','BEMCO','HYD','HAB','Qc']
  formValues:any
  rcNumber=''
  href=''
  workcentre=''
  filesize=''
  sheetNames=[];
  fileName=''
  imgarray:string[]=[]
  another:any[]=[]

  ngOnInit() {
  }

  bytesToSize(bytes:any) {
    var count=0;
    const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    if(bytes===0)
    {
      return '0 Byte'
    }

    while( bytes>=1024  )
    {
      console.log(bytes)
        count++;
        bytes=bytes/1024
        
       
    }

    console.log(bytes,count)
    return bytes.toFixed(2)+' '+units[count]
    
 }

 onSubmit(ev){
//console.log(ev)

let workbook = null;
let jsonData = null;



const reader = new FileReader();

const file = ev.target.files[0];

const extension = file.name.split('.')[1]
  console.log(extension)
 console.log(file.name)
 this.fileName= file.name;
 console.log(file.size)
 this. filesize = this.bytesToSize(parseInt(file.size))
 console.log(this.filesize)
 if(extension == 'xlsx' || extension == 'xls')
 {

 }

 else{

 }
// reader.onload = async (event) =>{
// //console.log(event)
//   const data = reader.result;
//   //console.log(data)
//   workbook = XLSX.read(data, {type:'binary'})
//   console.log(workbook.SheetNames)
//   console.log(workbook.SheetNames.length)
//   const sheet= workbook.Sheets[workbook.SheetNames[0]]
//   console.log(sheet)
//   var range= XLSX.utils.decode_range(sheet['!ref'])
//   console.log(range)

// // traversing through the columns

//   for(var R = range.s.r+1; R <= range.e.r; ++R) {
//     for(var C = range.s.c; C <= range.e.c; ++C) {
//     var value;
//     this.workcentre=''

     
//       var cell_address = {c:C, r:R};
    
//    //  console.log(this.headingArray[C])
//        var cell_ref = XLSX.utils.encode_cell(cell_address);
//       if(!sheet[cell_ref])
//       {
//         value=false;
//       //  console.log(cell_ref +'-->'+ 'false')
//       }
//       else if(C>=9 && sheet[cell_ref]){
//           value= true;
//       }
//       else {
//         value= sheet[cell_ref].v
//        // console.log(cell_ref +'-->'+ sheet[cell_ref].v)
//       }
      
//       var temp ={};
//       temp[this.headingArray[C]] = value;
     
//       this.formValues = {...this.formValues,...temp}
         
//     }
    
//     if(this.formValues.BEMCO)
//     {
//     this.workcentre = this.workcentre.concat('BEMCO ')
//     console.log(this.workcentre)
//     }
//     if(this.formValues.HYD)
//     {
//       this.workcentre = this.workcentre.concat('HYD ')
//       console.log(this.workcentre)
//     }
//     if(this.formValues.HAB)
//     {
//       this.workcentre = this.workcentre.concat('HAB ')
//       console.log(this.workcentre)
//     }
//     var flag = {};
//     flag['workcentre'] = this.workcentre;
//     temp['finish']=false;
    
//     this.formValues={...this.formValues,...flag,...temp}
   
//     console.log(this.formValues.RcNumber)
//     this.rcNumber= this.formValues.RcNumber
//     await this.sleep();
//     this.href=document.getElementsByTagName('img')[0].src;
//     console.log('href')
//     flag['imagehref']= this.href
//     this.formValues = {...this.formValues,...flag}
//     this.imgarray.push(this.href)
//     console.log(this.formValues)
//     this.another.push(this.formValues)
  
//   }
 
  
  
  
 
  


//   // this.firestore.collection('det').doc(this.another[1].RcNumber).set(this.another[1]).then(()=>{
//   //   console.log('succ')
//   // })

 
// }

// reader.readAsBinaryString(file);

  }


  sleep() {
    
    return new Promise(resolve => setTimeout(resolve, 0));
 }
}
