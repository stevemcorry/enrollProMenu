import { Component, OnInit } from '@angular/core';
import { GetService} from '../../services/getService';
import { ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
//import { LoadingPage } from '../loading/loading';

@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
  providers: [ GetService ]
})
export class More implements OnInit{

  constructor(public navCtrl: ModalController, public getService: GetService, public storage: Storage) {
  }
  name;
  getName(){
    this.getService.getStorageName().then(res => {
      this.name = res;
    })
  }
  logout(){
    console.log('Log Out')
    //this.storage.clear();
    //let modal = this.navCtrl.create(LoadingPage);
    //modal.present();
  }

  ngOnInit(){
    this.getName();
  }
}