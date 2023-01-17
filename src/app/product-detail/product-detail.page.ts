import { ProductDetailPageModule } from './product-detail.module';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiservicesService } from '../apiservices.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { NavigationExtras} from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {

    productID = 0;

    constructor(public api:ApiservicesService,private modalCrtl: ModalController,
      private navCtrl: NavController,private router: Router,
      private route: ActivatedRoute,) {

      this.route.queryParams.subscribe(data => {
        this.productID = data['value']
        this.get_product(data['value']);
    })


  }

    ngOnInit() {
    }

    productDetails:any;
    err_msg:any;

    goToBack() {
      this.navCtrl.back();
    }


pname:any;
getData(apiFileName:any,data1:any){

  console.log('get data function');
  this.api.api_test(apiFileName, data1).subscribe((res: any) => {

  // console.log('get data file'+ res);
  console.log('get data file'+ JSON.stringify(res));
  console.log("https://vivekdhiman.engineer/"+res[0].img);
  this.pname=res;

}, (error: any) => {

  this.err_msg='error';
});
}

id:any;

get_product(val:any){
  const data={id:val};
  console.log("val id is "+val);
   this.getData('get_product_detail.php', data);
  }

  deleteProduct(val:any){
    const data={caseno:2, id:val};

    this.api.api_test('adminProductsApi.php', data).subscribe((res: any) => {

      console.log('delete data'+ JSON.stringify(res));

    }, (error: any) => {

      this.err_msg='error';
    });

  //   const navData: NavigationExtras = {
  //     queryParams: {
  //         value: 'All Products'
  //     }
  // };

    // this.router.navigate(['/explore-products']);
  }

}

