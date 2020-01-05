import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx'
import {AngularFirestore} from '@angular/fire/firestore'
import { firestore } from 'firebase';
import {SnackbarService} from '../../service/snackbar.service'
import {PdfService} from '../../service/pdf.service'

@Component({
  selector: 'app-excel',
  templateUrl: './excel.component.html',
  styleUrls: ['./excel.component.css']
})
export class ExcelComponent implements OnInit {


  constructor(
private firestore : AngularFirestore,
private snackbar : SnackbarService,
private pdf : PdfService

  ) { }

  headingArray: string[] = ['LotNumber','RcNumber','MemberNo','Section','Length','Qty','Weight','W_C','operation','WC1','BEMCO','HYD','HAB','Qc']
  checkHeading: string[] =  ['LotNumber','RcNo','MemberNo','Section','Length','Qty','Weight','W/C','opr','WC1','BEMCO','HYD','HAB','Qc']
  formValues:any
  rcNumber=''
  href=''
  exceed= false;
  headError='';
  heading= false;
  select=true;
  loading= false;
  loadedData = false;
  loadingapi = false;
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
    var value;
    console.log(sheet)
    var range= XLSX.utils.decode_range(sheet['!ref'])
    console.log(range)

    for(var C=0 ; C<14;C++)
    {
      this.heading = false;
        var cell_address = {c:C , r:0}
        var cell_ref = XLSX.utils.encode_cell(cell_address);
        console.log(cell_ref)
        if(!sheet[cell_ref])
        {
            this.heading = true;
            this.loadedData = false;
            this.headError='The top row is empty i.e (A1 - N1)'
            console.log(this.headError)
            break;
        }
        value =  sheet[cell_ref].v
        value=value.toLowerCase().replace(/\s/g,'')
        if(this.checkHeading[C].toLowerCase() === value)
        {
          console.log(value)
        }
        else{
          this.heading = true;
          this.loadedData= false;
          this.headError = 'Column mismatch '+ sheet[cell_ref].v
          console.log(this.headError)
          break;
        }
      // console.log(value.toLowerCase)

    }
    console.log(this.heading)

    if(!this.heading)
    {
      this.traverseColumn(range,sheet)
    }

    else{
      this.snackbar.snackbarSevice(this.headError,'Dismiss',5000)
    }

  //
       
  }

 async saveData(){

  this.loadingapi = true;
  console.log(this.loading)

await this.another.forEach((item,index)=>{

console.log(item,index) 

  
console.log(item.RcNumber) 
  this.firestore.collection('values').doc(item.RcNumber).set(item).then(()=>{
        console.log('succ')
        this.firestore.collection('details').doc('WC1').update({id: firestore.FieldValue.arrayUnion(item.RcNumber)}).then(()=>{
          console.log('entered')
          this.pdf.download(item.imagehref,item.RcNumber,item.MemberNo)
           
          if(index == this.another.length-1)
          {
            this.loadingapi = false;
            this.loadedData = false;
            this.snackbar.snackbarSevice('Data are saved','OK',5000)
          }
        })
      })

     
  })
  
//this.loading=false;
console.log(this.loading)
  }



  async traverseColumn (range,sheet){
    this.loading= true;
    this.loadedData=false;
      // traversing through the columns
   this.another=[];
    
      for(var R = range.s.r+1; R <= range.e.r; ++R) {
        var skip = false;
        for(var C = range.s.c; C <= 13; ++C) {
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
            console.log(C)
            if(C==13 || C==9)
            {
              console.log(C)
              value=true
            }
            else{
              value=false;
            }
           
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
          var time={};
          flag['workcentre'] = this.workcentre;
          temp['finish']=false;
          
          this.formValues={...this.formValues,...flag,...temp}
         
          console.log(this.formValues.RcNumber)
          this.rcNumber= this.formValues.RcNumber
          await this.sleep();
          this.href=document.getElementsByTagName('img')[0].src;
          console.log('href')
          flag['imagehref']= this.href
          time['time'] = firestore.Timestamp.now().toDate();
          this.formValues = {...this.formValues,...flag,...time}
          //this.imgarray.push(this.href)
          console.log(this.formValues)
          this.another.push(this.formValues)
        
        }

        
      }
     
      console.log (this.another)
      
      this.loading=false;
      this.loadedData=true;

      if(this.another.length>175)
      {
        this.exceed = true;
        this.snackbar.snackbarSevice('Loaded Data should be less than 175','OK',5000)
      }
      else{
        this.exceed=false;
      }
      
     
      
    
    
     
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
   this.snackbar.snackbarSevice('Choose only .xls or .xlsx files','OK',5000)

 }


  }


  sleep() {
    
    return new Promise(resolve => setTimeout(resolve, 0));
 }
}
