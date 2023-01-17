import { NavController, ToastController, ActionSheetController,LoadingController }  from '@ionic/angular';
import { CameraOptions , Camera } from '@awesome-cordova-plugins/camera/ngx';
import { Component } from '@angular/core';
import { FileTransfer, FileUploadOptions, FileTransferObject }  from '@awesome-cordova-plugins/file-transfer/ngx';
import { File ,FileEntry } from '@awesome-cordova-plugins/file/ngx';
import { FilePath } from '@awesome-cordova-plugins//file-path/ngx';
import { ApiservicesService } from '../apiservices.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { runInThisContext } from 'vm';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  imageURI:any;
  imageFileName:any;
  GetImageNameUpload:any;
  formdata:any;
  i = 0;

  collections = [
   'Men Collection','Women Collection','Winter Collection','Summer Collection',
  ];

brands = [
  'Nike', 'Woodland', 'Peter England', 'Louis Phillip', 'Levis', 'Being Human', 'Gucci', 'Armani',
];

  constructor(private fb: FormBuilder,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController,
    private transfer: FileTransfer,
    private camera: Camera,
    private filePath: FilePath,
    private file: File,
    public loadingCtrl: LoadingController,
    public api:ApiservicesService) {

      // this.getProductImg();
  }

  ngOnInit() {

    this.formdata =  this.fb.group({
      name: new FormControl(),
      price: new FormControl(),
      descs: new FormControl(),
      // color: new FormControl(),
      // size: new FormControl(),
      brand: new FormControl(),
      img: new FormControl(),
      collection: new FormControl(),
      });
}

change(val:any){
this.i = val;
}
  async presentActionSheet() {
    let actionSheet =await this.actionSheetCtrl.create({

      buttons: [
        {
          icon: 'camera-outline',
          handler: () => {
            this.getImage(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          icon: 'image-outline',
          handler: () => {
            this.getImage(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          icon: 'close-circle-outline',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  async getImage(sourceType:any) {
    let loader =await this.loadingCtrl.create({
      message: "Please wait..."
    });
    loader.present();
    const options: CameraOptions = {
      quality: 50,
      targetWidth: 640,
      targetHeight: 958,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: sourceType
    }
    this.camera.getPicture(options).then((imagePath) => {
      this.imageURI = imagePath;
      this.filePath.resolveNativePath(imagePath)
        .then(filePath => {
          this.file.resolveLocalFilesystemUrl(filePath).then(fileInfo =>
            {
              let files = fileInfo as FileEntry;
              files.file(success =>
                {
                  this.imageFileName=success.name;

                });
            },err =>
            {
              console.log(err);
              throw err;
            });
        });
        loader.dismiss();
    }, (err) => {
      console.log(err);
      this.presentToast(err);
      loader.dismiss();
    });
    this.change(1);
  }



  async uploadFile() {
    let loader = await this.loadingCtrl.create({
      message: "Uploading..."
    });
    loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();

    let URL="https://vivekdhiman.engineer/api/img_up.php";

    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: this.imageFileName,
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {}
    }
    fileTransfer.upload(this.imageURI, URL, options)
      .then((data) => {
      this.GetImageNameUpload=this.imageFileName;
      loader.dismiss();
      this.presentToast("Image uploaded successfully");
      alert("this is upload "+this.GetImageNameUpload);
    }, (err) => {
      console.log(err);
      loader.dismiss();
      this.presentToast(err);
    });
    this.change(2);
  }

  async presentToast(msg:any) {
    let toast =await this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  imgArray:any;
  err_msg:any;

getProductImg(){
  const data = {};
  this.getData("get_img.php", data);
}

  getData(apiFileName:any,data:any){

    this.api.api_test(apiFileName, data).subscribe((res: any) => {
    this.imgArray=res;
    console.log("result is "+res);

  }, (error: any) => {

    this.err_msg='error' + error;

  });
  }

  async onClickSubmit(frm:any){
    // this.uploadFile();

    const api_url='adminProductsApi.php';
       console.log('Add products api');
       alert("pahunch gai "+this.GetImageNameUpload);

       const data={caseno:1,collection:frm.collection,brand:frm.brand,name:frm.name,price:frm.price,descs:frm.descs,img:this.GetImageNameUpload};
       alert("data is "+JSON.stringify(data));

        this.api.api_test(api_url, data).subscribe((res: any) => {
          console.log('success=='+ res);
         // this.msg = res;
          alert(res);
        }, (error: any) => {
          console.log('error='+ error);
        //  this.msg = error;
        });

   }
}
