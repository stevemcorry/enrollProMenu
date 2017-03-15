import { Component, OnInit } from '@angular/core';
import { GetService } from '../../services/getService';
import { PostService } from '../../services/postService';
import { ChooseContacts } from '../../modals/choose-contacts/choose-contacts';
import { ModalController, NavController, Platform, NavParams, ViewController, Events} from 'ionic-angular';

@Component({
  selector: 'page-market-drip',
  templateUrl: 'market-drip.html',
  providers: [ GetService, PostService ]

})
export class MarketDrip implements OnInit{
    constructor(public viewCtrl: ViewController, public platform: Platform, public params: NavParams, public getService: GetService, public postService: PostService, public events: Events, public navCtrl: NavController, public modalCtrl: ModalController){
        this.option = params.get('option');
    }
    option;
    openContacts(){
        let modal = this.modalCtrl.create(ChooseContacts);
        modal.present();
    }
    dismiss() {
        this.viewCtrl.dismiss();
    }
    ngOnInit(){
    }
    
}