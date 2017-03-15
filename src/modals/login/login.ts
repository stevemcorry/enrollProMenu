import { Component, OnInit } from '@angular/core';
import { GetService } from '../../services/getService';
import { ModalController, Platform, NavParams, ViewController, NavController} from 'ionic-angular';
import { EmailLogin } from '../email-login/email-login';
import { FBLogin } from '../fb-login/fb-login';
import { GoogleLogin } from '../google-login/google-login';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [ GetService ]
})
export class LoginModal implements OnInit{
    constructor(public viewCtrl: ViewController, public modalCtrl: ModalController, public navCtrl: NavController, public platform: Platform, public params: NavParams, public getService: GetService){
    }
    token;
    emailLogin() {
       let modal = this.modalCtrl.create(EmailLogin);
    modal.present();
    }
    fbLogin() {
       let modal = this.modalCtrl.create(FBLogin);
    modal.present();
    }
    googleLogin() {
       let modal = this.modalCtrl.create(GoogleLogin);
    modal.present();
    }
    

    ngOnInit(){
    }
    
}