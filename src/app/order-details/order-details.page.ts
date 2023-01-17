import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { ApiservicesService } from '../apiservices.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationExtras} from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {
  orderList:any;
  ship:any;
  deliver:any;
  in:any;
  accountInfo:any;
  orderLength:any;
  formdata: any;
  oid:any;
  constructor(private router: Router, private route: ActivatedRoute,private navCtrl: NavController, private api: ApiservicesService) {
    this.route.queryParams.subscribe(data => {
      let oid = data['value'];
      this.oid = data['value'];
      let payid = data['payid'];
      this.getOrders(oid);
      this.getProduct(payid);
  })
   }

  ngOnInit() {
  }

  goToBack() {
    this.navCtrl.back();
  }

  getOrders(oid:any){
    const data = {caseno:2, oid:oid};
   console.log(JSON.stringify(data));

    this.api.api_test("get_orders.php", data).subscribe((res: any) => {
     console.log('success=='+ JSON.stringify(res));
     this.orderList = res;
     this.stat = this.orderList[0].status;
     this.orderLength = res.length;
     this.getAccountInfo(this.orderList[0].uid);
     console.log('size=='+ this.orderLength);

   }, (error: any) => {
     console.log('error='+ error);
   });

  }

  updateStat(uid:any, oid:any){
    const data = {caseno:1, status:this.stat, uid:uid, oid:oid};
   console.log(JSON.stringify(data));

    this.api.api_test("orders.php", data).subscribe((res: any) => {
     console.log('success=='+ JSON.stringify(res));

   }, (error: any) => {
     console.log('error='+ error);
   });

  }


  getAccountInfo(uid:any){
    const data = {caseno:0, uid:uid};
   console.log(JSON.stringify(data));

    this.api.api_test("get_accountInfo.php", data).subscribe((res: any) => {
     console.log('success=='+ JSON.stringify(res));
     this.accountInfo = res;
     this.orderLength = res.length;
     console.log('size=='+ this.orderLength);

   }, (error: any) => {
     console.log('error='+ error);
   });

  }
stat:any;

show(){
  alert(this.stat);
}

plist:any;
plength:any;
getProduct(payid:any){
  const data = {caseno:2,payid:payid};
  this.api.api_test("get_product.php", data).subscribe((res: any) => {
    console.log('success=='+ JSON.stringify(res));
    this.plist = res;
    this.plength = res.length;
    console.log('size=='+ this.orderLength);

  }, (error: any) => {
    console.log('error='+ error);
  });
}

}
