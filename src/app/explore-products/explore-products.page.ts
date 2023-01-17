
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiservicesService } from '../apiservices.service';
import { NavigationExtras} from '@angular/router';

@Component({
  selector: 'app-explore-products',
  templateUrl: './explore-products.page.html',
  styleUrls: ['./explore-products.page.scss'],
})
export class ExploreProductsPage implements OnInit {
  filterTerm!: string;
    product = [
      'assets/imgs/5.jpg',
      'assets/imgs/6.jpg',
      'assets/imgs/7.png',
      'assets/imgs/8.jpg',
      'assets/imgs/9.jpg',
      'assets/imgs/10.jpg',
      'assets/imgs/11.jpg',
      'assets/imgs/12.jpg',
    ];

    title:any;
  constructor(public api:ApiservicesService,private navCtrl: NavController, private router: Router, private route: ActivatedRoute) {
      this.route.queryParams.subscribe(data => {
          this.title = data['value']
          this.get_product(data['value']);
      })
  }

  pname:any;
  err_msg:any;
  productLen:any;
  brands:any="All";
  color:any="All";
  size:any="All";
  sortby:any="All";
  dropdown:any="Popular";

wishlist:any;
wishLength:any;
productImage:any;


 getData(apiFileName:any,data:any)
 {

   console.log('get data function');
     this.api.api_test(apiFileName, data).subscribe((res: any) => {

     console.log('get data file'+ res);
     this.pname=res;
     this.productLen = res.length;

   }, (error: any) => {

     this.err_msg='error';

   });

 }

  get_product(val:any){
    console.log("title="+val);
    const data={caseno:1,collection:val};
    this.getData('get_product.php', data);
    }

    ngOnInit() {
    }

    goToBack() {
        this.navCtrl.back();
    }

    goToProduct() {
        this.router.navigate(['/product-detail']);
    }

    goToCart() {
      this.router.navigate(['/cart']);
    }

    goToExploreProducts(val:any) {
        const navData: NavigationExtras = {
            queryParams: {
                value: val
            }
        };
        this.router.navigate(['/product-detail'], navData);
      }


}
