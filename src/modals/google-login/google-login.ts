import { Component, OnInit } from '@angular/core';
import { GetService } from '../../services/getService';
import { Platform, NavParams, ViewController, NavController} from 'ionic-angular';
//import { TabsPage } from '../../pages/tabs/tabs';

@Component({
  selector: 'page-google-login',
  templateUrl: 'google-login.html',
  providers: [ GetService ]
})
export class GoogleLogin implements OnInit{
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