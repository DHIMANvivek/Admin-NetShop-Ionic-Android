import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ApiservicesService } from '../apiservices.service';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  formdata:any;
  i = 0;
  notifyList:any;
  notifyLength:any;

  constructor(private navCtrl: NavController,private fb: FormBuilder,public api:ApiservicesService) {
    this.getNotify();
   }

  ngOnInit() {
    this.formdata =  this.fb.group({
      msg: new FormControl(),
      });
  }

  goBack() {
      this.navCtrl.back();
  }

  changeDiv(val:any){
    this.i = val;
    this.show = false;
  }

  async onClickSubmit(frm:any){
    let date = formatDate(new Date(), 'dd MMM yyyy', 'en');
    let time = formatDate(new Date(), 'hh:mm a', 'en');

    const api_url='notification.php';
       console.log('Add notifications api');

       const data={caseno:0,msg:frm.msg,date:date,time:time};
       console.log("data is "+JSON.stringify(data));

        this.api.api_test(api_url, data).subscribe((res: any) => {
          console.log('success=='+ res);
          this.changeDiv(0);
          this.getNotify();
        }, (error: any) => {
          console.log('error='+ error);
        });

   }

   getNotify(){
     const data = {caseno: 1};
    console.log(JSON.stringify(data));
     this.api.api_test("notification.php", data).subscribe((res: any) => {
      console.log('success=='+ JSON.stringify(res));
      this.notifyList = res;
      this.notifyLength = res.length;
      this.show = true;
      console.log('size=='+ this.notifyLength);

    }, (error: any) => {
      console.log('error='+ error);
    });

   }

show = true;
showAdd(val:any){
this.show = val;
}


}
