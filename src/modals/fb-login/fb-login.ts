import { Component, OnInit } from '@angular/core';
import { GetService } from '../../services/getService';
import { Platform, NavParams, ViewController, NavController} from 'ionic-angular';
//import { TabsPage } from '../../pages/tabs/tabs';

@Component({
  selector: 'page-fb-login',
  templateUrl: 'fb-login.html',
  providers: [ GetService ]
})
export class FBLogin implements OnInit{
    constructor(public viewCtrl: ViewController, public navCtrl: NavController, public platform: Platform, public params: NavParams,){
    }

    login() {
        //this.navCtrl.setRoot(TabsPage);
    }
    dismiss() {
        this.viewCtrl.dismiss();
    }
    ngOnInit(){
    }
    
}