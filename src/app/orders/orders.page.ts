import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ApiservicesService } from '../apiservices.service';
import { NavController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  formdata:any;
  i = 0;
  orderList:any;
  orderLength:any;
  err_msg:any;

  constructor(private navCtrl: NavController,public api:ApiservicesService,private router: Router) {
    this.getOrders();
   }

  ngOnInit() {
  }

  goBack() {
      this.navCtrl.back();
  }

  goToOrderDetails(val:any, payid:any){
    const navData: NavigationExtras = {
      queryParams: {
          value: val,
          payid: payid
      }
    };
    this.router.navigate(['/order-details'], navData);
  }

  changeDiv(val:any){
    this.i = val;
  }

   getOrders(){
     const data = {caseno:1};
    console.log(JSON.stringify(data));

     this.api.api_test("get_orders.php", data).subscribe((res: any) => {
      console.log('success=='+ JSON.stringify(res));
      this.orderList = res;
      this.orderLength = res.length;
      console.log('size=='+ this.orderLength);

    }, (error: any) => {
      console.log('error='+ error);
    });

   }

}
