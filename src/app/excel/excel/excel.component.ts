import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx'
import {AngularFirestore} from '@angular/fire/firestore'
import { firestore } from 'firebase';

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
  select=true;
  loading= false;
  loadedData = false;
  workcentre=''
  filesize=''
  sheetName=0;
   workbook = null;
  sheetArray=[];
  fileName=''
  imgarray:string[]=[]
  another:any[]=[]

  ngOnInit() {
  }

  chooseSheet(){
    console.log(this.sheetName)
    const sheet=this.workbook.Sheets[this.workbook.SheetNames[this.sheetName]]

    console.log(sheet)
    var range= XLSX.utils.decode_range(sheet['!ref'])
    console.log(range)
    this.traverseColumn(range,sheet)
    
    
  }

 saveData(){

  this.loading = true;

  this.another.forEach(async (item,index)=>{

console.log(item,index)   
console.log(item.RcNumber) 
 await this.firestore.collection('values').doc(item.RcNumber).set(item).then(()=>{
        console.log('succ')
        this.firestore.collection('details').doc('WC1').update({id: firestore.FieldValue.arrayUnion(item.RcNumber)}).then(()=>{
          console.log('entered')
        })
      })
  })
this.loading=false;
  }

  async traverseColumn (range,sheet){
    this.loading= true;
    this.loadedData=false;
      // traversing through the columns
   this.another=[];
    
      for(var R = range.s.r+1; R <= range.e.r; ++R) {
        var skip = false;
        for(var C = range.s.c; C <= range.e.c; ++C) {
        var value;
        this.workcentre=''
      
        
    
         
          var cell_address = {c:C, r:R};
        
       //  console.log(this.headingArray[C])
           var cell_ref = XLSX.utils.encode_cell(cell_address);

           if(C<9 && !sheet[cell_ref])
           {
             console.log('aj')
             skip = true;

             break;
           }

          if(!sheet[cell_ref] && C>=9)
          {
            value=false;
          //  console.log(cell_ref +'-->'+ 'false')
          }
          else if(C>=9 && sheet[cell_ref]){
              value= true;
          }
          else {
            value= sheet[cell_ref].v
           // console.log(cell_ref +'-->'+ sheet[cell_ref].v)
          }
          
          var temp ={};
          temp[this.headingArray[C]] = value;
         
          this.formValues = {...this.formValues,...temp}
             
        }
        console.log(skip)
        if(!skip)
        {
          if(this.formValues.BEMCO)
          {
          this.workcentre = this.workcentre.concat('BEMCO ')
         // console.log(this.workcentre)
          }
          if(this.formValues.HYD)
          {
            this.workcentre = this.workcentre.concat('HYD ')
           // console.log(this.workcentre)
          }
          if(this.formValues.HAB)
          {
            this.workcentre = this.workcentre.concat('HAB ')
            //console.log(this.workcentre)
          }
          var flag = {};
          flag['workcentre'] = this.workcentre;
          temp['finish']=false;
          
          this.formValues={...this.formValues,...flag,...temp}
         
          console.log(this.formValues.RcNumber)
          this.rcNumber= this.formValues.RcNumber
          await this.sleep();
          this.href=document.getElementsByTagName('img')[0].src;
          console.log('href')
          flag['imagehref']= this.href
          this.formValues = {...this.formValues,...flag}
          //this.imgarray.push(this.href)
          console.log(this.formValues)
          this.another.push(this.formValues)
        
        }

        
      }
     
      console.log (this.another)
      
      this.loading=false;
      this.loadedData=true;
      
     
      
    
    
     
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
 if(extension === 'xlsx' || extension === 'xls')
 {

    reader.onload = async (event) =>{
    //console.log(event)
      const data = reader.result;
      //console.log(data)
     this.workbook = XLSX.read(data, {type:'binary'})
      console.log(this.workbook.SheetNames)
      this.sheetArray=[];
      for(var i=0;i<this.workbook.SheetNames.length;i++)
      {
        this.sheetArray.push({index: i, name: this.workbook.SheetNames[i]});
      }
     
      this.select = false;
      console.log(this.sheetName)

    
     
    }
    
    reader.readAsBinaryString(file);

 }

 else{

 }


  }


  sleep() {
    
    return new Promise(resolve => setTimeout(resolve, 0));
 }
}
